import { GameIF } from "model/GameIF";
import { DummyScreen } from "./DummyScreen";
import { OverScreen } from "./OverScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { ScreenStack } from "./stack/ScreenStack";
import { StackScreenIF } from "./stack/StackScreenIF";

export interface BuildIF1 {makeGame():GameIF}

export class ScreenMaker implements ScreenMakerIF {
    game: GameIF | null = null;

    constructor(
        public build: BuildIF1,
        public gameScreen: (game:GameIF, sm:ScreenMakerIF)=>StackScreenIF,
        public overScreen: (game:GameIF, sm:ScreenMakerIF)=>StackScreenIF,
        public init: (sm:ScreenMakerIF)=>StackScreenIF
    ) {}

    newGame(): StackScreenIF {
        this.game = this.build.makeGame();
        return this.gameScreen(<GameIF>this.game, this);
    }
    gameOver(): StackScreenIF {
        return this.overScreen(<GameIF>this.game, this);
    }

    static runDynamic(dyn: ScreenMaker) {
        ScreenStack.run_StackScreen(dyn.init(dyn));
    }

    static runBuilt_GoFirst(build: BuildIF1) {
        let dyn: ScreenMaker = new ScreenMaker(
            build,
            (g: GameIF, sm: ScreenMakerIF) => new DummyScreen(sm),
            (g: GameIF, sm: ScreenMakerIF) => new OverScreen(sm),
            (sm: ScreenMakerIF) => sm.gameOver()
        );
        this.runDynamic(dyn);
    }

}
