import { DMapIF } from "./DMapIF";
import { GameIF } from "./GameIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";

export class Game implements GameIF {
    map: DMapIF | null = null;
    player: Mob = <Mob><unknown> undefined;

    constructor(public rnd: Rnd) {}
    currentMap(): DMapIF | null {
        return this.map;
    }

}
