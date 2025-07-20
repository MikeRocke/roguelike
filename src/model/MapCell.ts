import { Glyph } from "./Glyph";

export class MapCell {
    constructor(public env: Glyph) {}
    glyph(): Glyph {
        return this.env;
    }
}
