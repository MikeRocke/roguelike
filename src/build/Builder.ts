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
import { FreeSpace } from "./FreeSpace";
import { AiSwitcher } from "ai/AiSwitcher";
import { MapGenerator } from "./MapGenerator";
import { GlyphMap } from "model/GlyphMap";
import { MoodAi } from "ai/MoodAi";
import { ObjectTypes } from "./ObjectTypes";

export class Builder implements BuildIF {
    makeAI(): MobAiIF | null {
        return new AiSwitcher(MoodAi.stockMood(1, 8));
    }
    makePlayer(): Mob {
        let player = new Mob(Glyph.Player, 20, 12);
        player.maxHp = 50;
        player.hp = player.maxHp;
        return player;
    }
    makeGame(): GameIF {
        let rnd = new Rnd(42);
        let player = this.makePlayer();
        let game = new Game(rnd, player, this);
        this.enterFirstLevel(game);
        game.ai = this.makeAI();
        return game;
    }
    makeLevel(rnd: Rnd, level: number): DMapIF {
        let map = this.makeMap(rnd, level);
        //    this.makeSheepRing(map,rnd);
        this.addLevelStairs(map, level, rnd);
        this.addMobsToLevel(map, rnd);
        this.addItems(map, rnd);
        return map;
    }


    addItems(map: DMapIF, rnd: Rnd) {
        let dim = map.dim;
        let p = new WPoint();
        for (p.y = 1; p.y < dim.y - 1; ++p.y) {
            for (p.x = 1; p.x < dim.x - 1; ++p.x) {

                if (map.blocked(p)) {
                    continue;
                }
                if (rnd.oneIn(40)) {
                    ObjectTypes.addRandomObjectForLevel(p, map, rnd, map.level);
                }
            }
        }
    }

    addMobsToLevel(map: DMapIF, rnd: Rnd) {
        switch (map.level) {
            case 0: this.makeCatRing(map, rnd); break;
            default: this.makeMobs(map, rnd, 15); break;
        }
    }

    makeMobs(map: DMapIF, rnd: Rnd, rate: number) {
        let dim = map.dim;
        let p = new WPoint();
        for (p.y = 1; p.y < dim.y - 1; ++p.y) {
            for (p.x = 1; p.x < dim.x - 1; ++p.x) {
                if (!rnd.oneIn(rate)) {
                    continue;
                }
                if (map.blocked(p)) {
                    continue;
                }
                this.addMapLevel_Mob(p, map, rnd);
            }
        }
    }


    addMapLevel_Mob(p: WPoint, map: DMapIF, rnd: Rnd) {
        this.addLevelMob(p, map, rnd, map.level);
    }
    addLevelMob(p: WPoint, map: DMapIF, rnd: Rnd, baseLevel: number) {
        let level = rnd.spiceUpLevel(baseLevel);
        if (level < 1) {
            level = 1;
        }
        let glyph = this.level2Glyph(level);
        return this.addNPC(glyph, p.x, p.y, map, level)
    }
    level2Glyph(level: any) {
        let glyphIndex: number = level + Glyph.Ant - 1;
        let glyph = GlyphMap.indexToGlyph(glyphIndex);
        return glyph;
    }

    makeSheepRing(map: DMapIF, rnd: Rnd) {
        this.makeMobRing(Glyph.Sheep, map, rnd);
    }

    makeCatRing(map: DMapIF, rnd: Rnd) {
        this.makeMobRing(Glyph.Cat, map, rnd);
    }
    makeMobRing(g: Glyph, map: DMapIF, rnd: Rnd) {
        let dim = map.dim;
        let c = new WPoint(
            Math.floor(dim.x / 2),
            Math.floor(dim.y / 2)
        );

        let p = new WPoint();
        for (p.y = 1; p.y < dim.y - 1; ++p.y) {
            for (p.x = 1; p.x < dim.x - 1; ++p.x) {
                let d = c.dist(p);
                if (d < 7 || d > 9) {
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
        let mob = new Mob(g, x, y);
        this.setLevelStats(mob, level);
        map.addNPC(mob);
        return mob;
    }
    setLevelStats(mob: Mob, level: number) {
        mob.level = level;
        mob.maxHp = mob.level * 5;
        mob.hp = mob.maxHp;
    }


    makeMap(rnd: Rnd, level: number): DMapIF {
        let wdim = new WPoint(WPoint.StockDims.x, WPoint.StockDims.y);
        var map: DMapIF;
        switch (level) {
            default:
            case 1: map = MapGenerator.test(level); break;
            case 0: map = TestMap.test(wdim, rnd, level); break;
        }
        return map;
    }
    enterFirstLevel(game: GameIF) {
        let dungeon = game.dungeon;
        let map = dungeon.currentMap(game);
        let newPoint = this.centerPos(map.dim);
        game.dungeon.playerSwitchLevel(dungeon.level, newPoint, game);
    }
    centerPos(p: WPoint) {
        return new WPoint(Math.floor(p.x / 2), Math.floor(p.y / 2));
    }

    addLevelStairs(map: DMapIF, level: number, rnd: Rnd) {
        (level == 0) ? this.addStairs0(map)
            : this.addStairs(map, rnd);
    }
    addStairs0(map: DMapIF) {
        let pos = this.centerPos(map.dim);
        let p = new WPoint(2, 0).addTo(pos);
        map.cell(p).env = Glyph.StairsDown;
    }

    addStairs(map: DMapIF, rnd: Rnd) {
        this.addStair(map, rnd, Glyph.StairsDown);
        this.addStair(map, rnd, Glyph.StairsUp);
    }
    addStair(map: DMapIF, rnd: Rnd, stair: Glyph) {
        let p = <WPoint>FreeSpace.findFree(map, rnd);
        map.cell(p).env = stair;
        return true;
    }


}
