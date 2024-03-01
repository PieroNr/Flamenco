"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Flamenco.spec.ts
const chai_1 = require("chai");
const Flamenco_1 = require("../src/Flamenco");
describe('Flamenco', function () {
    let flamenco;
    beforeEach(function () {
        flamenco = new Flamenco_1.default();
    });
    it('should instantiate correctly', function () {
        (0, chai_1.expect)(flamenco).to.be.instanceOf(Flamenco_1.default);
    });
    it('should set effect correctly', function () {
        flamenco.setEffect('someEffect', '.someClass');
        (0, chai_1.expect)(flamenco['nameEffect']).to.deep.equal([{ name: 'someEffect', class: '.someClass' }]);
    });
    it('should set music correctly', function () {
        flamenco.setMusic('someMusicPath');
        const player = flamenco['player']; // Access private property for testing
        (0, chai_1.expect)(player['audioBuffer']).to.not.be.null;
    });
    it('should play correctly', function () {
        flamenco.play();
        const player = flamenco['player']; // Access private property for testing
        // Add assertions to check that playback was initiated correctly
    });
    it('should stop correctly', function () {
        flamenco.stop();
        const player = flamenco['player']; // Access private property for testing
        // Add assertions to check that stopping was performed correctly
    });
});
//# sourceMappingURL=Flamenco.spec.js.map