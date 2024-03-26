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
    Vector2,
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
        fragmentShader: `varying vec2 vUv;

			uniform float uTime;

			void main()	{

				vec2 p = - 1.0 + 2.0 * vUv;
				float a = uTime * 40.0;
				float d, e, f, g = 1.0 / 40.0 ,h ,i ,r ,q;

				e = 400.0 * ( p.x * 0.5 + 0.5 );
				f = 400.0 * ( p.y * 0.5 + 0.5 );
				i = 200.0 + sin( e * g + a / 150.0 ) * 20.0;
				d = 200.0 + cos( f * g / 2.0 ) * 18.0 + cos( e * g ) * 7.0;
				r = sqrt( pow( abs( i - e ), 2.0 ) + pow( abs( d - f ), 2.0 ) );
				q = f / r;
				e = ( r * cos( q ) ) - a / 2.0;
				f = ( r * sin( q ) ) - a / 2.0;
				d = sin( e * g ) * 176.0 + sin( e * g ) * 164.0 + r;
				h = ( ( f + d ) + a / 2.0 ) * g;
				i = cos( h + r * p.x / 1.3 ) * ( e + e + a ) + cos( q * g * 6.0 ) * ( r + h / 3.0 );
				h = sin( f * g ) * 144.0 - sin( e * g ) * 212.0 * p.x;
				h = ( h + ( f - e ) * q + sin( r - ( a + h ) / 7.0 ) * 10.0 + i / 4.0 ) * g;
				i += cos( h * 2.3 * sin( a / 350.0 - q ) ) * 184.0 * sin( q - ( r * 4.3 + a / 12.0 ) * g ) + tan( r * g + h ) * 184.0 * cos( r * g + h );
				i = mod( i / 5.6, 256.0 ) / 64.0;
				if ( i < 0.0 ) i += 4.0;
				if ( i >= 2.0 ) i = 4.0 - i;
				d = r / 350.0;
				d += sin( d * d * 8.0 ) * 0.52;
				f = ( sin( a * g ) + 1.0 ) / 2.0;
				gl_FragColor = vec4( vec3( f * i / 1.6, i / 2.0 + d / 13.0, i ) * d * p.x + vec3( i / 1.3 + d / 8.0, i / 2.0 + d / 18.0, i ) * d * ( 1.0 - p.x ), 1.0 );

			}`,
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
