import { GameIF } from "model/GameIF";
import { BaseScreen } from "./BaseScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { Bag } from "model/Bag";
import { TermIF } from "term/TermIF";
import { StackIF } from "./stack/StackIF";
import { Object } from "model/Object";
import { ItemScreen } from "./ItemScreen";

export class InventoryScreen extends BaseScreen {
    name: string = 'inventory';
    bag: Bag;
    constructor(game: GameIF, maker: ScreenMakerIF) {
        super(game, maker);
        this.bag = game.bag;
    }

    position2Char(pos: number) {
        return String.fromCharCode(65 + pos);
    }

    char2Pos(c: string) {
        let pos = c.charCodeAt(0) - 'a'.charCodeAt(0);
        if (pos < 0 || pos >= this.bag.len()) {
            pos = -1;
        }
        return pos;
    }

    draw(term: TermIF): void {
        term.txt(0, 0, "You carry", "yellow", "black");
        let pos = 0;
        for (var o of this.bag.objects) {
            let c = this.position2Char(pos);
            term.txt(0, 1 + pos, `${c} ${o.description()}`, "yellow", "black");
            pos++;
        }
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        let pos = this.char2Pos(e.key);
        if (pos >= 0) {
            this.itemMenu(pos, stack);
        } else {
            stack.pop();
        }
    }
    itemMenu(pos: number, stack: StackIF) {
        let item: Object = this.bag.objects[pos];
        stack.pop();
        stack.push(
            new ItemScreen(item, pos, this.game, this.make)
        );
    }
}
