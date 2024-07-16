import { Scene3d } from '@/utils/Scene3d'
import Flamenco from '@flamencojs/flamencojs'
import {
    Color,
    Mesh,
    MeshPhongMaterial,
    SphereGeometry,
    SpotLight,
    Vector3,
} from 'three'
import { makeNoise3D } from 'open-simplex-noise'
import gsap from 'gsap'

export class BlobSectionScene extends Scene3d {
    sphere: Mesh
    noise = makeNoise3D(Math.random())
    amplitude = 4

    constructor(
        canvas: HTMLCanvasElement,
        flamenco: Pick<Flamenco, 'addEffect'>,
        onLoaded: () => void
    ) {
        super(canvas, {
            debug: false,
            onLoaded,
        })
        this.background = new Color('#0f0f0f')

        this.camera.position.z = 2.5
        this.camera.position.y = -0.2
        this.camera.position.x = 1

        const sphere_geometry = new SphereGeometry(1, 150, 150) // Use BufferGeometry
        const material = new MeshPhongMaterial({
            color: 'white',
            visible: true,
            wireframe: true,
        })
        this.sphere = new Mesh(sphere_geometry, material)
        this.add(this.sphere)
        this.addLights()
        flamenco.addEffect({
            kind: 'custom',
            onUpdate: ({ dataArray }) => {
                const frequency = dataArray[0] / 40
                const duration = 0.9
                gsap.to(this, {
                    amplitude: frequency,
                    duration: duration,
                })
                const scale = frequency * 0.3
                gsap.to(this.sphere.scale, {
                    x: scale,
                    y: scale,
                    z: scale,
                    duration: duration,
                })
            },
        })
    }

    addLights() {
        const spotLight1 = new SpotLight(0xfff2cc, 1) // White light
        spotLight1.position.set(1.3, 0, 4)
        const spotLight2 = new SpotLight(0xff0000, 15) // Red light
        spotLight2.position.set(-1.3, 4, 1.2)
        const spotLight3 = new SpotLight(0x0b5394, 15) // Blue light
        spotLight3.position.set(0, -4, 0)
        spotLight1.angle = Math.PI / 6 // Increase the light cone
        spotLight2.angle = Math.PI / 6 // Increase the light cone
        spotLight3.angle = Math.PI / 6 // Increase the light cone
        spotLight1.penumbra = 1 // Increase the light penumbra
        spotLight2.penumbra = 0.4 // Increase the light penumbra
        spotLight3.penumbra = 1 // Increase the light penumbra
        this.add(spotLight1)
        this.add(spotLight2)
        this.add(spotLight3)
        spotLight1.target = this.sphere
        spotLight2.target = this.sphere
        spotLight3.target = this.sphere
    }

    update() {
        super.update()
        if (!this.sphere) return

        const time = this.clock.getElapsedTime()
        const vertices = this.sphere.geometry.attributes.position.array // Access vertices from BufferGeometry

        for (let i = 0; i < vertices.length; i += 3) {
            const p = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2])
            p.normalize().multiplyScalar(
                1 +
                    0.15 *
                        this.noise(
                            p.x * this.amplitude + time,
                            p.y * this.amplitude,
                            p.z * this.amplitude
                        )
            )
            vertices[i] = p.x
            vertices[i + 1] = p.y
            vertices[i + 2] = p.z
        }

        this.sphere.geometry.attributes.position.needsUpdate = true // Update vertices
        this.sphere.geometry.computeVertexNormals()
    }
}
