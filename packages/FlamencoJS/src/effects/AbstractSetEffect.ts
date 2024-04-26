import {Effect} from '../types';

export abstract class AbstractSetEffect <T extends Effect>{
  effects: {
    effect: T;
    elements?: HTMLElement[];
  }[] = [];
  pushEffect(effect: T): void {
    if(effect.kind === 'custom') {
      this.effects.push({effect});
      return;
    }
    this.effects.push({effect, elements: Array.from(document.querySelectorAll(effect.selector))});
  }

  abstract update(dataArray: Uint8Array): void;


}