import { DMapIF } from "./DMapIF";
import { GameIF } from "./GameIF";
import { WPoint } from "./WPoint";

export class Dungeon {
    level: number = 0;
    maps: DMapIF[] = [];
    currentMap(game: GameIF): DMapIF {
        return this.getLevel(this.level, game);
    }
    getLevel(level: number, game: GameIF): DMapIF {
        if (!this.hasLevel(level)) {
            let map = game.build.makeLevel(game.rnd, level);
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
    }

}
