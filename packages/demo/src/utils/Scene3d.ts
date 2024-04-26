import {
    Clock,
    LoadingManager,
    Mesh,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
} from 'three'
import { Pane } from 'tweakpane'

export class Scene3d extends Scene {
    protected canva: HTMLCanvasElement
    protected camera: PerspectiveCamera
    protected renderer: WebGLRenderer
    protected loadingManager: LoadingManager
    protected sizes: { width: number; height: number } = { width: 0, height: 0 }
    protected pane?: Pane
    protected clock: Clock

    constructor(
        canva: HTMLCanvasElement,
        { onLoaded, debug }: { onLoaded?: () => void; debug: boolean }
    ) {
        super()
        this.canva = canva
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        this.camera.position.z = 1
        this.add(this.camera)
        this.renderer = new WebGLRenderer({
            canvas: canva,
            alpha: true,
        })
        this.clock = new Clock()
        this.clock.start()

        this.loadingManager = new LoadingManager()
        if (onLoaded) this.loadingManager.onLoad = onLoaded
        if (debug) this.pane = new Pane()

        this.onResize()
        this.update()

        window.addEventListener('resize', this.onResize.bind(this))
        window.addEventListener('scroll', this.scroll.bind(this))
    }

    onResize() {
        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.camera.aspect = this.sizes.width / this.sizes.height
        this.camera.updateProjectionMatrix()

        this.renderer?.setSize(this.sizes.width, this.sizes.height)
        this.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    update() {
        this.renderer.render(this, this.camera)

        requestAnimationFrame(this.update.bind(this))
    }

    scroll() {
        // Implement it if needed
    }

    destroy() {
        window.removeEventListener('resize', this.onResize.bind(this))
        window.removeEventListener('scroll', this.scroll.bind(this))
        this.renderer?.dispose()
        this.traverse((child) => {
            if (!(child instanceof Mesh)) return
            child.geometry.dispose()
        })
    }
}
