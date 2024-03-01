"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const jsdom_1 = require("jsdom");
const Background_1 = require("../../src/setEffect/Background");
describe('BackgroundColor', function () {
    let backgroundColor;
    before(function () {
        // Configure jsdom avant d'initialiser votre classe de test
        const dom = new jsdom_1.JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = dom.window.document;
        global.window = dom.window;
    });
    beforeEach(function () {
        backgroundColor = new Background_1.default();
    });
    after(function () {
        // Nettoyez jsdom après avoir exécuté tous les tests
        delete global.document;
        delete global.window;
    });
    it('should set background color correctly', function () {
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
        backgroundColor.set(new Uint8Array([100, 150]), [{ class: '.test-element' }]);
        // Vérifier si les styles ont été appliqués correctement
        const style1 = window.getComputedStyle(childElement1);
        const style2 = window.getComputedStyle(childElement2);
        (0, chai_1.expect)(style1.backgroundColor).to.equal('rgb(100, 0, 155)');
        (0, chai_1.expect)(style2.backgroundColor).to.equal('rgb(100, 0, 155)');
    });
});
//# sourceMappingURL=BackgroundColor.spec.js.map