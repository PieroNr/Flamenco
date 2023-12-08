// Flamenco.ts
import player from './Player';




class Flamenco {
    private player: player;
    private nameEffect: string[];
    private classEffect: string[];

    constructor() {
        this.player = new player();
        this.nameEffect = [];
        this.classEffect = [];
    }

    setEffect(effectName: string, className: string): void {
        this.nameEffect.push(effectName);
        this.classEffect.push(className);
    }



    setMusic(musicPath: string): void {
        this.player.setMusic(musicPath);
    }

    play(): void {
        this.player.start(this.nameEffect, this.classEffect)
    }

    stop(): void {
        this.player.stop();
    }
}






export default Flamenco;
