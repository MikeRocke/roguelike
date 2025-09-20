import { WPoint } from "model/WPoint";
import { CmdBase } from "./CmdBase";
import { GameIF } from "model/GameIF";
import { StackIF } from "screen/stack/StackIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { CmdIF } from "./CmdIF";
import { Mob } from "model/Mob";
import { Glyph } from "model/Glyph";
import { StepIF } from "./StepIF";
import { DirStep } from "./DirStep";
import { StepScreen } from "screen/StepScreen";

export class PayloadCmd extends CmdBase {
    dir: WPoint = new WPoint();
    constructor(public me: Mob, public game: GameIF, public screenStack: StackIF,
        public maker: ScreenMakerIF, public payload: CmdIF) {
        super(me, game);
    }

    setDir(dir: WPoint): CmdIF {
        this.dir = dir;
        return this;
    }

    exec(): boolean {
        let game = this.game;
        let me = this.me;
        let sprite = Glyph.Bullet;
        let effect = null;
        let next = new PayloadStep(me, game, this.payload);
        let step: StepIF = new DirStep(effect, next, sprite, me.pos.copy(), game);
        step.setDir(this.dir);
        this.screenStack.push(new StepScreen(game, this.maker, step));
        return false;
    }
}
