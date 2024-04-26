import {SoundAnalyzer} from './SoundAnalyser';
import {Height} from './effects/Height';
import {Width} from './effects/Width';
import {FontColor} from './effects/FontColor';
import {BackgroundColor} from './effects/Background';
import {Effect, EffectKind} from './types';
import {Custom} from './effects/Custom';
import {Pulse} from './effects/Pulse';

export class Player {
  private analyser: SoundAnalyzer;
  private audioBuffer: AudioBuffer | null;
  private browserAudioCtx: typeof window.AudioContext;
  private audioCtx: AudioContext;
  private connectedSources: MediaElementAudioSourceNode[];
  private gain: GainNode;
  private source: MediaElementAudioSourceNode | MediaStreamAudioSourceNode;
  private audio: HTMLAudioElement | MediaStream;
  private currentInputType: number;
  private inputTypeList: {
    TRACK: number;
    STREAM: number;
    EXTERNAL: number;
  };

  constructor(forceAudioContext?: AudioContext) {
    this.analyser = new SoundAnalyzer();
    this.audioBuffer = null;
    this.browserAudioCtx = window.AudioContext;
    this.audioCtx = forceAudioContext || new this.browserAudioCtx();
    this.connectedSources = [];
    this.gain = this.audioCtx.createGain();
    this.source = {} as MediaElementAudioSourceNode;
    this.audio = {} as HTMLAudioElement | MediaStream;
    this.inputTypeList = {
      TRACK: 0,
      STREAM: 1,
      EXTERNAL: 2,
    };
    this.currentInputType = this.inputTypeList.TRACK;
  }

  createSourceFromAudioElement = (audioElement: HTMLAudioElement): MediaElementAudioSourceNode => {
    audioElement.setAttribute('rythm-connected', this.connectedSources.length.toString());
    const source = this.audioCtx.createMediaElementSource(audioElement);
    this.connectedSources.push(source);
    return source;
  };


  connectExternalAudioElement = (audioElement: HTMLAudioElement): void => {
    this.audio = audioElement;
    this.currentInputType = this.inputTypeList.EXTERNAL;
    const connectedIndex = parseInt(audioElement.getAttribute('rythm-connected') || '', 10);
    if (isNaN(connectedIndex)) {
      this.source = this.createSourceFromAudioElement(this.audio as HTMLAudioElement);
    } else {
      this.source = this.connectedSources[connectedIndex];
    }
    this.connectSource(this.source);
  };

  connectSource = (source: MediaElementAudioSourceNode | MediaStreamAudioSourceNode): void => {
    source.connect(this.gain);
    if (this.currentInputType !== this.inputTypeList.STREAM) {
      (this.audio as HTMLAudioElement).addEventListener('ended', this.stop);
    }
  };

  setMusic = (trackUrl: string): Promise<void> => {

    return new Promise((resolve, reject) => {
      fetch(trackUrl)
        .then(response => response.arrayBuffer())
        .then(buffer => this.analyser.getAudioContext().decodeAudioData(buffer))
        .then(audioBuffer => {
          this.audioBuffer = audioBuffer;
          resolve();
        })
        .catch(error => reject(error));
    });
  };

  setGain = (value: number): void => {
    this.gain.gain.value = value;
  };

  start = (name: Effect[] = []): void => {
    if (!this.audioBuffer) {
      throw new Error('Set music before starting the player.');
    }

    function getEffectForKind<E extends Effect>(kind: EffectKind): E[] {
      return name.filter((effect): effect is E => effect.kind === kind);
    }

    const heightEffect = new Height(getEffectForKind('height'));
    const widthEffect = new Width(getEffectForKind('width'));
    const colorEffect = new FontColor(getEffectForKind('color'));
    const backgroundEffect = new BackgroundColor(getEffectForKind('background'));
    const pulseEffect = new Pulse(getEffectForKind('pulse'));
    const customEffects = new Custom(getEffectForKind('custom'));

    this.analyser.analyzeSound(this.audioBuffer, (dataArray) => {
      name.forEach((item) => {
        switch (item.kind) {
        case 'height':
          heightEffect.set(dataArray);
          break;
        case 'width':
          widthEffect.set(dataArray);
          break;
        case 'color':
          colorEffect.set(dataArray);
          break;
        case 'background':
          backgroundEffect.set(dataArray);
          break;
        case 'pulse':
          pulseEffect.set(dataArray);
          break;
        case 'custom':
          customEffects.set(dataArray);
        }
      });
    });
  };

  stop = (): void => {
    this.analyser.stop();
  };
}
