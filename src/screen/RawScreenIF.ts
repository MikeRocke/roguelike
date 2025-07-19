import { TermIF } from "term/TermIF";

export interface RawScreenIF {
    draw(term: TermIF): void;
    onKey(e: JQuery.KeyDownEvent): void;
    name: string;
}
