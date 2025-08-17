import { GameIF } from "model/GameIF";
import { BaseScreen } from "./BaseScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { StepIF } from "commands/StepIF";
import { StackIF } from "./stack/StackIF";
import { TermIF } from "term/TermIF";
import { ScreenStack } from "./stack/ScreenStack";

export class StepScreen extends BaseScreen {
    name: string = 'step';
    constructor(game: GameIF, maker: ScreenMakerIF, public step: StepIF | null) {
        super(game, maker);
    }
    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
        //do nothing
    }
    draw(term: TermIF): void {
        super.draw(term);
    }
    onTime(stack: ScreenStack) : boolean {
        if (this.step == null) {
            throw `step is null`;
        }
        this.step = this.step.executeStep();
        if (this.step) {
            return true;
        }
        this.popAndNpcLoop(stack);
        return true;
    }
}
