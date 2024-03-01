"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const SoundAnalyser_1 = require("../src/SoundAnalyser");
describe('SoundAnalyzer', function () {
    let soundAnalyzer;
    beforeEach(function () {
        soundAnalyzer = new SoundAnalyser_1.default();
    });
    it('should instantiate correctly', function () {
        (0, chai_1.expect)(soundAnalyzer).to.be.instanceOf(SoundAnalyser_1.default);
    });
    it('should analyze sound correctly', async function () {
        // Add test for the analyzeSound method
    });
    it('should get analyser correctly', function () {
        const analyser = soundAnalyzer.getAnalyser();
        (0, chai_1.expect)(analyser).to.be.instanceOf(AnalyserNode);
    });
    it('should get audio context correctly', function () {
        const audioContext = soundAnalyzer.getAudioContext();
        (0, chai_1.expect)(audioContext).to.be.instanceOf(AudioContext);
    });
    it('should get data array correctly', function () {
        const dataArray = soundAnalyzer.getDataArray();
        (0, chai_1.expect)(dataArray).to.be.instanceOf(Uint8Array);
    });
    it('should stop correctly', function () {
        // Add test for the stop method
    });
});
//# sourceMappingURL=SoundAnalyzer.spec.js.map