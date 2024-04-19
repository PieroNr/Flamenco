<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
    AmbientLight,
    Clock,
    Color,
    Mesh,
    PerspectiveCamera,
    Scene,
    ShaderMaterial,
    Vector3,
    WebGLRenderer,
    DirectionalLight,
    Vector2,
    TextureLoader,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Flamenco from '@flamencojs/flamencojs'
import Audio from '../assets/serenade-string-e-major.mp3'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Model from '../assets/models/hand-5.glb'
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
            displacement: { value: 0.02 },
            dataArray: { value: new Float32Array(128) },
            minZ: { value: 0 },
            maxZ: { value: 0 },
            iResolution: { value: new Vector3() },
            uTime: { value: 0 },
            uHue: { value: 0.5 },
            uHueVariation: { value: 1 },
            uGradient: { value: 1 },
            uDensity: { value: 1 },
            uDisplacement: { value: 1 },
            uMousePosition: { value: new Vector2(0.5, 0.5) },
        },
        vertexShader: `
        uniform float displacement;
        uniform float dataArray[128];
        uniform float minZ;
        uniform float maxZ;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        void main() {
            vNormal = normal;
            vPosition = position;
            vUv = uv;
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
        varying vec2 vUv;
        uniform float uTime;


        vec2 fade(vec2 t)
        {
            return t*t*t*(t*(t*6.0-15.0)+10.0);
        }

        vec4 permute(vec4 x)
        {
            return mod(((x*34.0)+1.0)*x, 289.0);
        }

        float cnoise(vec2 P)
        {
            vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
            vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
            Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
            vec4 ix = Pi.xzxz;
            vec4 iy = Pi.yyww;
            vec4 fx = Pf.xzxz;
            vec4 fy = Pf.yyww;
            vec4 i = permute(permute(ix) + iy);
            vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
            vec4 gy = abs(gx) - 0.5;
            vec4 tx = floor(gx + 0.5);
            gx = gx - tx;
            vec2 g00 = vec2(gx.x,gy.x);
            vec2 g10 = vec2(gx.y,gy.y);
            vec2 g01 = vec2(gx.z,gy.z);
            vec2 g11 = vec2(gx.w,gy.w);
            vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
            g00 *= norm.x;
            g01 *= norm.y;
            g10 *= norm.z;
            g11 *= norm.w;
            float n00 = dot(g00, vec2(fx.x, fy.x));
            float n10 = dot(g10, vec2(fx.y, fy.y));
            float n01 = dot(g01, vec2(fx.z, fy.z));
            float n11 = dot(g11, vec2(fx.w, fy.w));
            vec2 fade_xy = fade(Pf.xy);
            vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
            float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
            return 2.3 * n_xy;
        }
       void main() {
            vec2 uv = vUv;
            vec3 color = vec3(0.0);
            // Calculate the index based on the vUv.y value
            int index = int(vUv.y * 128.0);
            // Clamp the index to the array bounds
            index = clamp(index, 0, 127);
            // Get the data value
            // Use the data value and time to influence the noise
            float strength = sin(cnoise(vUv * 10.0) * 20.0);
            color = vec3(strength);
            gl_FragColor = vec4(color, 1.0);
        }

`,
    })

    mesh.material = shaderMaterial

    window.addEventListener('mousemove', (event) => {
        shaderMaterial.uniforms.uMousePosition.value = new Vector2(
            event.clientX / window.innerWidth,
            1 - event.clientY / window.innerHeight
        )
    })
    let minZ = Infinity
    let maxZ = -Infinity

    const geometry = mesh.geometry
    geometry.computeBoundingBox()
    minZ = Math.min(minZ, geometry.boundingBox?.min.z || 0)
    maxZ = Math.max(maxZ, geometry.boundingBox?.max.z || 0)
    scene.add(mesh)
    mesh.scale.set(0.01, 0.01, 0.01)
    mesh.rotation.set(-1.57, 0, -1.02)
    mesh.position.y = -0.5
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
                dataArray.map((d) => d * PARAMS.scale)
            )
            shaderMaterial.needsUpdate = true
            shaderMaterial.uniforms.uTime.value = clock.getElapsedTime()

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
    light.position.set(0, 2, 0)
    scene.add(light)

    const ambientLight = new AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
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
