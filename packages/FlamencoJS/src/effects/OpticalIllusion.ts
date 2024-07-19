import { AbstractSetEffect } from './AbstractSetEffect';
import { OpticalIllusionEffect } from '../types';
import { extractIndexValue } from './utils/extractIndexValue';

export class OpticalIllusion extends AbstractSetEffect<OpticalIllusionEffect> {
  update(dataArray: Uint8Array): void {
    this.effects.forEach(({ elements }) => {
      elements?.forEach((element, i) => {
        const indexValue = extractIndexValue({
          index: i,
          data: dataArray,
          elementNumber: elements.length,
        });

        const normalizedIndexValue = indexValue / 127;
        const newOpacity = 0.4 + 0.6 * normalizedIndexValue;
        const translateZ = normalizedIndexValue * 100;

        element.style.opacity = newOpacity.toString();
        const sizeClass = element.className.match(/circle-(\d+)/);

        if (sizeClass) {
          const sizePercentage = parseInt(sizeClass[1], 10);
          element.style.setProperty('--circle-width', `${sizePercentage}%`);
          element.style.setProperty('--circle-height', `${sizePercentage}%`);
          element.style.setProperty('--transform-z', `${translateZ}px`);
        }

        if (element.classList.contains('animate')) {
          this.animateElement(element, i);
        }
      });
    });
  }

  animateElement(element: HTMLElement, index: number): void {
    const animationDuration = 2000;
    const staggerDelay = 50;
    const totalDelay = index * staggerDelay;
    const endY = -40;
    const startY = 0;
    const repeat = -1;
    const yoyo = true;
    let startTime: number | null = null;
    let direction = 1;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - totalDelay;
      if (elapsed > 0) {
        const progress = Math.min(elapsed / animationDuration, 1);
        const easedProgress = 0.5 * (1 - Math.cos(Math.PI * progress));
        const yValue = startY + direction * (endY - startY) * easedProgress;

        element.style.setProperty('transform', `translateY(${yValue}px) translateZ(var(--transform-z, 0px))`);

        if (progress === 1) {
          if (yoyo) direction *= -1;
          startTime = timestamp;
        }
      }

      if (repeat === -1 || elapsed < repeat * animationDuration) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, totalDelay);
  }
}
