"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Width_1 = require("../../src/setEffect/Width");
describe('Width', function () {
    let width;
    beforeEach(function () {
        width = new Width_1.default();
    });
    it('should set width correctly', function () {
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
        width.set(new Uint8Array([100, 150]), [{ class: '.test-element' }]);
        // Vérifier si les styles ont été appliqués correctement
        const style1 = window.getComputedStyle(childElement1);
        const style2 = window.getComputedStyle(childElement2);
        (0, chai_1.expect)(style1.width).to.equal('60px'); // Assurez-vous d'ajuster cette valeur en fonction de votre implémentation spécifique
        (0, chai_1.expect)(style2.width).to.equal('90px'); // Assurez-vous d'ajuster cette valeur en fonction de votre implémentation spécifique
    });
});
//# sourceMappingURL=Width.spec.js.map