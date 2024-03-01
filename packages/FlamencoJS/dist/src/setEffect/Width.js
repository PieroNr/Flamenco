"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Width {
    set(dataArray, classEffect) {
        const flamencoElements = document.querySelectorAll(classEffect[0].class);
        flamencoElements.forEach((element, i) => {
            // Vérifiez si l'élément est un HTMLElement
            if (element instanceof HTMLElement) {
                // Appliquez la largeur en fonction des données d'analyse pour les éléments HTML
                const min = 2;
                const max = 200;
                const scaledWidth = (dataArray[i * Math.round(128 / flamencoElements.length)] / 255) *
                    (max - min) +
                    min;
                element.style.width = `${scaledWidth}px`;
            }
            else if (element instanceof SVGElement) {
                // Appliquez la largeur en fonction des données d'analyse pour les éléments HTML
                const min = 2;
                const max = 200;
                const scaledWidth = (dataArray[i * Math.round(128 / flamencoElements.length)] / 255) *
                    (max - min) +
                    min;
                element.style.width = `${scaledWidth}px`;
            }
            else {
                return;
            }
        });
    }
}
exports.default = Width;
//# sourceMappingURL=Width.js.map