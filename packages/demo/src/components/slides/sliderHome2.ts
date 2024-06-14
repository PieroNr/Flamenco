import { Cell } from '../types'

export function SliderHome2(
    params: Cell[],
    CONCERT3: string,
    color: string[]
): Cell[] {
    params[0] = {
        backgroundImage: CONCERT3,
        taller: 2,
        larger: 2,
        radius: '0 0 0 0',
        backgroundPosition: '25% 26%',
        backgroundSize: 'cover',
    }

    params[1] = {
        backgroundImage: CONCERT3,
        taller: 2,
        backgroundPosition: '23% 62%',
        backgroundSize: '650%',
        radius: '0 0 0 0',
    }

    params[2] = {
        backgroundImage: CONCERT3,
        backgroundPosition: '23% 3%',
        backgroundSize: '650%',
        radius: '0 0 0 50%',
    }

    params[3] = {
        backgroundColor: color[1],
    }

    params[4] = {
        backgroundColor: color[2],
        next: true,
    }

    params[5] = {
        backgroundColor: color[2],
        prev: true,
    }
    params[6] = {
        backgroundColor: color[1],
    }

    params[7] = {
        backgroundColor: color[0],
        larger: 3,
        contentSlot: '<h2>height.</h2>',
    }
    params[8] = {
        backgroundColor: color[1],
        radius: '0 0 50% 0',
    }

    params[9] = {
        backgroundColor: color[2],
    }

    params[10] = {
        backgroundImage: CONCERT3,
        larger: 2,
        radius: '25% 0 0 0',
    }

    params[11] = {
        backgroundColor: color[1],
    }

    params[12] = {
        backgroundColor: color[2],
    }

    params[13] = {
        backgroundImage: CONCERT3,
    }

    params[14] = {
        backgroundColor: color[2],
        radius: '50% 0 0 0',
    }

    return params
}
