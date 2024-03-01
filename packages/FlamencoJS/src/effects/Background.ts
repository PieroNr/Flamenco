import {AbstractSetEffect} from './AbstractSetEffect';
import {extractIndexValue} from './utils/extractIndexValue';
import {BackgroundColorEffect} from '../types';

export class BackgroundColor extends AbstractSetEffect<BackgroundColorEffect> {
  set(dataArray: Uint8Array): void {
    this.effects.forEach(({elements}) => {
      elements.forEach((element, i) => {
        const red = extractIndexValue({index: i, data: dataArray, elementNumber: this.effects.length});
        const blue = 255 - red; // Type inferred as number
        element.style.backgroundColor = `rgb(${red}, 0, ${blue})`;
      });
    });
  }
}

