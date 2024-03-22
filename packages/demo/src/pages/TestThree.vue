<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    AmbientLight,
    BufferGeometry,
    Clock,
    Color,
    Float32BufferAttribute,
    Mesh,
    MeshStandardMaterial,
    PerspectiveCamera,
    Points,
    PointsMaterial,
    Scene,
    ShaderMaterial,
    Vector3,
    WebGLRenderer,
    UniformsLib,
    DirectionalLight,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Flamenco from '@flamencojs/flamencojs'
import Audio from '../assets/serenade-string-e-major.mp3'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Model from '../assets/models/devil-horn.gltf'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'
import { Pane } from 'tweakpane'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'

const canvas = ref<HTMLCanvasElement>()

const pane = new Pane()
const PARAMS = {
    scale: 1,
}
const clock = new Clock()

pane.addBinding(PARAMS, 'scale', {
    min: 0,
    max: 2,
    step: 0.01,
})

// Scene
const scene = new Scene()
scene.background = new Color('white')

//Create a new instance of FlamencoJS
const flamenco = new Flamenco()

//Set your music file
flamenco.setMusic(Audio).then(() => {
    //Start the music
    // flamenco.play()
    pane.addButton({ title: 'Play' }).on('click', () => {
        flamenco.play()
    })

    pane.addButton({ title: 'Stop' }).on('click', () => {
        flamenco.stop()
    })
})

window.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === ' ') {
        flamenco.stop()
    }
})

const gltfLoader = new GLTFLoader()

