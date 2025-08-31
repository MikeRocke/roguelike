import { CmdIF } from "commands/CmdIF";
import { WearCmd } from "commands/WearCmd";
import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Object } from "model/Object";
import { TermIF } from "term/TermIF";
import { BaseScreen } from "./BaseScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { StackIF } from "./stack/StackIF";
import { FindObjectSpell } from "commands/FindObjectSpell";
import { StackScreenIF } from "./stack/StackScreenIF";
import { CmdBase } from "commands/CmdBase";

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
            case 'w': this.wear(stack); break;
            case 'u': this.useItem(stack); break;
            default: stack.pop(); break;
        }
    }
    useItem(stack:StackIF) {
       let game = this.game;
        let finder = new FindObjectSpell(this.obj, this.index, game, stack, this.make);
        let spell: CmdIF | StackScreenIF | null = finder.find();
        if (spell == null) {
            return;
        }
        stack.pop();
        if (spell instanceof CmdBase) {
            if (spell.turn()) {
                this.npcTurns(stack);
            }
        } else {
            stack.push(<StackScreenIF> spell);
        }
    }
    wear(stack: StackIF) {
        let ok = new WearCmd(this.obj, this.index, this.game).turn();
        if (ok) {
            this.popAndNpcLoop(stack);
        }
        return ok;
    }
    dropItem(stack: StackIF) {
        if (this.dropBagItem()) {
            this.popAndNpcLoop(stack);
        }
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
