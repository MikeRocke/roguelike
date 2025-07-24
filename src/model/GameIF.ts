import { DMapIF } from "./DMapIF";
import { Mob } from "./Mob";
import { Rnd } from "./Rnd";

export interface GameIF {
    rnd: Rnd;
    player: Mob;
    currentMap(): DMapIF|null;
}
