import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { MobAi_cat } from "./MobAi_cat";
import { MobAi_ant } from "./MobAi_ant";
import { SleepAI } from "./SleepAI";
import { Mood } from "model/Mood";
import { StackIF } from "screen/stack/StackIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";

export class WakeAI implements MobAiIF {
    constructor(public speed: number) {}

    aiDir:MobAiIF = new MobAi_cat();
    aiRnd:MobAiIF = new MobAi_ant();

    turn(me: Mob, enemy: Mob, game: GameIF, screenStack: StackIF, maker: ScreenMakerIF): boolean {
        let r = game.rnd;
        for (var i = 0; i < this.speed; ++i) {
            var ai = r.oneIn(2) ? this.aiDir : this.aiRnd;
            ai.turn(me, enemy, game, screenStack, maker);
        }

        let far = !SleepAI.isNear(me, enemy);
        if (far) {
            me.mood = r.oneIn(3) ? Mood.Asleep : Mood.Wake;
        }
        return true;
    }
}
