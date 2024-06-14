import { HoverEffect } from './enums'

export type Cell = {
    width: string
    height: string
    backgroundColor: string
    blurEffect: string
    noiseEffect: string
    backgroundImage?: string
    transform: string
    backgroundPosition: string
    backgroundSize: string
    contentSlot: string
    contentSVG: string
    contentText: string
    radius: string
    larger: number
    taller: number
    opacity: number
    hoverEffect: HoverEffect
    className?: string
}
