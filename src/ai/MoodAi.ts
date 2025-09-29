import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { Mood } from "model/Mood";
import { SleepAI } from "./SleepAI";
import { StackIF } from "screen/stack/StackIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { ShootAI } from "./ShootAI";

export class MoodAi implements MobAiIF {
    constructor(public asleep: MobAiIF, public wake: MobAiIF) {}

    turn(me: Mob, enemy: Mob, game: GameIF, screenStack: StackIF, maker: ScreenMakerIF): boolean {
        var ai: MobAiIF;
        switch (me.mood) {
            case Mood.Asleep: ai = this.asleep; break;
            case Mood.Wake: ai = this.wake; break;
        }
        return ai!.turn(me, enemy, game, screenStack, maker);
    }

    static stockMood(speed: number, spellRate: number) : MobAiIF {
        return new MoodAi(new SleepAI(), new ShootAI(speed, spellRate));
    }

}
