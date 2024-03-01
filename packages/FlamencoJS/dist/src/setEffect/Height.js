"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Height {
    set(dataArray, classEffect) {
        const flamencoElements = document.querySelectorAll(classEffect[0].class);
        flamencoElements.forEach((element, i) => {
            // Assurer que l'élément est de type HTMLElement pour accéder aux styles
            if (element instanceof HTMLElement) {
                // Exemple : Appliquez la hauteur en fonction des données d'analyse
                const min = 2; // Type inferred as number
                const max = 200; // Type inferred as number
                const scaledHeight = (dataArray[i * Math.round(128 / flamencoElements.length)] / 255) *
                    (max - min) +
                    min;
                element.style.height = `${scaledHeight}px`;
            }
            else if (element instanceof SVGElement) {
                // Exemple : Appliquez la hauteur en fonction des données d'analyse
                const min = 2; // Type inferred as number
                const max = 200; // Type inferred as number
                const scaledHeight = (dataArray[i * Math.round(128 / flamencoElements.length)] / 255) *
                    (max - min) +
                    min;
                element.style.height = `${scaledHeight}px`;
            }
            else {
                return;
            }
        });
    }
}
exports.default = Height;
//# sourceMappingURL=Height.js.map