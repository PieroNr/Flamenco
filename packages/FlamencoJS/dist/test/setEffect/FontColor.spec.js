"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const FontColor_1 = require("../../src/setEffect/FontColor");
describe('FontColor', function () {
    let fontColor;
    beforeEach(function () {
        fontColor = new FontColor_1.default();
    });
    it('should set font color correctly', function () {
        // Créer des éléments factices pour les tests
        const container = document.createElement('div');
        const childElement1 = document.createElement('div');
        const childElement2 = document.createElement('div');
        container.classList.add('test-container');
        childElement1.classList.add('test-element');
        childElement2.classList.add('test-element');
        container.appendChild(childElement1);
        container.appendChild(childElement2);
        // Appliquer l'effet
        fontColor.set(new Uint8Array([100, 150]), [{ class: '.test-element' }]);
        // Vérifier si les styles ont été appliqués correctement
        const style1 = window.getComputedStyle(childElement1);
        const style2 = window.getComputedStyle(childElement2);
        (0, chai_1.expect)(style1.color).to.equal('rgb(100, 0, 155)');
        (0, chai_1.expect)(style2.color).to.equal('rgb(100, 0, 155)');
    });
});
//# sourceMappingURL=FontColor.spec.js.map