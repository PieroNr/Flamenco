// Flamenco.ts
import player from './Player';

class Flamenco {
    private player: player;

    constructor() {
        this.player = new player()
    }

    setMusic(musicPath: string): void {
        this.player.setMusic(musicPath);
    }

    play(): void {
       this.player.start()
    }

    stop(): void {
        this.player.stop();

    }
}

export default Flamenco;
