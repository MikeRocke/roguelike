import { RawScreenIF } from "screen/RawScreenIF";
import { StackIF } from "./StackIF";
import { StackScreenIF } from "./StackScreenIF";
import { TermIF } from "term/TermIF";
import { EventManager } from "screen/EventManager";

export class ScreenStack implements StackIF, RawScreenIF {
    name: string = "stack";
    stack: StackScreenIF[] = [];

    draw(term: TermIF): void {
        let screen = this.current();
        if (screen) {
            screen.draw(term);
        }
    }
    onKey(e: JQuery.KeyDownEvent): void {
        let screen = this.current();
        if (screen) {
            screen.onKey(e, this);
        }
    }
    pop(): void {
        this.stack.pop();
    }
    push(screen: StackScreenIF): void {
        this.stack.push(screen);
    }
    current(): StackScreenIF {
        return this.stack[this.stack.length - 1];
    }

    static run_StackScreen(stackScreen: StackScreenIF) {
        let stack = new ScreenStack();
        stack.push(stackScreen);
        EventManager.runRawScreen(stack);
    }
    onTime(): boolean {
        let change = false;
        let screen = this.current();
        if (screen) {
            change = screen.onTime(this);
        }
        return change;
    }
}
