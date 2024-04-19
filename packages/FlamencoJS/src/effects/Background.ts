import {AbstractSetEffect} from './AbstractSetEffect';
import {BackgroundColorEffect} from '../types';

export class BackgroundColor extends AbstractSetEffect<BackgroundColorEffect> {
  set(dataArray: Uint8Array): void {
    this.effects.forEach(({elements}) => {
      elements.forEach((element, i) => {
        const red =  dataArray[i * Math.round(128 / this.effects.length)];
        const blue = 255 - red;
        element.style.backgroundColor = `rgb(${red}, 0, ${blue})`;
      });

    });
  }
}
