import { TermIF } from "term/TermIF";
import { StackIF } from "./stack/StackIF";
import { StackScreenIF } from "./stack/StackScreenIF";
import { ScreenMakerIF } from "./ScreenMakerIF";

export class OverScreen implements StackScreenIF {

    constructor(public make: ScreenMakerIF) {}
    draw(term: TermIF): void {
        term.txt(1, 1, " GAME OVER! ", "yellow", "red");
    }
    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        stack.pop();
        stack.push(this.make.newGame());
    }
    name = "gameover";

}
