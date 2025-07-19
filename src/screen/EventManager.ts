import { ResizingTerm } from "term/ResizingTerm";
import { RawScreenIF } from "./RawScreenIF";

export class EventManager {
    constructor(public term: ResizingTerm, public screen: RawScreenIF) {
        $('#body1').on('keydown', this.onKey.bind(this));
        $(window).on('resize', this.onResize.bind(this));
        this.onResize();
    }

    onResize() {
        this.term.onResize();
        this.screen.draw(this.term);
    }

    onKey(e: JQuery.KeyDownEvent) {
        this.screen.onKey(e);
        this.screen.draw(this.term);
    }

    static runRawScreen(rawScreen: RawScreenIF) {
        return new EventManager(ResizingTerm.StockTerm(), rawScreen);
    }
}
