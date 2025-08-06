import { GameIF } from "model/GameIF";
import { BaseScreen } from "./BaseScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { TermIF } from "term/TermIF";
import { Object } from "model/Object";
import { StackIF } from "./stack/StackIF";
import { DMapIF } from "model/DMapIF";

export class ItemScreen extends BaseScreen {
    name: string = 'item';
    constructor(public obj: Object, public index: number, game: GameIF, maker: ScreenMakerIF) {
        super(game, maker);
    }

    draw(term: TermIF): void {
        super.draw(term);
        let fg = 'lightblue';
        let bg = '#025';
        let y = 1;
        term.txt(0, 0, `Do what with ${this.obj.name()}`, fg, bg);
        term.txt(0, y++, 'u use', fg, bg);
        term.txt(0, y++, 'd drop', fg, bg);
        term.txt(0, y++, 't throw', fg, bg);
        term.txt(0, y++, 'w wear', fg, bg);
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        switch (e.key) {
            case 'd': this.dropItem(stack); break;
            default: stack.pop(); break;
        }
    }
    dropItem(stack: StackIF) {
        if (this.dropBagItem()) {
            this.popAndNpcLoop(stack);
        }
    }
    popAndNpcLoop(stack: StackIF) {
        stack.pop();
        this.npcTurns(stack);
    }
    dropBagItem() {
        let game = this.game;
        let map = <DMapIF> this.game.currentMap();
        let player = game.player;
        let cell = map.cell(player.pos);
        if (cell.hasObject()) {
            game.flash(`No room to drop here`);
            return false;
        }
        cell.object = this.obj;
        let bag = game.bag;
        bag.removeIndex(this.index);
        game.message(`Player drops ${cell.object.name()}`);
        return true;
    }
}
