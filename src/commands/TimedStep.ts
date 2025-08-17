import { Mob } from "model/Mob";
import { WPoint } from "model/WPoint";
import { StepIF } from "./StepIF";

export class TimedStep implements StepIF {
    executeStep(): StepIF | null {
        throw new Error("Method not implemented.");
    }
    setPosition(pos: WPoint): void {
        throw new Error("Method not implemented.");
    }
    setDir(dir: WPoint): void {
        throw new Error("Method not implemented.");
    }
    setTarget(target: Mob): void {
        throw new Error("Method not implemented.");
    }
    setTime(time: number): void {
        throw new Error("Method not implemented.");
    }
    time: number = 0;
}
