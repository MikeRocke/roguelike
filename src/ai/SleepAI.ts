import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { Mood } from "model/Mood";
import { DMapIF } from "model/DMapIF";
import { CanSee } from "commands/CanSee";

export class SleepAI implements MobAiIF {
    turn(me: Mob, enemy: Mob, game: GameIF): boolean {
        if (!SleepAI.isNear(me, enemy)) {
            return true;
        }
        let map = <DMapIF>game.currentMap();
        let canSee = CanSee.canSee2(me, enemy, map, true);
        if (!canSee) {
            return true;
        }

        me.mood = game.rnd.oneIn(3) ? Mood.Wake : Mood.Asleep;
        return true;
    }
    static isNear(me: Mob, enemy: Mob) {
        let dist = me.pos.dist(enemy.pos);
        return dist < 6;
    }

}
