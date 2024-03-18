import {AbstractSetEffect} from './AbstractSetEffect';
import {extractIndexValue} from './utils/extractIndexValue';
import {scale} from './utils/scale';
import {WidthEffect} from '../types';

export class Width extends AbstractSetEffect<WidthEffect> {
  set(dataArray: Uint8Array): void {
    this.effects.forEach(({elements}) => {
      elements.forEach((element, i) => {
        const min = 2;
        const max = 200;
        const indexValue = extractIndexValue({index: i, data: dataArray, elementNumber: this.effects.length});
        const scaledWidth = scale(indexValue, {min, max});
        element.style.width = `${scaledWidth}px`;
      });
    });
  }
}

