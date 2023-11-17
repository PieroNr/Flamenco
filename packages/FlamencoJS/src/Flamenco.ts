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
                .then(buffer => this.analyser.getAudioContext().decodeAudioData(buffer))
                .then(audioBuffer => {
                    this.audioBuffer = audioBuffer;
                    resolve();
                })
                .catch(error => reject(error));
        });
    }

    play(): void {
        if (this.audioBuffer) {
            this.analyser.analyzeSound(this.audioBuffer, (dataArray) => {
                // Ajoutez votre logique d'animation ici, par exemple :
                // const shouldRotate = dataArray[10] > 128;
                // if (shouldRotate) {
                //   // Appliquer la rotation à votre élément DOM
                // }
            });
        }
    }

    stop(): void {
        // Arrêtez l'analyse ou effectuez d'autres opérations de nettoyage si nécessaire
        // Note : Actuellement, il n'y a pas de méthode stop() dans l'exemple de SoundAnalyser fourni précédemment.
    }
}

export default Flamenco;
