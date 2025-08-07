import { Worn } from "model/Worn";
import { BaseScreen } from "./BaseScreen";
import { GameIF } from "model/GameIF";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { Slot } from "model/Slot";
import { StackIF } from "./stack/StackIF";
import { TermIF } from "term/TermIF";
import { Object } from "model/Object";
import { UnequipCmd } from "commands/UnequipCmd";

export class WornScreen extends BaseScreen {
    name: string = 'worn';
    worn: Worn;
    constructor(game: GameIF, maker: ScreenMakerIF) {
        super(game, maker);
        this.worn = game.worn;
    }

    slot2char(position: Slot): string {
        return String.fromCharCode(65 + (position - Slot.MainHand));
    }

    chat2slot(c: string): Slot {
        let i: number = (c.charCodeAt(0) - 'a'.charCodeAt(0)) + Slot.MainHand;
        return i in Slot ? i as Slot : Slot.NotWorn;
    }

    draw(term: TermIF): void {
        let y: number = 1;

        term.txt(0, y++, 'You are wearing', 'yellow', 'black');
        for (let slot=Slot.MainHand; slot < Slot.Last; ++slot) {
            let c:string = this.slot2char(slot);
            let label:string = Slot[slot];

            let wornItem:Object|undefined = this.worn.get(slot);
            let worn:string = (wornItem ? wornItem.description() : '');
            let fg = (wornItem ? 'yellow' : 'darkgray');
            term.txt(0, y++, `${c} ${worn} (${label})`, fg, 'black');
        }


    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        let slot = this.chat2slot(e.key);
        if (slot == Slot.NotWorn || this.unequip(slot)) {
            stack.pop();
        }
    }
    unequip(slot: Slot): boolean {
        return new UnequipCmd(slot, this.game).turn()
    }
}
