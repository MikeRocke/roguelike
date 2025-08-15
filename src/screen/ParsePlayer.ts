import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { StackIF } from "./stack/StackIF";
import { WPoint } from "model/WPoint";
import { CmdIF } from "commands/CmdIF";
import { MoveCmd } from "commands/MoveCmd";
import { WaitCmd } from "commands/WaitCmd";
import { MoveBumpCmd } from "commands/MoveBumpCmd";
import { StackScreenIF } from "./stack/StackScreenIF";
import { LogScreen } from "./LogScreen";
import { DoorCmd } from "commands/DoorCmd";
import { CmdDirScreen } from "./CmdDirScreen";
import { PickUpCmd } from "commands/PickUpCmd";
import { InventoryScreen } from "./InventoryScreen";
import { WornScreen } from "./WornScreen";
import { DigCmd } from "commands/DigCmd";

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
        var screen: StackScreenIF | undefined = undefined;
        let shift = e?.shiftKey;

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
            case 'q':
                screen = new LogScreen(this.game, this.maker);
                break;
            case 'i':
                screen = new InventoryScreen(this.game, this.maker);
                break;
            case 'w':
                screen = new WornScreen(this.game, this.maker);
                break;
            case '.':
                return this.waitCmd();
            case 'c':
                screen = this.doorCmd();
                break;
            case 'g':
                return new PickUpCmd(this.game);
        }
        if (screen) {
            screenStack.push(screen);
            return null;
        }
        if (!dir.empty()) {
            if (shift) {
                return this.digCmd(dir);
            } else {
                return this.moveBmpCmd(dir);
            }
        }
        return null;
    }

    doorCmd(): StackScreenIF {
        let cmd = new DoorCmd(this.player, this.game);
        return new CmdDirScreen(cmd, this.game, this.maker);
    }
    moveCmd(dir: WPoint): CmdIF {
        return new MoveCmd(dir, this.player, this.game);
    }

    moveBmpCmd(dir: WPoint): CmdIF {
        return new MoveBumpCmd(dir, this.player, this.game);
    }

    digCmd(dir: WPoint): CmdIF {
        return new DigCmd(dir, this.player, this.game);
    }

    waitCmd(): CmdIF {
        return new WaitCmd(this.player, this.game);
    }
}
