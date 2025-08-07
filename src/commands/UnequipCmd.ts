import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { Slot } from "model/Slot";
import { Object } from "model/Object";

export class UnequipCmd extends CmdBase {
    constructor(public slot: Slot, public game: GameIF) {
        super(game.player, game);
    }

    exec(): boolean {
        let slot = this.slot;
        if (slot == Slot.NotWorn) {
            return false;
        }
        let game = this.game;
        let worn = game.worn;
        if(!worn.has(slot)) {
            let label:string = Slot[slot];
            game.flash(`${label} not WORN (${slot})`);
            return false;
        }

        let obj:Object|undefined = worn.get(slot);
        if(!obj) {
            throw `no item ${slot}?`;
        }
        worn.remove(slot);
        game.bag.add(obj);
        game.message(`player removed ${obj.description()}`);
        return true;
    }
}
