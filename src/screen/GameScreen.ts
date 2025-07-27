import { StackIF } from "./stack/StackIF";
import { GameIF } from "model/GameIF";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { BaseScreen } from "./BaseScreen";
import { ParsePlayer } from "./ParsePlayer";

export class GameScreen extends BaseScreen {

    name: string = 'game';

    constructor(public game: GameIF, public make: ScreenMakerIF) {
        super(game, make);
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        this.playerKeyTurn(stack, ParsePlayer.keyPressToCode(e), e);
    }

    playerKeyTurn(stack: StackIF, code: string,
        e: JQuery.KeyDownEvent | null): void {
        if (this.game.log) {
            this.game.log.clearQueue();
        }
        if (this.playerTurn(stack, code, e)) {
            this.npcTurns(stack);
        }
    }
    playerTurn(stack: StackIF, code: string,
        e: JQuery.KeyDownEvent | null): boolean {
        let parser = new ParsePlayer(this.game, this.make);
        return parser.parseKeyCodeAsTurn(code, stack, e);
    }
}
