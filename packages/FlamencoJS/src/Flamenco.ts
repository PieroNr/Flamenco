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
        this.player.start();
    }

    stop(): void {
        this.player.stop();
        // Arrêtez l'analyse ou effectuez d'autres opérations de nettoyage si nécessaire
        // Note : Actuellement, il n'y a pas de méthode stop() dans l'exemple de SoundAnalyser fourni précédemment.
    }
}

export default Flamenco;
