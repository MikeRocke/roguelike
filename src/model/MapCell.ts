import { Glyph } from "./Glyph";
import { Mob } from "./Mob";

export class MapCell {
    mob: Mob | undefined;
    lit: boolean | undefined;
    constructor(public env: Glyph) {}
    glyph(): Glyph {
        return this.env;
    }

    opaque(): boolean {
        return this.env == Glyph.Wall || this.env == Glyph.Rock || this.env == Glyph.DoorsClosed;
    }
    blocked(): boolean {
        return (!!this.mob || this.opaque());
    }
}
