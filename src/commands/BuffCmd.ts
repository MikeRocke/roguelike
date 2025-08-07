import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { Buff } from "model/Buff";
import { TickIF } from "model/TickIF";
import { BuffIF } from "model/BuffIF";

export class BuffCmd extends CmdBase {
    constructor(public buff: Buff, public target: Mob, game: GameIF, me: Mob) {
        super(me, game);
    }

    exec(): boolean {
        let effect: TickIF | undefined = undefined;
        switch (this.buff) {

        }
        let active: BuffIF = {
            buff: this.buff, time: 8, effect: effect
        }
        this.addBuffToMob(active, this.game, this.target);
        return true;
    }
    addBuffToMob(active: BuffIF, game: GameIF, mob: Mob) {
        if (mob.isPlayer || this.me.isPlayer) {
            let who = mob.name;
            let what:string = Buff[active.buff];
            let by = this.me.name;
            game.message(`${who} is ${what} by ${by}`);

        }

        mob.buffs.add(active, game, mob);
    }
}
