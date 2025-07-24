import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Rnd } from "model/Rnd";
import { BuildIF } from "./BuildIF";
import { Game } from "model/Game";
import { WPoint } from "model/WPoint";
import { TestMap } from "model/TestMap";
import { Mob } from "model/Mob";
import { Glyph } from "model/Glyph";

export class Builder implements BuildIF {
    makePlayer(): Mob {
        return new Mob(Glyph.Player, 20, 12);
    }
    makeGame(): GameIF {
        let rnd = new Rnd(42);
        let game = new Game(rnd);
        game.player = this.makePlayer();
        game.map = this.makeLevel(rnd, 0);
        this.enterFirstLevel(game);
        return game;
    }
    makeLevel(rnd: Rnd, level: number): DMapIF {
        return this.makeMap(rnd, level);
    }
    makeMap(rnd: Rnd, level: number): DMapIF {
        let wdim = new WPoint(WPoint.StockDims.x, WPoint.StockDims.y);
        return TestMap.test(wdim, rnd, level);
    }
    enterFirstLevel(game: GameIF) {
        let map = <DMapIF>game.currentMap();
        let newPoint = this.centerPos(map.dim);
        map.enterMap(game.player, newPoint);
    }
    centerPos(p: WPoint) {
        return new WPoint(Math.floor(p.x / 2), Math.floor(p.y / 2));
    }

}
