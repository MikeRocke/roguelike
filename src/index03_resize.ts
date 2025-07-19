import { ResizingTerm } from "term/ResizingTerm";
import { TestTerm } from "term/TestTerm";

let term = ResizingTerm.StockTerm();
function onResize() {
    term.onResize();
    TestTerm.test2(term, '-');
}
$(window).on('resize', onResize);
onResize();
