import { Glyph } from "./Glyph";
import { GlyphInfo } from "./GlyphInfo";

export class GlyphMap {
    static glyphs: Array<GlyphInfo> = [];

    static bad: GlyphInfo = new GlyphInfo(Glyph.Bad, 'red', 'yellow', '?');

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
        let bg = 'black';
        add('red','yellow','§', Glyph.Bad);
        add('#222','#282828','%', Glyph.Rock);
        add('#444','#555555','#', Glyph.Wall);
        add(bg, '#123','.', Glyph.Floor);
        add('#222', '#282828','?', Glyph.Unknown);
        add(bg, 'orange','@', Glyph.Player);
        add(bg, '#e2b','a', Glyph.Ant);
        add(bg, '#43a','b', Glyph.Bat);
        add(bg, '#6c4','c', Glyph.Cat);
        add(bg, '#294','s', Glyph.Sheep);
        return GlyphMap.glyphs.length;
    }

    static add(bg: string, fg: string, c:string, g:Glyph) {
        let inf:GlyphInfo = new GlyphInfo(g, fg, bg, c);
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
