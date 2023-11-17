// Flamenco.ts
import player from './player';
import SoundAnalyser from './SoundAnalyser';

class Flamenco {
    private analyser: SoundAnalyser;
    private audioBuffer: AudioBuffer | null;
    private player: player;

    constructor() {
        this.analyser = new SoundAnalyser();
        this.audioBuffer = null;
        this.player = new player()
    }

    setMusic(musicPath: string): void {
        this.player.setMusic(musicPath);
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
