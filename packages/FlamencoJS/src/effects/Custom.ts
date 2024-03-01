import {AbstractSetEffect} from './AbstractSetEffect';
import {extractIndexValue} from './utils/extractIndexValue';
import {CustomEffect} from '../types';

export class Custom extends AbstractSetEffect<CustomEffect> {
  set(dataArray: Uint8Array): void {
    this.effects.forEach(({effect}, i) => {
      const indexValue = extractIndexValue({index: i, data: dataArray, elementNumber: this.effects.length});
      effect.onUpdate({
        dataArray,
        indexValue,
      });
    });
  }
}