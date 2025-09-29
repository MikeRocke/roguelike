import { GameIF } from "model/GameIF";
import { BaseScreen } from "./BaseScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { TermIF } from "term/TermIF";
import { Spell } from "commands/Spell";
import { StackIF } from "./stack/StackIF";
import { CostIF } from "commands/CostIF";
import { CmdIF } from "commands/CmdIF";
import { StackScreenIF } from "./stack/StackScreenIF";
import { CmdBase } from "commands/CmdBase";
import { SpellFinder } from "commands/SpellFinder";

export class SpellScreen extends BaseScreen {
    name: string = "spell";
    constructor(game: GameIF, maker: ScreenMakerIF) {
        super(game, maker);
    }

    pos2char(pos: number) {
        return String.fromCharCode(65 + pos);
    }

    char2pos(c: string) {
        return c.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    draw(term: TermIF) {
        super.draw(term);
        term.txt(0, 1, 'Spells:', 'yellow', 'black');
        let top = 1;
        let y = top;
        let x = 0;
        for (var s: Spell = 0; s < Spell.None; ++s) {
            let c = this.pos2char(s);
            let L = Spell[s];
            term.txt(x, 1 + y++, `${c} ${L}`, 'yellow', 'black');
            if (y > 12) {
                y = top;
                x += 14;
            }
        }
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        this.game.log.clearQueue();
        stack.pop();
        let pos = this.char2pos(e.key);
        this.itemMenu(pos, stack);
    }
    itemMenu(pos: number, stack: StackIF) {
        let spell:Spell = pos;
        let label = Spell[spell];
        if (label) {
            this.doSpell(spell, stack);
        }
    }
    doSpell(spell: Spell, stack: StackIF) {
        let finder = new SpellFinder(this.game, stack, this.make);
        let cost:CostIF|undefined = undefined;
        let spellCmd:CmdIF|StackScreenIF|null = finder.find(spell, cost);
        if (spellCmd == null) {
            return;
        }
        if (spellCmd instanceof CmdBase) {
            if (spellCmd.turn()) {
                this.npcTurns(stack);
            }
        } else {
            stack.push(<StackScreenIF> spellCmd);
        }

    }
}
