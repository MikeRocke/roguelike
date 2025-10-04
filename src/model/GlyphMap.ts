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

    static ensureInit: number = GlyphMap.initGlyphs(false);
    static initGlyphs(hasDragon: boolean): number {
        var add = GlyphMap.add;

        let bg = 'black';
        if (hasDragon) {
            bg = '#201540';
        }
        add('red', 'yellow', '§', Glyph.Bad);
        add('#222', '#282828', '%', Glyph.Rock);
        add('#444', '#555555', '#', Glyph.Wall);
        add(bg, '#123', '.', Glyph.Floor);
        add('#222', '#282828', '?', Glyph.Unknown);
        add(bg, 'orange', '@', Glyph.Player);
        add(bg, '#bf8', 's', Glyph.Sheep);
        add(bg, 'red', 'D', Glyph.Dragon);


        add(bg, '#bf8', 'a', Glyph.Ant);
        add(bg, '#bf8', 'b', Glyph.Bat);
        add(bg, '#bf8', 'c', Glyph.Cat);
        add(bg, '#bf8', 'd', Glyph.Dog);
        add(bg, '#bf8', 'e', Glyph.Eye);
        add(bg, '#bf8', 'f', Glyph.Frog);
        add(bg, '#bf8', 'g', Glyph.Golem);
        add(bg, '#bf8', 'h', Glyph.Harpy);
        add(bg, '#bf8', 'i', Glyph.Imp);
        add(bg, '#bf8', 'j', Glyph.Jackal);
        add(bg, '#bf8', 'k', Glyph.Kobold);
        add(bg, '#bf8', 'l', Glyph.Lich);
        add(bg, '#bf8', 'm', Glyph.Mold);
        add(bg, '#bf8', 'n', Glyph.Naga);
        add(bg, '#bf8', 'o', Glyph.Orc);
        add(bg, '#bf8', 'p', Glyph.Pirate);
        add(bg, '#bf8', 'q', Glyph.Quasit);
        add(bg, '#bf8', 'r', Glyph.Rat);
        add(bg, '#bf8', 's', Glyph.Snake);
        add(bg, '#bf8', 't', Glyph.Troll);
        add(bg, '#bf8', 'u', Glyph.UmberHulk);
        add(bg, '#bf8', 'v', Glyph.Vampire);
        add(bg, '#bf8', 'w', Glyph.Worm);
        add(bg, '#bf8', 'x', Glyph.Xorn);
        add(bg, '#bf8', 'y', Glyph.Yeti);
        add(bg, '#bf8', 'z', Glyph.Zombie);
        add(bg, 'orange', '>', Glyph.StairsDown);
        add(bg, 'orange', '<', Glyph.StairsUp);
        add(bg, 'orange', ',', Glyph.DoorsOpen);
        add(bg, 'orange', '+', Glyph.DoorsClosed);
        add(bg, 'blue', '-', Glyph.Dagger);
        add(bg, 'red', '(', Glyph.Shield);
        add(bg, 'purple', '(', Glyph.Cap);
        add(bg, 'lime', '(', Glyph.Gloves);
        add(bg, 'blue', '(', Glyph.Cape);
        add(bg, 'cyan', '(', Glyph.Leggings);
        add(bg, 'pink', '(', Glyph.Boots);
        add(bg, 'blue', '*', Glyph.Bullet);
        add(bg, 'orange', '%', Glyph.Fire1);
        add('yellow', 'orange', '%', Glyph.Fire2);
        add('orange', 'red', '%', Glyph.Fire3);
        add(bg, 'blue', '!', Glyph.Potion);
        add(bg, 'yellow', '?', Glyph.Scroll);
        add(bg, 'red', '-', Glyph.Wand);
        return GlyphMap.glyphs.length;
    }

    static add(bg: string, fg: string, c: string, g: Glyph) {
        let inf: GlyphInfo = new GlyphInfo(g, fg, bg, c);
        GlyphMap.warn(g);
        GlyphMap.glyphs[g] = inf;
    }

    static warn(g: Glyph) {
        if (GlyphMap.glyphs.length == g) {
            return;
        }
        console.log(g, ' differs from ', GlyphMap.glyphs.length);
    }

    static max: number = Object.keys(Glyph).length / 2;
    static indexToGlyph(index: number): Glyph {
        if (index < 0 || index >= this.max) {
            throw `index ${index} is invalid!`;
        }
        let glyph: Glyph = <Glyph>index;
        return glyph;
    }

}
