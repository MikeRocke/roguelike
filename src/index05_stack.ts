import { ScreenStack } from "screen/stack/ScreenStack";
import { StackIF } from "screen/stack/StackIF";
import { StackScreenIF } from "screen/stack/StackScreenIF";
import { TermIF } from "term/TermIF";
import { TestTerm } from "term/TestTerm";


class StackTestScreen implements StackScreenIF {
    draw(term: TermIF): void {
        TestTerm.test2(term, '~');
    }
    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
    }
    name = "test2";

}


ScreenStack.run_StackScreen(new StackTestScreen());
