import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Rnd } from "model/Rnd";

export interface BuildIF {
    makeGame(): GameIF;
    makeLevel(rnd: Rnd, level: number): DMapIF;
    makeMap(rnd: Rnd, level: number): DMapIF;
}
