import { GameIF } from "model/GameIF";
import { GameScreen } from "./GameScreen";
import { OverScreen } from "./OverScreen";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { StackScreenIF } from "./stack/StackScreenIF";
import { BuildIF1 } from "./ScreenMaker";
import { ScreenStack } from "./stack/ScreenStack";

export class ScreenMakerFixed implements ScreenMakerIF {
    game: GameIF | null = null;

    constructor(
        public build: BuildIF1
    ) {}

    newGame(): StackScreenIF {
        this.game = this.build.makeGame();

        return new GameScreen(<GameIF> this.game, this);
    }
    gameOver(): StackScreenIF {
        return new OverScreen(this);
    }

    static run_GFirst(m: ScreenMakerIF) {
        ScreenStack.run_StackScreen(m.newGame());
    }

    static StockMaker(build: BuildIF1): ScreenMakerIF {
        return new ScreenMakerFixed(build);
    }

    static GFirst(build: BuildIF1) {
        this.run_GFirst(this.StockMaker(build));
    }

}
