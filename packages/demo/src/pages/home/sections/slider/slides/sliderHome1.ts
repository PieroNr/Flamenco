import { Cell } from '@/components/types'

export function SliderHome1(
    CONCERT1: string,
    CONCERT3: string,
    CONCERT1UP: string,
    color: string[]
): Cell[] {
    const params: Cell[] = [
        {
            backgroundColor: color[0],
            radius: '0 0 50% 0',
        },
        {
            backgroundImage: CONCERT3,
            larger: 2,
            taller: 2,
            radius: '0 50% 0 0',
            backgroundPosition: '25% 26%',
            backgroundSize: 'cover',
        },
        {
            backgroundImage: CONCERT1,
            taller: 2,
            backgroundPosition: '23% 3%',
            backgroundSize: '650%',
        },
        { backgroundColor: color[1] },
        { backgroundColor: color[2], next: true },
        { backgroundColor: color[2], prev: true },
        {
            backgroundColor: color[0],
            larger: 3,
            contentSlot: '<h2 class="colors">colors.</h2>',
        },
        { backgroundColor: color[1] },
        {
            backgroundColor: color[2],
            radius: '50% 0 0 0',
        },
        {
            backgroundImage: CONCERT1,
            backgroundPosition: '23% 62%',
            backgroundSize: '650%',
            radius: '0 50% 0 0',
        },
        {
            backgroundColor: color[2],
            larger: 3,
            backgroundImage: CONCERT1,
            backgroundPosition: '0% 16%',
            backgroundSize: '100%',
        },
        {
            backgroundColor: color[2],
            blurEffect: 50,
        },
        { backgroundColor: color[1] },
        {
            backgroundColor: color[2],
        },
        {
            backgroundColor: color[2],
            larger: 2,
            backgroundImage: CONCERT1,
            backgroundPosition: '100% 83%',
            backgroundSize: '150%',
        },
        { backgroundColor: color[0] },
        { backgroundColor: color[3] },
        { backgroundColor: color[0] },
        { backgroundColor: color[0] },
        {
            backgroundColor: color[0],
        },
        { backgroundColor: color[0] },
        {
            backgroundColor: color[0],
        },
        { backgroundColor: color[0] },
        { backgroundColor: color[0] },
        { backgroundColor: color[0] },
        { backgroundColor: color[0] },
        { backgroundColor: color[0], radius: '0 50% 0 0' },
        {
            backgroundColor: color[0],
        },
        { backgroundColor: color[0] },
        {
            backgroundColor: color[0],
        },
        {
            backgroundColor: color[0],
        },
        { backgroundColor: color[0] },
        { backgroundColor: color[0] },
    ]

    return params
}
