import { Mob } from "model/Mob";
import { CmdBase } from "./CmdBase";
import { GameIF } from "model/GameIF";
import { HealthAdj } from "./HealthAdj";

export class HealCmd extends CmdBase {
    constructor(public r: number, public me: Mob, public game: GameIF) {
        super(me, game);
    }

    exec(): boolean {
        let game = this.game;
        let random = game.rnd;
        let r = this.r;
        let a = Math.ceil(r * 0.5);
        let b = Math.floor(r * 1.5);
        let hp = random.rnd(a, b);
        HealthAdj.heal(this.me, hp);
        game.message(`${this.me.name} feels better (%{hp})`);
        return true;
    }
}
