import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "./DMapIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";
import { MsgLog } from "./MsgLog";
import { Dungeon } from "./Dungeon";
import { BuildIF } from "build/BuildIF";
import { AutoHeal } from "commands/AutoHeal";

export interface GameIF {
    rnd: Rnd;
    player: Mob;
    ai: MobAiIF|null;
    log: MsgLog;
    dungeon: Dungeon;
    build: BuildIF;
    autoHeal: AutoHeal;
    currentMap(): DMapIF|null;
    message(s:string):void;
    flash(s:string):void;
}
