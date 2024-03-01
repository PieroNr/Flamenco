"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoundAnalyzer {
    constructor() {
        this.audioContext = new window.AudioContext();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256; // Vous pouvez ajuster la taille en fonction de vos besoins
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }
    async analyzeSound(audioBuffer, animationCallback) {
        // Connectez l'analyseur au buffer audio
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        // Commencez la lecture audio
        source.start();
        // Utilisez une fonction fléchée pour garantir que le contexte (this) est correct
        const analyze = () => {
            // Mettez à jour dataArray avec les données actuelles de l'analyseur
            this.analyser.getByteFrequencyData(this.dataArray);
            // Appelez la fonction de rappel d'animation avec les données d'analyse
            animationCallback(this.dataArray);
            // Répétez l'analyse à la fréquence souhaitée
            requestAnimationFrame(analyze);
        };
        // Démarrez l'analyse
        analyze();
    }
    getAnalyser() {
        return this.analyser;
    }
    getAudioContext() {
        return this.audioContext;
    }
    getDataArray() {
        return this.dataArray;
    }
    stop() {
        this.analyser.disconnect();
        this.audioContext.close();
    }
}
exports.default = SoundAnalyzer;
//# sourceMappingURL=SoundAnalyser.js.map