import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { CmdIF } from "./CmdIF";
import { WPoint } from "model/WPoint";

export abstract class CmdBase implements CmdIF {
    exec(): boolean {
        throw new Error("Method not implemented.");
    }
    turn(): boolean {
        return this.exec();
    }
    raw(): boolean {
        return this.exec();
    }
    npcTurn(): boolean {
        return this.exec();
    }
    constructor(public me: Mob, public game: GameIF) {}
    setDir(dir: WPoint): CmdIF {
        throw new Error("Method not implemented.");
    }
}
