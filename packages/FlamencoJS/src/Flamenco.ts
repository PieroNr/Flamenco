// Flamenco.ts
import {Player} from './Player';

import { Effect } from './types';
import { Height } from './effects/Height';
import { Width } from './effects/Width';
import { FontColor } from './effects/FontColor';
import { Pulse } from './effects/Pulse';
import { BackgroundColor } from './effects/Background';
import { Custom } from './effects/Custom';
import {OpticalIllusion} from './effects/OpticalIllusion';

export class Flamenco {
  private player: Player;

  private heightEffect = new Height();
  private widthEffect = new Width();
  private colorEffect = new FontColor();
  private backgroundEffect = new BackgroundColor();
  private pulseEffect = new Pulse();
  private customEffects = new Custom();
  private opticalIllusion = new OpticalIllusion();

  private effects = [
    this.heightEffect,
    this.widthEffect,
    this.colorEffect,
    this.backgroundEffect,
    this.pulseEffect,
    this.opticalIllusion,
    this.customEffects,
  ];

  constructor() {
    this.player = new Player();
  }

  addEffect(effect:Effect): void {
    switch (effect.kind) {
    case 'height':
      this.heightEffect.pushEffect(effect);
      break;
    case 'width':
      this.widthEffect.pushEffect(effect);
      break;
    case 'color':
      this.colorEffect.pushEffect(effect);
      break;
    case 'background':
      this.backgroundEffect.pushEffect(effect);
      break;
    case 'pulse':
      this.pulseEffect.pushEffect(effect);
      break;
    case 'opticalIllusion':
      this.opticalIllusion.pushEffect(effect);
      break;
    case 'custom':
      this.customEffects.pushEffect(effect);
      break;
    default:
      throw new Error('Invalid effect');
    }
  }

  async setMusic(musicPath: string): Promise<void> {
    await this.player.setMusic(musicPath);
  }

  play(): void {
    this.player.start();
    this.player.on('sound-analyzed', ({ dataArray }) => {
      this.effects.forEach((effect) => {
        effect.update(dataArray);
      });
    });
  }

  stop(): void {
    this.player.stop();
  }

  get isPlaying(): boolean {
    return this.player.isPlaying;
  }

  get initialized(): boolean {
    return this.player.musicLoaded;
  }
}
