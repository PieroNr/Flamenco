import SoundAnalyser from './SoundAnalyser';
import Height from './setEffect/Height';

class Player {
    private analyser: SoundAnalyser;
    private audioBuffer: AudioBuffer | null;
    private height: Height;

    private browserAudioCtx: typeof window.AudioContext
    private audioCtx: AudioContext;
    private connectedSources: MediaElementAudioSourceNode[];
    private gain: GainNode;
    private source: MediaElementAudioSourceNode | MediaStreamAudioSourceNode;
    private audio: HTMLAudioElement | MediaStream;
    private hzHistory: any[];
    private currentInputType: number;
    private inputTypeList: {
        TRACK: number;
        STREAM: number;
        EXTERNAL: number;
    };

    constructor(forceAudioContext?: AudioContext) {
        this.analyser = new SoundAnalyser();
        this.audioBuffer = null;

        this.height = new Height();

        this.browserAudioCtx = window.AudioContext
        this.audioCtx = forceAudioContext || new this.browserAudioCtx();
        this.connectedSources = [];
        // Analyser.initialise(this.audioCtx.createAnalyser());
        this.gain = this.audioCtx.createGain();
        this.source = {} as MediaElementAudioSourceNode;
        this.audio = {} as HTMLAudioElement | MediaStream;
        this.hzHistory = [];
        this.inputTypeList = {
            TRACK: 0,
            STREAM: 1,
            EXTERNAL: 2,
        };
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
        //this.gain.connect(Analyser.analyser);
        if (this.currentInputType !== this.inputTypeList.STREAM) {
            // Analyser.analyser.connect(this.audioCtx.destination);
            (this.audio as HTMLAudioElement).addEventListener('ended', this.stop);
        } else {
            //  Analyser.analyser.disconnect();
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


        //this.audio = new Audio(trackUrl);
        //this.currentInputType = this.inputTypeList.TRACK;
        //this.source = this.createSourceFromAudioElement(this.audio as HTMLAudioElement);
        //this.connectSource(this.source);
    };

    setGain = (value: number): void => {
        this.gain.gain.value = value;
    };

    start = (name: string[]): void => {
        if (this.audioBuffer) {
            this.analyser.analyzeSound(this.audioBuffer, (dataArray) => {

                const functionsMap: Record<string, () => void> = {
                    'height': () => this.height.set(dataArray, name.filter(item => typeof item !== 'string' && item.name === 'height')),
                    // Ajoutez d'autres associations au besoin
                };

                name.forEach((item) => {
                    const itemName = typeof item === 'string' ? item : item.name;
                    const func = functionsMap[itemName];
                    if (func) {
                        func();
                    }
                });
            });
        }
    };

    stop = (): void => {
        this.analyser.stop();
    };
}

export default Player;
