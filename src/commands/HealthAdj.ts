import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { AutoHeal } from "./AutoHeal";
import { WPoint } from "model/WPoint";
import { Glyph } from "model/Glyph";
import { ObjectTypes } from "build/ObjectTypes";

export class HealthAdj {
    public static adjust(m: Mob, amount: number, game: GameIF, actor: Mob | null) {
        if (amount == 0) {
            return;
        }
        if (amount > 0) {
            return this.heal(m, amount);
        }
        if (amount < 0) {
            return this.dmg(m, -amount, game, actor);
        }
    }
    static dmg(m: Mob, amount: number, game: GameIF, actor: Mob | null) {
        AutoHeal.combatResets(m, actor, game);
        console.log('dmg', amount, m.hp);
        m.hp -= amount;
        console.log('d_to', amount, m.hp);
        if (m.hp <= 0) {
            let involvesPlayer = m.isPlayer || (actor != null && actor.isPlayer);
            this.mobDies(m, game, involvesPlayer);
        }

    }
    static mobDies(m: Mob, game: GameIF, involvesPlayer: boolean) {
        if (involvesPlayer) {
            let s = `${m.name} dies in a fit of agony`;
            game.message(s);
        }
        let map = <DMapIF>game.currentMap();
        map.removeMob(m);
        this.mightDropLoop(m, map, game);
    }
    static mightDropLoop(mob: Mob, map: DMapIF, game: GameIF) {
        if (game.rnd.oneIn(2)) {
            return;
        } else {
            this.dropLoot(mob.pos, map, game, map.level);
        }
    }
    static dropLoot(pos: WPoint, map: DMapIF, game: GameIF, level: number) {
        let lootCel = map.cell(pos);
        let canDrop = (lootCel.env == Glyph.Floor);
        var s:string;
        if (canDrop) {
            let rnd = game.rnd;
            let objectLevel = level+1;
            let obj = ObjectTypes.addRandomObjectForLevel(pos, map, rnd, objectLevel);
            s = `Something rolls onto the floor ${obj.description()}`;
        } else {
            s = `Something falls into an inaccessible place`;
        }
        game.message(s);
    }
    static heal(m: Mob, amount: number) {
        console.log(`heal .. %{m.hp} += ${amount}`);
        let limit = m.maxHp - m.hp;
        if (amount > limit) {
            amount = limit;
        }
        m.hp += amount;
        console.log('h_to', m.hp);
    }
}
