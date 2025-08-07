import { Buff } from "./Buff";
import { TickIF } from "./TickIF";

export interface BuffIF {
    buff: Buff;
    time: number;
    effect: TickIF|undefined;
}
