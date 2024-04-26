import { Scene3d } from '../../utils/Scene3d'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Model from './assets/hand-model.glb'
import {
    AmbientLight,
    DirectionalLight,
    EquirectangularReflectionMapping,
    Group,
    Mesh,
    MeshBasicMaterial,
    MeshPhysicalMaterial,
    PlaneGeometry,
    TextureLoader,
    Vector2,
} from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import HDR from './assets/kloofendal_48d_partly_cloudy_puresky_1k.hdr'
import NormalMap from './assets/normal.png'
import Flamenco from '@flamencojs/flamencojs'
import Concert1 from '../../assets/img/concert-1.jpg'
import Concert2 from '../../assets/img/concert-2.jpg'
import Concert3 from '../../assets/img/concert-3.jpg'
import Concert4 from '../../assets/img/concert-4.jpg'
import Concert5 from '../../assets/img/concert-5.jpg'
import Concert6 from '../../assets/img/concert-6.jpg'
import gsap from 'gsap'

type QuickSetter = (value: number) => void

export class HandSectionScene extends Scene3d {
    params = {
        scale: 0.5,
        roughness: 0.4,
        transmission: 1.08,
        thickness: 1,
        ior: 1.73,
        clearcoat: 0.68,
        clearcoatRoughness: 0.49,
        clearcoatNormalScale: 0.52,
        envMapIntensity: 0.91,
    }
    flamenco: Pick<Flamenco, 'addEffect'>

    animateHand?: QuickSetter
    animateGrid?: QuickSetter
    previousScroll = 0
    grid?: Group

    constructor(
        canva: HTMLCanvasElement,
        addEffect: Pick<Flamenco, 'addEffect'>,
        onLoaded: () => void
    ) {
        super(canva, { debug: false, onLoaded })
        this.flamenco = addEffect
        this.init()

        // for (const this.paramsKey in this.params) {
        //     pane.addBinding(this.params, this.paramsKey, {
        //         min: 0,
        //         max: 3,
        //         step: 0.01,
        //     }).on('change', () => {
        //         handMaterial[this.paramsKey] = this.params[this.paramsKey]
        //         handMaterial.needsUpdate = true
        //     })
        // }
    }

    async init() {
        this.addLight()

        const background = new Mesh(
            new PlaneGeometry(100, 100),
            new MeshBasicMaterial({ color: '#0f0f0f' })
        )
        background.position.z = -10
        this.add(background)

        const hand = await this.loadModel()
        hand.position.x = 0.5
        this.add(hand)
        this.animateHand = gsap.quickSetter(hand.rotation, 'y') as QuickSetter
        this.grid = this.createGrid([
            Concert1,
            Concert2,
            Concert3,
            Concert4,
            Concert5,
            Concert6,
        ])
        this.add(this.grid)
        this.grid.position.y = 1.5
        this.grid.position.x = 1.5
        this.grid.position.z = -0.6
        this.animateGrid = gsap.quickSetter(
            this.grid.position,
            'x'
        ) as QuickSetter
    }

    scroll() {
        if (!this.grid) return
        this.animateHand?.(window.scrollY * 0.01)
        this.animateGrid?.(
            this.grid.position.x +
                (window.scrollY - this.previousScroll) * 0.001
        )
        this.previousScroll = window.scrollY
    }

    addLight() {
        const light = new DirectionalLight(0xffffff, 1)
        light.position.set(0, 2, 0)
        this.add(light)

        const ambientLight = new AmbientLight('white', 0.5)
        this.add(ambientLight)
    }

    async loadModel() {
        const gltfLoader = new GLTFLoader(this.loadingManager)
        const result = await gltfLoader.loadAsync(Model)
        const mesh = result.scene.children[0] as Mesh
        let minZ = Infinity
        let maxZ = -Infinity

        const geometry = mesh.geometry
        geometry.computeBoundingBox()
        minZ = Math.min(minZ, geometry.boundingBox?.min.z || 0)
        maxZ = Math.max(maxZ, geometry.boundingBox?.max.z || 0)
        mesh.scale.set(0.01, 0.01, 0.01)
        mesh.rotation.x = Math.PI
        mesh.position.y = 0.5

        const hdrEquirect = new RGBELoader().load(HDR, () => {
            hdrEquirect.mapping = EquirectangularReflectionMapping
        })

        const textureLoader = new TextureLoader()
        const normalMap = textureLoader.load(NormalMap)

        const handMaterial = new MeshPhysicalMaterial({
            roughness: this.params.roughness,
            transmission: this.params.transmission,
            thickness: this.params.thickness,
            envMap: hdrEquirect,
            envMapIntensity: this.params.envMapIntensity,
            normalMap: normalMap,
            clearcoat: this.params.clearcoat,
            clearcoatMap: normalMap,
            clearcoatRoughness: this.params.clearcoatRoughness,
            clearcoatNormalMap: normalMap,
            clearcoatNormalScale: new Vector2(
                this.params.clearcoatNormalScale,
                this.params.clearcoatNormalScale
            ),
            ior: this.params.ior,
        })

        handMaterial.onBeforeCompile = (shader) => {
            shader.uniforms.fDisplacement = { value: 0.02 }
            shader.uniforms.fDataArray = { value: new Float32Array(128) }
            shader.uniforms.fMinZ = { value: minZ }
            shader.uniforms.fMaxZ = { value: maxZ }

            const uniforms = `
            uniform float fDisplacement;
            uniform float fDataArray[128];
            uniform float fMinZ;
            uniform float fMaxZ;
        `

            const main = `
            int index = int((position.z - fMinZ) / (fMaxZ - fMinZ) * 128.0);
            // Clamp the index to the array bounds
            index = clamp(index, 1, 127);
            // Get the data value
            float dataValue = fDataArray[index];
            // Use the data value to displace the position
            vec3 newPosition = position + normal * dataValue * fDisplacement;
            transformed = newPosition;
        `
            handMaterial.userData.shader = shader
            shader.vertexShader = shader.vertexShader
                .replace(
                    '#include <begin_vertex>',
                    `#include <begin_vertex> ${main}`
                )
                .replace('#include <common>', `${uniforms}\n#include <common>`)

            this.flamenco.addEffect({
                kind: 'custom',
                onUpdate: ({ dataArray }) => {
                    handMaterial.userData.shader.uniforms.fDataArray.value =
                        new Float32Array(
                            dataArray.map((d) => d * this.params.scale)
                        )
                    handMaterial.needsUpdate = true
                },
            })
        }

        mesh.material = handMaterial

        const group = new Group()
        group.add(mesh)
        group.rotation.z = Math.PI
        return group
    }

    createGrid(imgs: string[]) {
        const grid = new Group()
        const size = 0.5
        const spacing = 0.1
        const rows = 2
        const cols = 3
        const total = rows * cols
        const halfSize = (total * size + (total - 1) * spacing) / 2
        const geometry = new PlaneGeometry(size, size, 1, 1)
        const mesh = new Mesh(geometry)
        const textureLoader = new TextureLoader(this.loadingManager)
        for (let i = 0; i < total; i++) {
            const x = (i % cols) * (size + spacing) - halfSize
            const y = Math.floor(i / cols) * (size + spacing) - halfSize
            const texture = textureLoader.load(imgs[i])
            const img = mesh.clone()
            img.material = new MeshBasicMaterial({ map: texture })
            img.position.copy({ x, y, z: 0 })
            grid.add(img)
        }
        return grid
    }
}
