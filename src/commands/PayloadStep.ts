import { WPoint } from "model/WPoint";
import { TimedStep } from "./TimedStep";
import { Mob } from "model/Mob";
import { CmdIF } from "./CmdIF";
import { GameIF } from "model/GameIF";
import { StepIF } from "./StepIF";
import { DMapIF } from "model/DMapIF";

export class PayloadStep extends TimedStep {
    target: Mob | null = null;
    pos: WPoint | null = null;
    setTarget(target: Mob): void {
        this.target = target;
    }
    setPosition(pos: WPoint): void {
        this.pos = pos;
    }
    constructor(
        public actor: Mob,
        public game: GameIF,
        public payload: CmdIF
    ) {
        super();
    }

    executeStep(): StepIF | null {
        let target = this.target;
        if (!target) {
            target = this.targetFromPos();
        }
        if (target) {
            this.payload.setTarget(target);
            this.payload.raw();
        }
        return null;
    }
    targetFromPos(): Mob | null {
        if (this.pos) {
            let map = <DMapIF>this.game.currentMap();
            let cell = map.cell(this.pos);
            if (cell.mob) {
                return cell.mob;
            }
        }
        return null;
    }
}
