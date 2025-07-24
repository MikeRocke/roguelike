import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";

export interface CmdIF {
    exec(): boolean;
    turn(): boolean;
    raw(): boolean;
    npcTurn(): boolean;
    me: Mob;
    game: GameIF;
}
