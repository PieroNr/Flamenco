"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SoundAnalyser_1 = require("./SoundAnalyser");
const Height_1 = require("./setEffect/Height");
const Width_1 = require("./setEffect/Width");
const FontColor_1 = require("./setEffect/FontColor");
const Background_1 = require("./setEffect/Background");
class Player {
    constructor(forceAudioContext) {
        this.createSourceFromAudioElement = (audioElement) => {
            audioElement.setAttribute('rythm-connected', this.connectedSources.length.toString());
            const source = this.audioCtx.createMediaElementSource(audioElement);
            this.connectedSources.push(source);
            return source;
        };
        this.connectExternalAudioElement = (audioElement) => {
            this.audio = audioElement;
            this.currentInputType = this.inputTypeList.EXTERNAL;
            const connectedIndex = parseInt(audioElement.getAttribute('rythm-connected') || '', 10);
            if (isNaN(connectedIndex)) {
                this.source = this.createSourceFromAudioElement(this.audio);
            }
            else {
                this.source = this.connectedSources[connectedIndex];
            }
            this.connectSource(this.source);
        };
        this.connectSource = (source) => {
            source.connect(this.gain);
            //this.gain.connect(Analyser.analyser);
            if (this.currentInputType !== this.inputTypeList.STREAM) {
                // Analyser.analyser.connect(this.audioCtx.destination);
                this.audio.addEventListener('ended', this.stop);
            }
            else {
                //  Analyser.analyser.disconnect();
            }
        };
        this.setMusic = (trackUrl) => {
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
        this.setGain = (value) => {
            this.gain.gain.value = value;
        };
        this.start = (name = []) => {
            if (this.audioBuffer) {
                this.analyser.analyzeSound(this.audioBuffer, (dataArray) => {
                    const functionsMap = {
                        'height': () => this.height.set(dataArray, name.filter(item => typeof item !== 'string' && item.name === 'height')),
                        'Width': () => this.width.set(dataArray, name.filter(item => typeof item !== 'string' && item.name === 'Width')),
                        'Color': () => this.color.set(dataArray, name.filter(item => typeof item !== 'string' && item.name === 'Color')),
                        'Background': () => this.backgroundColor.set(dataArray, name.filter(item => typeof item !== 'string' && item.name === 'Background')),
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
        this.stop = () => {
            this.analyser.stop();
        };
        this.analyser = new SoundAnalyser_1.default();
        this.audioBuffer = null;
        this.height = new Height_1.default();
        this.width = new Width_1.default();
        this.color = new FontColor_1.default();
        this.backgroundColor = new Background_1.default();
        this.browserAudioCtx = window.AudioContext;
        this.audioCtx = forceAudioContext || new this.browserAudioCtx();
        this.connectedSources = [];
        // Analyser.initialise(this.audioCtx.createAnalyser());
        this.gain = this.audioCtx.createGain();
        this.source = {};
        this.audio = {};
        //this.hzHistory = [];
        this.inputTypeList = {
            TRACK: 0,
            STREAM: 1,
            EXTERNAL: 2,
        };
        this.currentInputType = this.inputTypeList.TRACK;
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map