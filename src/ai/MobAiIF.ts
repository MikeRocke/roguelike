import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { StackIF } from "screen/stack/StackIF";

export interface MobAiIF {
    turn(me: Mob, enemy: Mob, game: GameIF, screenStack: StackIF, maker: ScreenMakerIF): boolean;
}
