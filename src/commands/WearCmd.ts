import { GameIF } from "model/GameIF";
import { Object } from "model/Object";
import { Worn } from "model/Worn";
import { CmdBase } from "./CmdBase";
import { Slot } from "model/Slot";

export class WearCmd extends CmdBase {
    worn: Worn;

    constructor(public obj: Object, public index: number, public game: GameIF) {
        super(game.player, game);
        this.worn = game.worn;
    }

    exec(): boolean {
        let game = this.game;
        let obj = this.obj;
        if (!this.wearable(obj)) {
            return false;
        }
        if (this.alreadyWorn(obj)) {
            return false;
        }
        if (this.handsFull(obj)) {
            return false;
        }
        game.bag.removeIndex(this.index);
        this.worn.add(obj);
        game.message(`You wear ${obj.name()}`);
        return true;
    }
    handsFull(obj: Object): boolean {
        if (!Worn.isWeapon(obj)) {
            return false;
        }
        let worn = this.worn;
        let inHand:Object|undefined = worn.weapon();
        if (!inHand) {
            return false;
        }
        let overlap = this.overlaps(obj.slot, inHand!.slot);
        if (overlap) {
            this.game.flash(`unequip ${inHand!.name()} first`);
        }
        return overlap;
    }
    overlaps(slot: Slot, inHand: Slot) {
        return slot == Slot.BothHands || inHand == Slot.BothHands || inHand == slot;
    }
    alreadyWorn(obj: Object):boolean {
        let alreadyWearing = this.worn.has(obj.slot);
        if (alreadyWearing) {
            let label = Slot[obj.slot];
            this.game.flash(`${label} already worn`);
        }
        return alreadyWearing;
    }
    wearable(obj: Object):boolean {
        let canWear = (obj.slot != Slot.NotWorn);
        if (!canWear) {
            this.game.flash(`You cannot wear ${obj.name()}`);
        }
        return canWear;
    }
}
