import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { MobAiIF } from "./MobAiIF";
import { MoveBumpCmd } from "commands/MoveBumpCmd";

export class MobAi_ant implements MobAiIF {
    turn(me: Mob, enemy: Mob, game: GameIF): boolean {
        let random = game.rnd;
        let dir = random.rndDir();
        return new MoveBumpCmd(dir, me, game).npcTurn();
    }

}
