import { GameIF } from "model/GameIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { StackIF } from "screen/stack/StackIF";
import { CmdIF } from "./CmdIF";
import { Object } from "model/Object";
import { StackScreenIF } from "screen/stack/StackScreenIF";
import { ChargedItemCost } from "./ChargedItemCost";
import { Spell } from "./Spell";
import { SpellFinder } from "./SpellFinder";

export class FindObjectSpell {
    constructor(public object: Object, public index: number, public game: GameIF, public stack: StackIF, public maker: ScreenMakerIF) {}

    usable(object: Object): boolean {
        let canUse = (object.spell != Spell.None);
        if (!canUse) {
            this.game.flash(
                `${object.name()} is not usable: ${object.slot}`)
        }
        return canUse;
    }

    find(): CmdIF | StackScreenIF | null {
        let object: Object = this.object;
        if (!this.usable(object)) {
            return null;
        }
        let game = this.game;
        let finder = new SpellFinder(game, this.stack, this.maker);
        let cost = new ChargedItemCost(game, this.object, this.index);
        return finder.find(object.spell, cost);
    }
}
