import { expect } from 'chai';
import SoundAnalyzer from '../src/SoundAnalyser';

describe('SoundAnalyzer', function() {
    let soundAnalyzer: SoundAnalyzer;

    beforeEach(function() {
        soundAnalyzer = new SoundAnalyzer();
    });

    it('should instantiate correctly', function() {
        expect(soundAnalyzer).to.be.instanceOf(SoundAnalyzer);
    });

    it('should analyze sound correctly', async function() {
        // Add test for the analyzeSound method
    });

    it('should get analyser correctly', function() {
        const analyser = soundAnalyzer.getAnalyser();
        expect(analyser).to.be.instanceOf(AnalyserNode);
    });

    it('should get audio context correctly', function() {
        const audioContext = soundAnalyzer.getAudioContext();
        expect(audioContext).to.be.instanceOf(AudioContext);
    });

    it('should get data array correctly', function() {
        const dataArray = soundAnalyzer.getDataArray();
        expect(dataArray).to.be.instanceOf(Uint8Array);
    });

    it('should stop correctly', function() {
        // Add test for the stop method
    });
});