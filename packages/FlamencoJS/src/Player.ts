import {SoundAnalyzer} from './SoundAnalyser';
import { EventEmitter } from './EventEmitter';

export class Player extends EventEmitter<{
  'music-loaded': void;
  'sound-analyzed': {dataArray: Uint8Array};
}> {
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
    super();
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

  async setMusic (trackUrl: string): Promise<void> {
    const arrayBuffer = await fetch(trackUrl).then(response => response.arrayBuffer());
    const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
    this.audioBuffer = audioBuffer;
  }

  setGain = (value: number): void => {
    this.gain.gain.value = value;
  };

  start (): void {
    if (!this.audioBuffer) {
      throw new Error('Set music before starting the player.');
    }

    this.analyser.analyzeSound(this.audioBuffer, (dataArray) => {
      this.emit('sound-analyzed', {dataArray});
    });
  }

  stop = (): void => {
    this.analyser.stop();
  };

  get musicLoaded(): boolean {
    return this.audioBuffer !== null;
  }
}
