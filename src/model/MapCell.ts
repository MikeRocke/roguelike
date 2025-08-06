import { Glyph } from "./Glyph";
import { Mob } from "./Mob";
import { Object } from "./Object";

export class MapCell {
    mob: Mob | undefined;
    lit: boolean | undefined;
    object: Object | undefined;
    constructor(public env: Glyph) {}
    glyph(): Glyph {
        if (this.object) {
            return this.object.glyph;
        } else {
            return this.env;
        }
    }

    opaque(): boolean {
        return this.env == Glyph.Wall || this.env == Glyph.Rock || this.env == Glyph.DoorsClosed;
    }
    blocked(): boolean {
        return (!!this.mob || this.opaque());
    }
    hasObject(): boolean {
        return this.object != undefined;
    }

}
