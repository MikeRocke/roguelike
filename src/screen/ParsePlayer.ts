import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { StackIF } from "./stack/StackIF";
import { WPoint } from "model/WPoint";
import { CmdIF } from "commands/CmdIF";
import { MoveCmd } from "commands/MoveCmd";
import { WaitCmd } from "commands/WaitCmd";

export class ParsePlayer {
    public player: Mob;
    public map: DMapIF;
    constructor(public game: GameIF, public maker: ScreenMakerIF) {
        this.player = <Mob>game.player;
        this.map = <DMapIF>game.currentMap();
    }

    static keyPressToCode(e: JQuery.KeyDownEvent): string {
        let c: string = e.key;
        switch (e.code) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                c = e.code;
                break;
        }
        return c;
    }

    parseKeyCodeAsTurn(c: string, screenStack: StackIF,
        e: JQuery.KeyDownEvent | null): boolean {
        let cmd = this.parseKeyCmd(c, screenStack, e);
        return (cmd ? cmd.turn() : false);
    }

    parseKeyCmd(c: string, screenStack: StackIF,
        e: JQuery.KeyDownEvent | null): CmdIF | null {
        let dir = new WPoint();
        switch (c) {
            case "ArrowLeft":
            case 'h':
            case "H":
                dir.x -= 1;
                break;

            case "ArrowRight":
            case 'l':
            case "L":
                dir.x += 1;
                break;


            case "ArrowDown":
            case 'j':
            case "J":
                dir.y += 1;
                break;


            case "ArrowUp":
            case 'k':
            case "K":
                dir.y -= 1;
                break;
        }
        if (!dir.empty()) {
            return this.moveCmd(dir);
        }
        return null;
    }

    moveCmd(dir: WPoint): CmdIF {
        return new MoveCmd(dir, this.player, this.game);
    }

    waitCmd(): CmdIF {
        return new WaitCmd(this.player, this.game);
    }
}
