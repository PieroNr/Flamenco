import {AbstractSetEffect} from './AbstractSetEffect';
import {extractIndexValue} from './utils/extractIndexValue';
import {PulseEffect} from '../types';

export class Pulse extends AbstractSetEffect<PulseEffect> {
  set(dataArray: Uint8Array): void {
    this.effects.forEach(({elements}) => {
      elements?.forEach((element, i) => {
        const opacity = extractIndexValue({index: i, data: dataArray, elementNumber: this.effects.length});
        console.log('opacity',opacity);
        element.style.opacity = `${opacity / 255}`; // Convert the value to an opacity between 0 and 1
        console.log('element',element);

        let scale = 1;
        let direction = 1;
        const pulse = () => {
          scale += direction * 0.01;
          if (scale > 1.1 || scale < 1) direction *= -1;
          element.style.transform = `scale(${scale})`;
          requestAnimationFrame(pulse);
        };
        pulse();
      });
    });
  }
}
