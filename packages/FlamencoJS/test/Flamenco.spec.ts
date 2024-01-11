// Flamenco.spec.ts
import { expect } from 'chai';
import Flamenco from '../src/Flamenco';

describe('Flamenco', function() {
  let flamenco: Flamenco;

  beforeEach(function() {
    flamenco = new Flamenco();
  });

  it('should instantiate correctly', function() {
    expect(flamenco).to.be.instanceOf(Flamenco);
  });

  it('should set effect correctly', function() {
    flamenco.setEffect('someEffect', '.someClass');
    expect(flamenco['nameEffect']).to.deep.equal([{ name: 'someEffect', class: '.someClass' }]);
  });

  it('should set music correctly', function() {
    flamenco.setMusic('someMusicPath');
    const player = flamenco['player']; // Access private property for testing
    expect(player['audioBuffer']).to.not.be.null;
  });

  it('should play correctly', function() {
    flamenco.play();
    const player = flamenco['player']; // Access private property for testing
    // Add assertions to check that playback was initiated correctly
  });

  it('should stop correctly', function() {
    flamenco.stop();
    const player = flamenco['player']; // Access private property for testing
    // Add assertions to check that stopping was performed correctly
  });
});
