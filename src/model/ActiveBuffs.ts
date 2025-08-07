import { Buff } from "./Buff";
import { BuffIF } from "./BuffIF";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";

export class ActiveBuffs {
    _map: Map<Buff, BuffIF> = new Map();
    add(b: BuffIF, game: GameIF, mob: Mob) {
        this._map.set(b.buff, b);
    }

    delete(b: BuffIF, game: GameIF, mob: Mob) {
        this._map.delete(b.buff);
        if (mob.isPlayer) {
            game.message(`${Buff[b.buff]} wears off`);
        }
    }

    is(buff: Buff): boolean {
        return this._map.has(buff);
    }

    get(buff: Buff): BuffIF|undefined {
        return this._map.get(buff);
    }

    cleanse(buff: Buff, game: GameIF, mob: Mob) {
        let b = mob.buffs.get(buff);
        if (b) {
            this.delete(b, game, mob);
        }
    }
    ticks(mob: Mob, game: GameIF) {
        for(let b of this._map.values()) {
            --b.time;
            if (b.effect) {
                b.effect.tick(b.time);
            }
            if (b.time <= 0) {
                this.delete(b, game, mob);
            }
        }
    }
}
