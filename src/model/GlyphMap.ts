import { Glyph } from "./Glyph";
import { GlyphInfo } from "./GlyphInfo";

export class GlyphMap {
    static glyphs: Array<GlyphInfo> = [];

    static bad: GlyphInfo = new GlyphInfo(Glyph.Bad, '?');

    static info(glyph: Glyph): GlyphInfo {
        if (glyph in GlyphMap.glyphs) {
            return this.glyphs[glyph];
        } else {
            return this.bad;
        }
    }

    static ensureInit:number = GlyphMap.initGlyphs();
    static initGlyphs(): number {
        var add = GlyphMap.add;
        add('§', Glyph.Bad);
        add('%', Glyph.Rock);
        add('#', Glyph.Wall);
        add('.', Glyph.Floor);
        add('?', Glyph.Unknown);
        add('@', Glyph.Player);
        add('a', Glyph.Ant);
        add('b', Glyph.Bat);
        add('c', Glyph.Cat);
        add('s', Glyph.Sheep);
        return GlyphMap.glyphs.length;
    }

    static add(c:string, g:Glyph) {
        let inf:GlyphInfo = new GlyphInfo(g, c);
        GlyphMap.warn(g);
        GlyphMap.glyphs[g] = inf;
    }

    static warn(g: Glyph) {
        if (GlyphMap.glyphs.length == g) {
            return;
        }
        console.log(g, ' differs from ', GlyphMap.glyphs.length);
    }

}
