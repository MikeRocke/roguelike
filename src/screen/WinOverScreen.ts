import { TermIF } from "term/TermIF";
import { StackIF } from "./stack/StackIF";
import { StackScreenIF } from "./stack/StackScreenIF";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { GameIF } from "model/GameIF";

export class WinOverScreen implements StackScreenIF {

    constructor(public make: ScreenMakerIF, public game: GameIF) {}
    onTime(stack: StackIF): boolean {
        return false;
    }
    draw(term: TermIF): void {
        let won = (this.game && this.game.gameWon);
        if (won) {
            term.txt(1, 1, " You Won!", "blue", "lime");
        } else {

            term.txt(1, 1, " GAME OVER! ", "yellow", "red");
        }
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        stack.pop();
        stack.push(this.make.newGame());
    }
    name = "wingameover";


}
