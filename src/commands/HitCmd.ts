import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { HealthAdj } from "./HealthAdj";
import { Rnd } from "model/Rnd";
import { Worn } from "model/Worn";
import { Act } from "./Act";
import { Buff } from "model/Buff";

export class HitCmd extends CmdBase {
    act: Act = Act.Hit;
    constructor(public me: Mob, public him: Mob, public g: GameIF) {
        super(me, g);
    }

    exec(): boolean {
        let me = this.me.name;
        let him = this.him.name;
        let rnd = this.game.rnd;
        let dmg = this.calcDamage(rnd, this.me);

        if(this.him.isPlayer) {
            let factor = this.game.worn.AC_reduce();
            dmg = Math.ceil(dmg*factor);
        }
        let rest = (this.him.hp - dmg);

        if (this.me.isPlayer || this.him.isPlayer) {
            let s = dmg ? `${me} hits ${him} for ${dmg}-> ${rest}`
                : `${me} misses ${him}`
            this.game.message(s);
        }
        HealthAdj.adjust(this.him, -dmg, this.g, this.me);
        this.clearCharm(this.game);
        return true;
    }
    clearCharm(game: GameIF) {
        let him = this.him;
        if (!him.is(Buff.Charm)) {
            return;
        }
        him.buffs.cleanse(Buff.Charm, game, him);
    }

    calcDamage(rnd: Rnd, me: Mob):number {
       let dmg = rnd.rndC(0, this.power(me));
        return dmg;
    }
    power(me: Mob): number {
        return me.isPlayer ? this.playerPower(me) : this.npcPower(me);
    }
    playerPower(me: Mob): number {
        let game = this.game;
        return this.wornPower(game, game.worn);
    }
    wornPower(game: GameIF, worn: Worn): number {
        return worn.weapon() ? worn.weaponDamage() : this.unarmed();
    }
    unarmed(): number {
        return 3;
    }
    npcPower(me: Mob): number {
        return me.level + 1;
    }

}
