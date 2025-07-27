import { GameIF } from "model/GameIF";
import { BaseScreen } from "./BaseScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { StackIF } from "./stack/StackIF";

export class MoreScreen extends BaseScreen {
    name='more';
    constructor(game: GameIF, make: ScreenMakerIF) {
        super(game, make);
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        let log = this.game.log;
        log.dequeue();
        if(!log.queuedMessages()) {
            stack.pop();
        }
    }
}
