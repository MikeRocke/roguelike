import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { GameIF } from "model/GameIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { Mob } from "model/Mob";
import { CmdIF } from "./CmdIF";
import { Glyph } from "model/Glyph";
import { StackIF } from "screen/stack/StackIF";
import { StepIF } from "./StepIF";
import { BlastStep, School } from "./BlastStep";
import { DirStep } from "./DirStep";
import { StepScreen } from "screen/StepScreen";

export class BulletCmd extends CmdBase {
    dir: WPoint = new WPoint();

    constructor(public me: Mob, public game: GameIF, public screenStack: StackIF, public maker: ScreenMakerIF) {
        super(me, game);
    }

    setDir(dir: WPoint): CmdIF {
        this.dir = dir;
        return this;
    }

    exec(): boolean {
        let game = this.game;
        let me = this.me;
        let damage = 4;
        let school = School.Magic;
        let sprite = Glyph.Bullet;
        let effect = null;
        let next = new BlastStep(damage, school, me, game);
        let step: StepIF = new DirStep(effect, next, sprite, me.pos.copy(), game);
        step.setDir(this.dir);
        this.screenStack.push(new StepScreen(game, this.maker, step));
        return false;
    }
}
