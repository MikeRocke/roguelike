import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { Mood } from "model/Mood";
import { SleepAI } from "./SleepAI";
import { SpellAI } from "./SpellAI";

export class MoodAi implements MobAiIF {
    constructor(public asleep: MobAiIF, public wake: MobAiIF) {}

    turn(me: Mob, enemy: Mob, game: GameIF): boolean {
        var ai: MobAiIF;
        switch (me.mood) {
            case Mood.Asleep: ai = this.asleep; break;
            case Mood.Wake: ai = this.wake; break;
        }
        return ai!.turn(me, enemy, game);
    }

    static stockMood(speed: number, spellRate: number) : MobAiIF {
        return new MoodAi(new SleepAI(), new SpellAI(speed, spellRate));
    }

}
