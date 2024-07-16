import { HoverEffect } from './enums'

export type Cell = {
    width?: string
    height?: string
    backgroundColor?: string
    blurEffect?: number
    noiseEffect?: boolean
    backgroundImage?: string | undefined
    transform?: string
    backgroundPosition?: string
    backgroundSize?: string
    contentSlot?: string
    contentSlotId?: string
    contentSVG?: string
    contentText?: string
    radius?: string
    larger?: number
    taller?: number
    opacity?: number
    next?: boolean
    prev?: boolean
    hoverEffect?: HoverEffect
    className?: string
}
