import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { WPoint } from "model/WPoint";

export interface CmdIF {
    exec(): boolean;
    turn(): boolean;
    raw(): boolean;
    setDir(dir: WPoint):CmdIF;
    npcTurn(): boolean;
    me: Mob;
    game: GameIF;
}
