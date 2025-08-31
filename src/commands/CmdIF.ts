import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { WPoint } from "model/WPoint";
import { CostIF } from "./CostIF";

export interface CmdIF {
    exec(): boolean;
    turn(): boolean;
    raw(): boolean;
    setDir(dir: WPoint):CmdIF;
    npcTurn(): boolean;
    me: Mob;
    game: GameIF;
    cost:CostIF|undefined;
    setCost(cost:CostIF|undefined):void;
}
