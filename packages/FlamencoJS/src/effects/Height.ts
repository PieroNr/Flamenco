import {AbstractSetEffect} from './AbstractSetEffect';
import {extractIndexValue} from './utils/extractIndexValue';
import {scale} from './utils/scale';
import {HeightEffect} from '../types';

export class Height extends AbstractSetEffect<HeightEffect> {
  update(dataArray: Uint8Array): void {
    this.effects.forEach(({elements}) => {
      elements?.forEach((element, i) => {
        const min = 2;
        const max = 200;
        const indexValue = extractIndexValue({index: i, data: dataArray, elementNumber: this.effects.length});
        const scaledHeight = scale(indexValue, {min, max});
        element.style.height = `${scaledHeight}px`;
      });
    });
  }
}

