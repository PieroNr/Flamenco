"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Player_1 = require("../src/Player");
describe('Player', function () {
    let player;
    beforeEach(function () {
        player = new Player_1.default();
    });
    it('should instantiate correctly', function () {
        (0, chai_1.expect)(player).to.be.instanceOf(Player_1.default);
    });
    it('should create source from audio element correctly', function () {
        const audioElement = document.createElement('audio');
        const source = player.createSourceFromAudioElement(audioElement);
        (0, chai_1.expect)(player['connectedSources']).to.include(source);
    });
    it('should connect external audio element correctly', function () {
        const audioElement = document.createElement('audio');
        player.connectExternalAudioElement(audioElement);
        (0, chai_1.expect)(player['source']).to.equal(audioElement);
    });
    it('should set music correctly', async function () {
        const trackUrl = 'someTrackUrl';
        await player.setMusic(trackUrl);
        (0, chai_1.expect)(player['audioBuffer']).to.not.be.null;
    });
    it('should set gain correctly', function () {
        player.setGain(0.5);
        (0, chai_1.expect)(player['gain'].gain.value).to.equal(0.5);
    });
    it('should start correctly', function () {
        // Add test for the start method
    });
    it('should stop correctly', function () {
        // Add test for the stop method
    });
});
//# sourceMappingURL=Player.spec.js.map