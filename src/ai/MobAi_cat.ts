import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { MoveBumpCmd } from "commands/MoveBumpCmd";

export class MobAi_cat implements MobAiIF {
    turn(me: Mob, enemy: Mob, game: GameIF): boolean {
        let r = game.rnd;
        if (r.oneIn(3)) {
            return false;
        }

        let dir = me.pos.dir(enemy.pos);
        let cmd = new MoveBumpCmd(dir, me, game);
        return cmd.npcTurn();
    }

}
