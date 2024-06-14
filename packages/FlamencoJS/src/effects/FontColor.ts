import { AbstractSetEffect } from "./AbstractSetEffect";
import { extractIndexValue } from "./utils/extractIndexValue";
import { FontColorEffect } from "../types";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export class FontColor extends AbstractSetEffect<FontColorEffect> {
  update(dataArray: Uint8Array): void {
    this.effects.forEach(({ elements, effect }) => {
      elements?.forEach((element, i) => {
        const { min, max } = effect.options;

        // Convertir min et max en valeurs RGB
        const minRgb = hexToRgb(min);
        const maxRgb = hexToRgb(max);

        // Normaliser la valeur pour qu'elle soit comprise entre 0 et 1
        const value =
          extractIndexValue({
            index: i,
            data: dataArray,
            elementNumber: this.effects.length,
          }) / 255; // Supposons que la valeur maximale possible soit 255

        // Calculer la valeur de couleur en fonction de min et max
        if (minRgb && maxRgb) {
          const colorValue = {
            r: value * (maxRgb.r - minRgb.r) + minRgb.r,
            g: value * (maxRgb.g - minRgb.g) + minRgb.g,
            b: value * (maxRgb.b - minRgb.b) + minRgb.b,
          };

          element.style.color = `rgb(${colorValue.r}, ${colorValue.g}, ${colorValue.b})`;
        }
      });
    });
  }
}
