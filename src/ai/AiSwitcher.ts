import { Mob } from "model/Mob";
import { MobAi_ant } from "./MobAi_ant";
import { MobAi_cat } from "./MobAi_cat";
import { MobAiIF } from "./MobAiIF";
import { GameIF } from "model/GameIF";
import { Glyph } from "model/Glyph";
import { MoodAi } from "./MoodAi";
import { StackIF } from "screen/stack/StackIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";

export class AiSwitcher implements MobAiIF {
    catAi: MobAiIF = new MobAi_cat();
    antAi: MobAiIF = new MobAi_ant();
    batAi: MobAiIF = MoodAi.stockMood(2, 8);

    constructor(public standardAi: MobAiIF) {}

    turn(me: Mob, enemy: Mob, game: GameIF, screenStack: StackIF, maker: ScreenMakerIF): boolean {
        var ai:MobAiIF;
        switch(me.glyph) {
                case Glyph.Ant: ai = this.antAi; break;
                case Glyph.Cat: ai = this.catAi; break;
                case Glyph.Bat: ai = this.batAi; break;
                default: ai=this.standardAi; break;
        }

        return ai.turn(me, enemy, game, screenStack, maker);
    }
}
