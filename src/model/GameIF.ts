import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "./DMapIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";
import { MsgLog } from "./MsgLog";

export interface GameIF {
    rnd: Rnd;
    player: Mob;
    ai: MobAiIF|null;
    log: MsgLog;
    currentMap(): DMapIF|null;
    message(s:string):void;
}
