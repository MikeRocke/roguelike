import { Glyph } from "./Glyph";
import { Mob } from "./Mob";

export class MapCell {
    mob: Mob | undefined;
    constructor(public env: Glyph) {}
    glyph(): Glyph {
        if (this.mob) {
            return this.mob.glyph;
        } else {
            return this.env;
        }
    }
    blocked(): boolean {
        return (!!this.mob || this.env == Glyph.Wall);
    }
}
