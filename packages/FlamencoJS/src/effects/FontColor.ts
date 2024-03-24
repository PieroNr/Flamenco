import {AbstractSetEffect} from './AbstractSetEffect';
import {extractIndexValue} from './utils/extractIndexValue';
import {FontColorEffect} from '../types';

export class FontColor extends AbstractSetEffect<FontColorEffect> {
  set(dataArray: Uint8Array): void {
    this.effects.forEach(({elements}) => {
      elements?.forEach((element, i) => {
        const red = extractIndexValue({index: i, data: dataArray, elementNumber: this.effects.length});
        const blue = 255 - red;
        console.log({red, blue});
        element.style.color = `rgb(${red}, 0, ${blue})`;
      });
    });
  }
}

