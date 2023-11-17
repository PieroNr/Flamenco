// Flamenco.ts
import SoundAnalyser from './SoundAnalyser';
class Flamenco {
    private analyser: SoundAnalyser;
    private audioBuffer: AudioBuffer | null;

    constructor() {
        this.analyser = new SoundAnalyser();
        this.audioBuffer = null;
    }

    setMusic(musicPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(musicPath)
                .then(response => response.arrayBuffer())
                .then(buffer => this.analyser.audioContext.decodeAudioData(buffer))
                .then(audioBuffer => {
                    this.audioBuffer = audioBuffer;
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    play(): void {
        if (this.audioBuffer) {
            const flamencoElements = document.querySelectorAll('.flamenco');
            this.analyser.analyzeSound(this.audioBuffer, (dataArray) => {
                flamencoElements.forEach((element, i) => {
                    // Exemple : Appliquez la largeur en fonction des données d'analyse
                    const min = 2;
                    const max = 50;
                    const scaledHeight = dataArray[i* Math.round(128/ flamencoElements.length)] / 255 * (max - min) + min - 25;
                    console.log(scaledHeight);

                    element.style.height = `${scaledHeight * 100}px`;
                });
            });
        }
    }

    stop(): void {
        this.analyser.stop();

    }
}

export default Flamenco;
