import { expect } from 'chai';
import Player from '../src/Player';

describe('Player', function() {
  let player: Player;

  beforeEach(function() {
    player = new Player();
  });

  it('should instantiate correctly', function() {
    expect(player).to.be.instanceOf(Player);
  });

  it('should create source from audio element correctly', function() {
    const audioElement = document.createElement('audio');
    const source = player.createSourceFromAudioElement(audioElement);
    expect(player['connectedSources']).to.include(source);
  });

  it('should connect external audio element correctly', function() {
    const audioElement = document.createElement('audio');
    player.connectExternalAudioElement(audioElement);
    expect(player['source']).to.equal(audioElement);
  });

  it('should set music correctly', async function() {
    const trackUrl = 'someTrackUrl';
    await player.setMusic(trackUrl);
    expect(player['audioBuffer']).to.not.be.null;
  });

  it('should set gain correctly', function() {
    player.setGain(0.5);
    expect(player['gain'].gain.value).to.equal(0.5);
  });

  it('should start correctly', function() {
    // Add test for the start method
  });

  it('should stop correctly', function() {
    // Add test for the stop method
  });
});