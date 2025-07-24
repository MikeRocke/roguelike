import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { MoveCmd } from "commands/MoveCmd";

export class MobAi_sheep implements MobAiIF {
    turn(me: Mob, enemy: Mob, game: GameIF): boolean {
        let dir = me.pos.dir(enemy.pos);
        let cmd = new MoveCmd(dir, me, game);
        return cmd.npcTurn();
    }

}
