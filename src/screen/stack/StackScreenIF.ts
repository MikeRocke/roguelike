import { TermIF } from "term/TermIF";
import { StackIF } from "./StackIF";

export interface StackScreenIF {
    name: string;
    draw(term: TermIF): void;
    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void;
    onTime(stack: StackIF): boolean;
}
