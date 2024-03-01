import {Effect} from '../types';

export abstract class AbstractSetEffect <T extends Effect>{
  effects: {
    effect: T;
    elements?: HTMLElement[];
  }[] = [];

  constructor(effects: T[]) {
    effects.forEach(effect => {
      if(effect.kind === 'custom') {
        this.effects.push({effect});
        return;
      }
      this.effects.push({effect, elements: Array.from(document.querySelectorAll(effect.selector))});
    });
  }

  abstract set(dataArray: Uint8Array): void;
}