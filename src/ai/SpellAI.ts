import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { MobAi_cat } from "./MobAi_cat";
import { MobAi_ant } from "./MobAi_ant";
import { SleepAI } from "./SleepAI";
import { Mood } from "model/Mood";
import { Rnd } from "model/Rnd";
import { Buff } from "model/Buff";
import { CanSee } from "commands/CanSee";
import { DMapIF } from "model/DMapIF";
import { BuffCmd } from "commands/BuffCmd";

export class SpellAI implements MobAiIF {
    constructor(public speed:number, public spellRate: number) {}
    aiDir:MobAiIF = new MobAi_cat();
    aiRnd:MobAiIF = new MobAi_ant();

    turn(me: Mob, enemy: Mob, game: GameIF): boolean {
        if (this.maybeCastSpell(me, enemy, game)) {
            return true;
        }
        let r = game.rnd;
        for (var i = 0; i < this.speed; ++i) {
            var ai = r.oneIn(2) ? this.aiDir : this.aiRnd;
            ai.turn(me, enemy, game);
        }
        let far = !SleepAI.isNear(me, enemy);
        if (far) {
            me.mood = r.oneIn(3) ? Mood.Asleep : Mood.Wake;
        }
        return true;
    }
    maybeCastSpell(me: Mob, enemy: Mob, game: GameIF):boolean {
        let map = <DMapIF> game.currentMap();
        if (!CanSee.canSee2(me, enemy, map, true)) {
            return false;
        }

        let r = game.rnd;
        if (!r.oneIn(this.spellRate)) {
            return false;
        }
        let buff = this.pickBuff(me, r);
        return this.cast(buff, me, enemy, game);
    }
    cast(buff: Buff, me: Mob, enemy: Mob, game: GameIF): boolean {
        let spell = new BuffCmd(buff, enemy, game, me);
        return spell.npcTurn();
    }
    pickBuff(me: Mob, r: Rnd): Buff {
        let range: number = (Buff.Levitate) + 1;
        let buffIndex:number = me.level % range;
        let buff:Buff = Buff.Confuse + buffIndex;
        return buff;
    }

}
