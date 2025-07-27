import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { HealthAdj } from "./HealthAdj";

export class HitCmd extends CmdBase {
    constructor(public me: Mob, public him: Mob, public g: GameIF) {
        super(me, g);
    }

    exec(): boolean {
        let me = this.me.name;
        let him = this.him.name;
        let rnd = this.game.rnd;
        let dmg = rnd.rndC(0, 3);
        if (dmg == 3) {
            dmg = 1;
        }
        if (this.me.isPlayer || this.him.isPlayer) {
            let s = dmg ? `${me} hits ${him} for ${dmg}`
                : `${me} misses ${him}`
            this.game.message(s);
        }
        HealthAdj.adjust(this.him, -dmg, this.g, this.me);
        return true;
    }

}
