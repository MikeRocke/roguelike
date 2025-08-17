import { DMapIF } from "model/DMapIF";
import { TimedStep } from "./TimedStep";
import { WPoint } from "model/WPoint";
import { StepIF } from "./StepIF";
import { Glyph } from "model/Glyph";
import { GameIF } from "model/GameIF";

export class DirStep extends TimedStep {
    map: DMapIF;
    dir: WPoint | null = null;
    setDir(dir: WPoint): void {
        this.dir = dir;
    }
    constructor(
        public effect: StepIF | null,
        public next: StepIF | null,
        public sprite: Glyph,
        public pos: WPoint,
        public game: GameIF
    ) {
        super();
        this.map = <DMapIF>game.currentMap();
    }
    executeStep(): StepIF | null {
        let p = this.pos;
        let map = this.map;
        map.cell(p).sprite = undefined;
        if (this.dir == null) {
            throw `dir is null`;
        }
        p.addTo(this.dir);

        if (!map.legal(p)) {
            return null;
        }
        let cell = map.cell(p);
        let done = cell.blocked();
        if (done) {
            if (this.next) {
                this.next.setPosition(p);
            }
        } else {
            cell.sprite = this.sprite;
            if (this.effect) {
                this.effect.setPosition(p);
                this.effect.executeStep();
            }
        }
        return done ? this.next : this;
    }
}
