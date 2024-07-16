<template>
    <div
        :style="cellStyles"
        :class="'grid-cell ' + props.cellData.className"
        class="opacity"
        @mouseover="applyHoverEffect($event)"
        @mouseout="removeHoverEffect($event)"
    >
        <object
            v-if="props.cellData.contentSVG"
            class="grid-cell__svg"
            :data="props.cellData.contentSVG"
        />
        <div
            v-if="props.cellData.blurEffect"
            :style="blurStyles"
            class="grid-cell__blur"
        ></div>
        <div v-if="props.cellData.noiseEffect" class="grid-cell__noise">
            <svg>
                <filter id="noise">
                    <feTurbulence id="turbulence">
                        <animate
                            attributeName="baseFrequency"
                            dur="50s"
                            values="0.9 0.9;0.8 0.8; 0.9 0.9"
                            repeatCount="indefinite"
                        ></animate>
                    </feTurbulence>
                    <feDisplacementMap
                        in="SourceGraphic"
                        scale="60"
                    ></feDisplacementMap>
                </filter>
            </svg>
        </div>

        <!--        <img
            v-if="props.cellData.backgroundImage"
            :style="imgStyles"
            class="grid-cell__background"
            :src="props.cellData.backgroundImage"
            alt="Image"
        />-->
        <h2 v-if="props.cellData.contentText">
            {{ props.cellData.contentText }}
        </h2>
        <div
            v-else-if="props.cellData.contentSlot"
            class="grid-cell__contentSlot"
            v-html="props.cellData.contentSlot"
        ></div>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import type { Cell } from './types'
import { computed, onMounted } from 'vue'
import { HoverEffect } from './enums'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useFlamenco } from '../utils/useFlamenco'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{ cellData: Cell }>()

// Scene
const { flamenco } = useFlamenco()

onMounted(() => {
    updateEffect()
})

const updateEffect = () => {
    flamenco.value.addEffect({
        kind: 'color',
        selector: '.colors',
        options: {
            min: '#eeeeee',
            max: '#000000',
        },
    })
}

const cellStyles = computed(() => {
    return {
        width: props.cellData.larger ? '100%' : props.cellData.width,
        height: props.cellData.taller ? '100%' : props.cellData.height,
        background:
            'url(' + props.cellData.backgroundImage + ') no-repeat left top',
        backgroundColor: props.cellData.backgroundColor,
        backgroundImage: 'url(' + props.cellData.backgroundImage + ')',
        backgroundPosition: props.cellData.backgroundPosition,
        backgroundSize: props.cellData.backgroundSize,
        gridColumns: props.cellData.larger
            ? 'span ' + props.cellData.larger
            : '',
        borderRadius: props.cellData.radius,
        gridRow: props.cellData.taller ? `span ${props.cellData.taller}` : '',
        gridColumn: props.cellData.larger
            ? `span ${props.cellData.larger}`
            : '',
    }
})

const blurStyles = computed(() => {
    return {
        backdropFilter: `blur(${props.cellData.blurEffect}px)`,
    }
})
const applyHoverEffect = (event: Event) => {
    const target = event.currentTarget as Element
    const svgElement = target ? target.querySelector('.grid-cell__svg') : null

    switch (props.cellData.hoverEffect) {
        case HoverEffect.Roll:
            {
                const tl = gsap.timeline()
                tl.to(svgElement, {
                    y: '100%',
                    duration: 0.5,
                    ease: 'power2.in',
                })
                    .to(svgElement, {
                        y: '-100%',
                        duration: 0,
                    })
                    .to(svgElement, {
                        y: '100%',
                        duration: 0.4,
                    })
                    .to(svgElement, {
                        y: '-100%',
                        duration: 0,
                    })
                    .to(svgElement, {
                        y: '100%',
                        duration: 0.3,
                    })
                    .to(svgElement, {
                        y: '-100%',
                        duration: 0,
                    })
                    .to(svgElement, {
                        y: '0%',
                        duration: 0.5,
                        ease: 'power1.inOut',
                    })
            }
            break
        case HoverEffect.SwipeRight:
            gsap.to(svgElement, {
                x: '100%',
                duration: 0.5,
            })
            break
        case HoverEffect.Morph:
            break
        default:
            break
    }
}

const removeHoverEffect = (event: Event) => {
    const target = event.currentTarget as Element
    const svgElement = target ? target.querySelector('.grid-cell__svg') : null
    if (!props.cellData.hoverEffect) return
    gsap.to(svgElement, { x: '0%', y: 0, duration: 0.5 })
}
</script>

<style lang="scss">
.opacity {
    transition: opacity 0.5s;
}

.grid-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;
    background-repeat: no-repeat;
    font-family: 'League Spartan', sans-serif;
    &-title {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 5;
        &__text {
            position: absolute;
            bottom: -1.75rem;
            left: 0;
        }
    }

    h2 {
        font-size: 7vw;
    }

    .colors {
        transition: color 0.05s;
    }

    &__noise {
        position: absolute;
        top: -50px;
        left: -50px;
        width: calc(100% + 50px);
        height: calc(100% + 50px);
        background: repeating-linear-gradient(
            rgba(17, 17, 17, 0.16),
            rgba(255, 255, 255, 0.25) 50%,
            rgb(0, 0, 0) 50%,
            rgba(0, 0, 0, 0.45)
        );
        background-size: 5px 5px;
        filter: url(#noise);
    }

    &__svg {
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        z-index: 1;
    }

    &__background {
        width: 100%;
        height: 100%;
        object-fit: none;
        position: absolute;
    }

    &__blur {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
    }

    &__contentSlot {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &-custom {
        padding: 6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        height: calc(100% - 12rem);
        &__text {
            font-size: 8rem;
            font-weight: 500;
            margin: 0;
            letter-spacing: -5px;
        }
        &-sub {
            display: flex;
            width: 100%;
            justify-content: start;
            align-items: center;
            gap: 20px;
            &__text {
                font-size: 1.5rem;
                font-weight: 300;
                margin: 0;
            }
            &__line {
                width: 100%;
                max-width: 20%;
                height: 3px;
                display: block;
            }
        }
    }

    h2 {
        font-size: 8rem;
        font-weight: 500;
        margin: 0;
    }

    a {
        text-decoration: underline;
        font-size: 1.5rem;
        text-underline-offset: 0.5em;
        color: inherit;
    }
}

.overflow {
    overflow: visible;
}

.large-column {
    grid-column: span 3;
    width: 100% !important;
}
</style>
