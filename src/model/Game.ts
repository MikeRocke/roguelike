import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "./DMapIF";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";
import { MsgLog } from "./MsgLog";
import { Dungeon } from "./Dungeon";
import { BuildIF } from "build/BuildIF";
import { AutoHeal } from "commands/AutoHeal";
import { Bag } from "./Bag";
import { Worn } from "./Worn";

export class Game implements GameIF {
    ai: MobAiIF | null = null;
    log: MsgLog = new MsgLog();
    dungeon: Dungeon = new Dungeon();
    autoHeal: AutoHeal = new AutoHeal();
    bag: Bag = new Bag();
    worn: Worn = new Worn();

    constructor(public rnd: Rnd, public player: Mob, public build: BuildIF) {}
    currentMap(): DMapIF | null {
        return this.dungeon.currentMap(this);
    }
    message(s:string) {
        this.log.msg(s);
    }
    flash(s:string) {
        this.log.msg(s, true);
    }

}
