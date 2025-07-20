import { DMapIF } from "model/DMapIF";
import { StackScreenIF } from "./stack/StackScreenIF";
import { StackIF } from "./stack/StackIF";
import { TermIF } from "term/TermIF";
import { DrawMap } from "model/DrawMap";
import { WPoint } from "model/WPoint";
import { ScreenStack } from "./stack/ScreenStack";

export class MapScreen implements StackScreenIF {
    name = 'map';
    constructor(public map: DMapIF) {

    }
    draw(term: TermIF): void {
        DrawMap.drawMap(term, this.map, new WPoint());
    }

    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {}

    static runMapScreen(map: DMapIF) {
        ScreenStack.run_StackScreen(new MapScreen(map));
    }
}
