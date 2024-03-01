"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Flamenco.ts
const Player_1 = require("./Player");
class Flamenco {
    constructor() {
        this.player = new Player_1.default();
        this.nameEffect = [];
    }
    setEffect(effectName, className) {
        this.nameEffect.push({ name: effectName, class: className });
    }
    setMusic(musicPath) {
        this.player.setMusic(musicPath);
    }
    play() {
        this.player.start(this.nameEffect);
    }
    stop() {
        this.player.stop();
    }
}
exports.default = Flamenco;
//# sourceMappingURL=Flamenco.js.map