import { CmdIF } from "commands/CmdIF";
import { BaseScreen } from "./BaseScreen"
import { GameIF } from "model/GameIF";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { TermIF } from "term/TermIF";
import { StackIF } from "./stack/StackIF";
import { WPoint } from "model/WPoint";

export class CmdDirScreen extends BaseScreen {
    name: string = 'dir';
    constructor(public cmd: CmdIF, game: GameIF, maker: ScreenMakerIF) {
        super(game, maker);
    }

    draw(term: TermIF): void {
        term.txt(0, 0, "What direction?", "yellow", "black");
        let R = ['H Left', 'J Down', 'K Up', 'L Right'];
        for (var i = 0; i < R.length; ++i) {
            term.txt(0, i + 1, R[i], "yellow", "black");

        }
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        stack.pop();
        let dir = new WPoint();
        switch (e.key) {
            case 'h': dir.x = - 1; break;
            case 'j': dir.y = 1; break;
            case 'k': dir.y = - 1; break;
            case 'l': dir.x = 1; break;
        }
        if (!dir.empty()) {
            this.actDir(dir);
        }
    }
    actDir(dir: WPoint) {
        this.cmd.setDir(dir).exec();
    }
}
