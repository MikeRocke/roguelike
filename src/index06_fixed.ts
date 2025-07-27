import { GameIF } from "model/GameIF";
import { DummyScreen } from "screen/DummyScreen";
import { OverScreen } from "screen/OverScreen";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { ScreenStack } from "screen/stack/ScreenStack";
import { StackScreenIF } from "screen/stack/StackScreenIF";

export class ScreenMaker0_Fixed implements ScreenMakerIF {
    more(game: GameIF | null): StackScreenIF {
        return new DummyScreen(this);
    }
    newGame(): StackScreenIF {
        return new DummyScreen(this);
    }
    gameOver(): StackScreenIF {
        return new OverScreen(this);
    }

    static runGoFirst(m: ScreenMakerIF) {
        ScreenStack.run_StackScreen(m.gameOver());
    }
    static StockMaker(): ScreenMakerIF {
        return new ScreenMaker0_Fixed();
    }
    static GOfirst() {
        this.runGoFirst(this.StockMaker());
    }
}

ScreenMaker0_Fixed.GOfirst()
