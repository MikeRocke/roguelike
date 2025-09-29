import { Buff } from "model/Buff";
import { CmdBase } from "./CmdBase";
import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";

export class CleanseAllCmd extends CmdBase {
    constructor(public me: Mob, public game: GameIF) {
        super(me, game);
    }

    exec(): boolean {
        let me = this.me;
        for (var i:Buff = 0; i < Buff.Levitate; ++i) {
            me.buffs.cleanse(i, this.game, me);
        }
        return true;
    }


}
