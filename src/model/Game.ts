import { DMapIF } from "./DMapIF";
import { GameIF } from "./GameIF";
import { Rnd } from "./Rnd";

export class Game implements GameIF {
    map: DMapIF | null = null;

    constructor(public rnd: Rnd) {}
    currentMap(): DMapIF | null {
        return this.map;
    }

}
