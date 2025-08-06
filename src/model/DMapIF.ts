import { MapCell } from "./MapCell";
import { Mob } from "./Mob";
import { Object } from "./Object";
import { TurnQueue } from "./TurnQueue";
import { WPoint } from "./WPoint";

export interface DMapIF {
    dim: WPoint;
    cell(p: WPoint): MapCell;
    legal(p: WPoint): boolean;
    level: number;
    turnQueue: TurnQueue;
    addNPC(mob: Mob): Mob;
    enterMap(player: Mob, newPoint: WPoint): void;
    moveMob(mob: Mob, p: WPoint): void;
    removeMob(mob: Mob): void;
    blocked(p: WPoint): boolean;
    addObject(obj: Object, p: WPoint): void;
}
