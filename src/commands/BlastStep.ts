import { Mob } from "model/Mob";
import { TimedStep } from "./TimedStep";
import { WPoint } from "model/WPoint";
import { GameIF } from "model/GameIF";
import { StepIF } from "./StepIF";
import { DMapIF } from "model/DMapIF";
import { HealthAdj } from "./HealthAdj";

export class BlastStep extends TimedStep {
    target: Mob | null = null;
    pos: WPoint | null = null;
    setTarget(target: Mob): void {
        this.target = target;
    }
    setPosition(pos: WPoint): void {
        this.pos = pos;
    }
    school(): School {
        return this._school;
    }
    constructor(
        public amount: number,
        public _school: School,
        public actor: Mob,
        public game: GameIF
    ) {
        super();
    }
    executeStep(): StepIF | null {
        let target = this.target;
        if (!target) {
            target = this.targetFromPos();
        }
        if (target) {
            let school = School[this._school];
            this.game.message(
                `${target.name} is hurt ${this.amount} of ${school} damage`);
            HealthAdj.dmg(target, this.amount, this.game, this.actor);
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

export enum School {
    Fire,
    Frost,
    Magic,
    Earth,
    Lightning
}
