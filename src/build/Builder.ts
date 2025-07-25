import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Rnd } from "model/Rnd";
import { BuildIF } from "./BuildIF";
import { Game } from "model/Game";
import { WPoint } from "model/WPoint";
import { TestMap } from "model/TestMap";
import { Mob } from "model/Mob";
import { Glyph } from "model/Glyph";
import { MobAiIF } from "ai/MobAiIF";
import { MobAi_cat } from "ai/MobAi_cat";

export class Builder implements BuildIF {
    makeAI(): MobAiIF | null {
        return new MobAi_cat();
    }
    makePlayer(): Mob {
        return new Mob(Glyph.Player, 20, 12);
    }
    makeGame(): GameIF {
        let rnd = new Rnd(42);
        let game = new Game(rnd);
        game.player = this.makePlayer();
        game.map = this.makeLevel(rnd, 0);
        this.enterFirstLevel(game);
        game.ai = this.makeAI();
        return game;
    }
    makeLevel(rnd: Rnd, level: number): DMapIF {
        let map = this.makeMap(rnd, level);
    //    this.makeSheepRing(map,rnd);
        this.makeCatRing(map,rnd);
        return map;
    }
    makeSheepRing(map:DMapIF, rnd: Rnd) {
        this.makeMobRing(Glyph.Sheep, map, rnd);
    }

    makeCatRing(map:DMapIF, rnd: Rnd) {
        this.makeMobRing(Glyph.Cat, map, rnd);
    }
    makeMobRing(g: Glyph, map: DMapIF, rnd: Rnd) {
        let dim = map.dim;
        let c = new WPoint(
            Math.floor(dim.x/2),
            Math.floor(dim.y/2)
        );

        let p = new WPoint();
        for (p.y = 1; p.y < dim.y-1; ++p.y) {
            for (p.x = 1; p.x < dim.x-1; ++p.x) {
               let d = c.dist(p);
                if (d<7 || d > 9) {
                    continue;
                }
                if (map.blocked(p)) {
                    continue;
                }
                this.addNPC(g, p.x, p.y, map, 0);
            }
        }
    }
    addNPC(g: Glyph, x: number, y: number, map: DMapIF, level: number) {
        let mob = new Mob(g,x,y);
        map.addNPC(mob);
        return mob;
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
