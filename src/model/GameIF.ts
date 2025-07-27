import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "./DMapIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";
import { MsgLog } from "./MsgLog";
import { Dungeon } from "./Dungeon";
import { BuildIF } from "build/BuildIF";

export interface GameIF {
    rnd: Rnd;
    player: Mob;
    ai: MobAiIF|null;
    log: MsgLog;
    dungeon: Dungeon;
    build: BuildIF;
    currentMap(): DMapIF|null;
    message(s:string):void;
}
