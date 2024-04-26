export class SoundAnalyzer {
  audioContext: AudioContext;
  private analyser: AnalyserNode;
  private dataArray: Uint8Array;
  private source?: AudioBufferSourceNode;
  private mustStop = false;

  constructor() {
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.1;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  analyzeSound(audioBuffer: AudioBuffer, animationCallback: (dataArray: Uint8Array) => void): void {
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    source.start();

    this.source = source;

    const analyze = (): void => {

      this.analyser.getByteTimeDomainData(this.dataArray);

      animationCallback(this.dataArray);

      if(this.mustStop) {
        this.mustStop = false;
        return;
      }
      requestAnimationFrame(analyze);
    };

    analyze();
  }

  getAnalyser(): AnalyserNode {
    return this.analyser;
  }

  getAudioContext(): AudioContext {
    return this.audioContext;
  }

  getDataArray(): Uint8Array {
    return this.dataArray;
  }

  stop(): void {
    this.source?.stop();
    this.mustStop = true;
  }
}

