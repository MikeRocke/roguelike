import { TermIF } from "term/TermIF";
import { StackIF } from "./StackIF";

export interface StackScreenIF {
    draw(term: TermIF): void;
    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void;
    name: string;
}
