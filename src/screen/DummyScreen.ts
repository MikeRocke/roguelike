import { TermIF } from "term/TermIF";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { StackIF } from "./stack/StackIF";
import { StackScreenIF } from "./stack/StackScreenIF";


export class DummyScreen implements StackScreenIF {
    constructor(public maker: ScreenMakerIF) {}

    draw(term: TermIF): void {
        term.txt(1, 1, " Press Key ", "cyan", "blue");
    }
    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        stack.pop();
        stack.push(this.maker.gameOver());
    }
    name = "dummy-game";

}
