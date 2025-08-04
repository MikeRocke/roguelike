import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { HealthAdj } from "./HealthAdj";
import { Rnd } from "model/Rnd";

export class HitCmd extends CmdBase {
    constructor(public me: Mob, public him: Mob, public g: GameIF) {
        super(me, g);
    }

    exec(): boolean {
        let me = this.me.name;
        let him = this.him.name;
        let rnd = this.game.rnd;
        let dmg = this.calcDamage(rnd, this.me);

        if (this.me.isPlayer || this.him.isPlayer) {
            let s = dmg ? `${me} hits ${him} for ${dmg}`
                : `${me} misses ${him}`
            this.game.message(s);
        }
        HealthAdj.adjust(this.him, -dmg, this.g, this.me);
        return true;
    }
    calcDamage(rnd: Rnd, me: Mob):number {
        let level = me.level;
        let lim = level+1;
        if (me.isPlayer) {
            lim = 3;
        }
        let dmg = rnd.rndC(0, lim);
        return dmg;
    }

}