async function loadModel(renderer: WebGLRenderer) {
    const result = await gltfLoader.loadAsync(Model)
    const mesh = result.scene.children[0] as Mesh
    const shaderMaterial = new ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            displacement: { value: 0.02 },
            dataArray: { value: new Float32Array(128) },
            minZ: { value: 0 },
            maxZ: { value: 0 },
            iResolution: { value: new Vector3() },
            iTime: { value: 0 },
        },
        vertexShader: `
        uniform float displacement;
        uniform float dataArray[128];
        uniform float minZ;
        uniform float maxZ;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vNormal = normal;
            vPosition = position;
            // Calculate the index based on the z position
            int index = int((position.z - minZ) / (maxZ - minZ) * 128.0);
            // Clamp the index to the array bounds
            index = clamp(index, 1, 127);
            // Get the data value
            float dataValue = dataArray[index];
            // Use the data value to displace the position
            vec3 newPosition = position + normal * dataValue * displacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }

    `,
        fragmentShader: `
        /* discontinuous pseudorandom uniformly distributed in [-0.5, +0.5]^3 */
        uniform float iTime;
        uniform vec3 iResolution;
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float dataArray[128];
        uniform float minZ;
        uniform float maxZ;


        vec3 random3(vec3 c) {
            float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
            vec3 r;
            r.z = fract(512.0*j);
            j *= .125;
            r.x = fract(512.0*j);
            j *= .125;
            r.y = fract(512.0*j);
            return r-0.5;
        }

        /* skew constants for 3d simplex functions */
        const float F3 =  0.3333333;
        const float G3 =  0.1666667;

        /* 3d simplex noise */
        float simplex3d(vec3 p) {
             /* 1. find current tetrahedron T and it's four vertices */
             /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
             /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/

             /* calculate s and x */
             vec3 s = floor(p + dot(p, vec3(F3)));
             vec3 x = p - s + dot(s, vec3(G3));

             /* calculate i1 and i2 */
             vec3 e = step(vec3(0.0), x - x.yzx);
             vec3 i1 = e*(1.0 - e.zxy);
             vec3 i2 = 1.0 - e.zxy*(1.0 - e);

             /* x1, x2, x3 */
             vec3 x1 = x - i1 + G3;
             vec3 x2 = x - i2 + 2.0*G3;
             vec3 x3 = x - 1.0 + 3.0*G3;

             /* 2. find four surflets and store them in d */
             vec4 w, d;

             /* calculate surflet weights */
             w.x = dot(x, x);
             w.y = dot(x1, x1);
             w.z = dot(x2, x2);
             w.w = dot(x3, x3);

             /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
             w = max(0.6 - w, 0.0);

             /* calculate surflet components */
             d.x = dot(random3(s), x);
             d.y = dot(random3(s + i1), x1);
             d.z = dot(random3(s + i2), x2);
             d.w = dot(random3(s + 1.0), x3);

             /* multiply d by w^4 */
             w *= w;
             w *= w;
             d *= w;

             /* 3. return the sum of the four surflets */
             return dot(d, vec4(52.0));
        }

        /* const matrices for 3d rotation */
        const mat3 rot1 = mat3(-0.37, 0.36, 0.85,-0.14,-0.93, 0.34,0.92, 0.01,0.4);
        const mat3 rot2 = mat3(-0.55,-0.39, 0.74, 0.33,-0.91,-0.24,0.77, 0.12,0.63);
        const mat3 rot3 = mat3(-0.71, 0.52,-0.47,-0.08,-0.72,-0.68,-0.7,-0.45,0.56);

        /* directional artifacts can be reduced by rotating each octave */
        float simplex3d_fractal(vec3 m) {
            return   0.5333333*simplex3d(m*rot1)
                    +0.2666667*simplex3d(2.0*m*rot2)
                    +0.1333333*simplex3d(4.0*m*rot3)
                    +0.0666667*simplex3d(8.0*m);
        }

        void main()
        {
            vec2 p = vPosition.xy/iResolution.x;
            // Calculate the index based on the z position
            int index = int((vPosition.z - minZ) / (maxZ - minZ) * 128.0);
            // Clamp the index to the array bounds
            index = clamp(index, 1, 127);
            // Get the data value
            float dataValue = dataArray[index];
            vec3 p3 = vec3(p, dataValue);

            float value = simplex3d(p3*8.0+8.0);



            value = 0.5 + 0.5*value;
            value *= smoothstep(0.0, 0.005, abs(0.6-p.x)); // hello, iq :)

            gl_FragColor = vec4(
                    vec3(value),
                    1.0);
        }
    `,
    })
    mesh.material = shaderMaterial
    let minZ = Infinity
    let maxZ = -Infinity

    const geometry = mesh.geometry
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    minZ = Math.min(minZ, geometry.boundingBox?.min.z || 0)
    maxZ = Math.max(maxZ, geometry.boundingBox?.max.z || 0)
    scene.add(mesh)
    mesh.scale.set(0.01, 0.01, 0.01)
    mesh.rotation.set(-1.57, 0, -1.02)
    mesh.position.y = -0.5
    const helper = new VertexNormalsHelper(mesh, 1, 0xff0000)
    // scene.add(helper)

    shaderMaterial.uniforms.minZ.value = minZ
    shaderMaterial.uniforms.maxZ.value = maxZ
    shaderMaterial.uniforms.iResolution.value = new Vector3(
        sizes.value.width,
        sizes.value.height,
        1
    )
    flamenco.addEffect({
        kind: 'custom',
        onUpdate: ({ indexValue, dataArray }) => {
            shaderMaterial.uniforms.dataArray.value = new Float32Array(
                dataArray
            )
            shaderMaterial.needsUpdate = true
            shaderMaterial.uniforms.iTime.value = clock.getElapsedTime()

            console.log(dataArray)
            // meshGeometry.setAttribute(
            //     'color',
            //     new Float32BufferAttribute(newColors, 3)
            // )
        },
    })
}

function addLight() {
    const light = new DirectionalLight(0xffffff, 1)
    light.position.set(0, 1, 0)
    scene.add(light)
    console.log(light)
}

/**
 * Sizes
 */
const sizes = ref({
    width: window.innerWidth,
    height: window.innerHeight,
})

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(
    75,
    sizes.value.width / sizes.value.height,
    0.1,
    100
)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

function initThree() {
    if (!canvas.value) return
    // Controls
    const controls = new OrbitControls(camera, canvas.value)
    controls.enableDamping = true

    const renderer = new WebGLRenderer({
        canvas: canvas.value,
        antialias: true,
    })
    renderer.setSize(sizes.value.width, sizes.value.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.value.width = window.innerWidth
        sizes.value.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.value.width / sizes.value.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.value.width, sizes.value.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    loadModel(renderer)
    addLight()

    let lastElapsedTime = 0

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - lastElapsedTime
        lastElapsedTime = elapsedTime

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }
    tick()
}

onMounted(initThree)
</script>

<template>
    <canvas ref="canvas" />
</template>

<style scoped></style>
