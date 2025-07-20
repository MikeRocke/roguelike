import { DMapIF } from "./DMapIF";
import { Rnd } from "./Rnd";

export interface GameIF {
    rnd: Rnd;
    currentMap(): DMapIF|null;
}
