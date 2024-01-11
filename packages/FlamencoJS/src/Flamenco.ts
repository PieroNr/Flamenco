// Flamenco.ts
import player from './Player';

class Flamenco {
  private player: player;
  private nameEffect: Array<{ name: string, class: string }>;

  constructor() {
    this.player = new player();
    this.nameEffect = [];
  }

  setEffect(effectName: string, className: string): void {
    this.nameEffect.push({ name: effectName, class: className });
  }



  setMusic(musicPath: string): void {
    this.player.setMusic(musicPath);
  }

  play(): void {
    this.player.start(this.nameEffect);
  }

  stop(): void {
    this.player.stop();
  }
}






export default Flamenco;
