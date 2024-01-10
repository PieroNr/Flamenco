class SoundAnalyzer {
    audioContext: AudioContext;
    private analyser: AnalyserNode;
    private dataArray: Uint8Array;

    constructor() {
        if (typeof window !== 'undefined' && typeof window.AudioContext === 'function') {
            this.audioContext = new window.AudioContext();
        } else {
            const WebAudioAPI = require('web-audio-api');
            this.audioContext = new WebAudioAPI.AudioContext();
            console.warn('Web Audio API is not supported in this browser, using a polyfill');
        }

        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256; // Vous pouvez ajuster la taille en fonction de vos besoins
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }

    async analyzeSound(audioBuffer: AudioBuffer, animationCallback: (dataArray: Uint8Array) => void): Promise<void> {
        // Connectez l'analyseur au buffer audio
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        // Commencez la lecture audio
        source.start();

        // Utilisez une fonction fléchée pour garantir que le contexte (this) est correct
        const analyze = (): void => {
            // Mettez à jour dataArray avec les données actuelles de l'analyseur
            this.analyser.getByteTimeDomainData(this.dataArray);

            // Appelez la fonction de rappel d'animation avec les données d'analyse
            animationCallback(this.dataArray);

            // Répétez l'analyse à la fréquence souhaitée
            requestAnimationFrame(analyze);
        };

        // Démarrez l'analyse
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
        this.analyser.disconnect();
        this.audioContext.close();
    }
}

export default SoundAnalyzer;
