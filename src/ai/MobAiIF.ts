import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";

export interface MobAiIF {
    turn(me: Mob, enemy: Mob, game: GameIF): boolean;
}
