import { GameIF } from "model/GameIF";
import { BaseScreen } from "./BaseScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { TermIF } from "term/TermIF";
import { StackIF } from "./stack/StackIF";

export class LogScreen extends BaseScreen {
    name: string = 'log';
    messageLog: string[];
    constructor(game: GameIF, maker: ScreenMakerIF) {
        super(game, maker);
        this.messageLog = game.log.archive;
    }

    draw(term: TermIF): void {
        term.txt(0, 0, 'Log: ', 'yellow', 'black');
        let log = this.messageLog;
        let range = term.dimension.y - 1;
        if (log.length < range) {
            range = log.length;
        }
        let offset = log.length - range;
        for (var p = 0; p < range; ++p) {
            let pos = offset+p;
            if (pos < 0) {
                continue;
            }
            let row = log[pos];
            term.txt(0, 1+p, `${p} ${row}`, 'yellow', 'black');
        }

    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        stack.pop();
    }
}
