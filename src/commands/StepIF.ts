import { Mob } from "model/Mob";
import { WPoint } from "model/WPoint";

export interface StepIF {
    executeStep(): StepIF|null;
    setPosition(pos: WPoint): void;
    setDir(dir: WPoint): void;
    setTarget(target: Mob): void;
    setTime(time: number): void;
}
