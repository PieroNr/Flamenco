declare module '*.gltf' {
    const src: string
    export default src
}

declare module '*.glb' {
    const src: string
    export default src
}

declare module '*.hdr' {
    const src: string
    export default src
}

declare module '*.md' {
    import type { ComponentOptions } from 'vue'

    const Component: ComponentOptions
    export default Component
}
