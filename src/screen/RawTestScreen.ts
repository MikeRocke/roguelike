import { TermIF } from "term/TermIF";
import { RawScreenIF } from "./RawScreenIF";
import { TestTerm } from "term/TestTerm";

export class RawTestScreen implements RawScreenIF {
    onTime(): boolean {
        return false;
    }

    name="test!";
    key:string="~";
    draw(term: TermIF): void {
        TestTerm.test2(term, this.key);
    }
    onKey(e: JQuery.KeyDownEvent): void {
        this.key=`?:${e.key}`;
    }
    
}
