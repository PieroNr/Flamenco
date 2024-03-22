// Flamenco.ts
import {Player} from './Player';
import {Effect} from './types';


export class Flamenco {
  private player: Player;
  private effects: Effect[];

  constructor() {
    this.player = new Player();
    this.effects = [];
  }

  addEffect(effect:Effect): void {
    this.effects.push(effect);
  }

  async setMusic(musicPath: string): Promise<void> {
    await this.player.setMusic(musicPath);
  }

  play(): void {
    this.player.start(this.effects);
  }

  stop(): void {
    this.player.stop();
  }
}

