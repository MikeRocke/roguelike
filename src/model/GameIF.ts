import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "./DMapIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";

export interface GameIF {
    rnd: Rnd;
    player: Mob;
    ai: MobAiIF|null;
    currentMap(): DMapIF|null;
    message(s:string):void;
}
