import { Mob } from "model/Mob";
import { MobAi_ant } from "./MobAi_ant";
import { MobAi_cat } from "./MobAi_cat";
import { MobAiIF } from "./MobAiIF";
import { GameIF } from "model/GameIF";
import { Glyph } from "model/Glyph";
import { MoodAi } from "./MoodAi";

export class AiSwitcher implements MobAiIF {
    catAi: MobAiIF = new MobAi_cat();
    antAi: MobAiIF = new MobAi_ant();
    batAi: MobAiIF = MoodAi.stockMood(2);

    turn(me: Mob, enemy: Mob, game: GameIF): boolean {
        var ai:MobAiIF;
        switch(me.glyph) {
                case Glyph.Ant: ai = this.antAi; break;
                case Glyph.Cat: ai = this.catAi; break;
                case Glyph.Bat: ai = this.batAi; break;
                default: ai=this.catAi; break;
        }

        return ai.turn(me, enemy, game);
    }
}
