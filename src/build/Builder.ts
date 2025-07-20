import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Rnd } from "model/Rnd";
import { BuildIF } from "./BuildIF";
import { Game } from "model/Game";
import { WPoint } from "model/WPoint";
import { TestMap } from "model/TestMap";

export class Builder implements BuildIF {
    makeGame(): GameIF {
        let rnd = new Rnd(42);
        let game = new Game(rnd);
        game.map = this.makeLevel(rnd, 0);
        return game;
    }
    makeLevel(rnd: Rnd, level: number): DMapIF {
        return this.makeMap(rnd, level);
    }
    makeMap(rnd: Rnd, level: number): DMapIF {
        let wdim = WPoint.StockDims;
        return TestMap.test(wdim, rnd, level);
    }

}
