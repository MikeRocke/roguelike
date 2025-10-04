import { DMapIF } from "./DMapIF";
import { GameIF } from "./GameIF";
import { GlyphMap } from "./GlyphMap";
import { WPoint } from "./WPoint";

export class Dungeon {
    level: number = 0;
    dragonLevel: number = -1;
    maps: DMapIF[] = [];
    currentMap(game: GameIF): DMapIF {
        return this.getLevel(this.level, game);
    }
    getLevel(level: number, game: GameIF): DMapIF {
        if (!this.hasLevel(level)) {
            let map = game.build.makeDragonLevels(game.rnd, level, this.dragonLevel);
            this.add(map, level);
        }
        return this.maps[level];
    }
    add(map: any, level: number) {
        if (level >= this.maps.length) {
            this.extendMaps(level + 1);
        }
        this.maps[level] = map;
    }
    extendMaps(newSize: number) {
        this.maps.length = newSize;
    }
    hasLevel(level: number) {
        return level < this.maps.length && !!this.maps[level];
    }
    playerSwitchLevel(newLevel: number, newPoint: WPoint, game: GameIF) {
        let player = game.player;
        this.currentMap(game).removeMob(player);
        this.level = newLevel;
        this.currentMap(game).enterMap(player, newPoint);
        this.dragonStyle();
    }
    dragonStyle() {
        let hasDragon = (this.level == this.dragonLevel);
        GlyphMap.initGlyphs(hasDragon);
    }

}
