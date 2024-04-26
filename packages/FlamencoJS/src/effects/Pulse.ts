import { AbstractSetEffect } from './AbstractSetEffect';
import { extractIndexValue } from './utils/extractIndexValue';
import { PulseEffect } from '../types';

export class Pulse extends AbstractSetEffect<PulseEffect> {
  update(dataArray: Uint8Array): void {
    this.effects.forEach(({ elements }) => {
      elements?.forEach((element, i) => {
        const indexValue = extractIndexValue({
          index: i,
          data: dataArray,
          elementNumber: this.effects.length,
        });

        // Normalize the indexValue to a range between 0 and 1
        const normalizedIndexValue = indexValue / 255;
        const newWaveFrequency = normalizedIndexValue * 50;
        console.log(newWaveFrequency);
        // Calculate new opacity and scale values based on the music data
        const newOpacity = 0.4 + 0.6 * normalizedIndexValue;
        const newScale = 0.95 + 0.05 * normalizedIndexValue;
        const superScale = newScale * 2;

        const newScalePercentage = ((newScale - 0.95) / 0.05) * 100;
        // Update the style of the element
        element.style.setProperty('--opacity', newOpacity.toString());
        element.style.setProperty('--scale', newScale.toString());
        element.style.setProperty('--super-scale', superScale.toString());
        element.style.setProperty('--scale-percentage', newScalePercentage.toString());
        element.style.setProperty('--animation-duration', `${newWaveFrequency.toString()}s`);
      });
    });
  }
}