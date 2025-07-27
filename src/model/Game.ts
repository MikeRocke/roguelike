import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "./DMapIF";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";
import { MsgLog } from "./MsgLog";

export class Game implements GameIF {
    map: DMapIF | null = null;
    player: Mob = <Mob><unknown> undefined;
    ai: MobAiIF | null = null;
    log: MsgLog = new MsgLog();

    constructor(public rnd: Rnd) {}
    currentMap(): DMapIF | null {
        return this.map;
    }
    message(s:string) {
        this.log.msg(s);
    }

}
