import { TermIF } from "term/TermIF";
import { DMapIF } from "./DMapIF";
import { WPoint } from "./WPoint";
import { MapCell } from "./MapCell";
import { Glyph } from "./Glyph";
import { TPoint } from "term/TPoint";
import { GlyphInfo } from "./GlyphInfo";
import { GlyphMap } from "./GlyphMap";

export class DrawMap {
    static drawMap(term: TermIF, map: DMapIF, viewpoint: WPoint) {
        let termDimension = term.dimension;
        let t = new TPoint();
        let w = new WPoint();
        for (t.y = 0, w.y = viewpoint.y; t.y < termDimension.y; ++t.y, ++w.y) {
            for (t.x = 0, w.x = viewpoint.x; t.x < termDimension.x; ++t.x, ++w.x) {
                let cell: MapCell;
                if (map.legal(w)) {
                    cell = map.cell(w);
                } else {
                    cell = this.outside;
                }
                let i:GlyphInfo = GlyphMap.info(cell.glyph());
                term.at(t.x, t.y, i.c, 'gray', 'lightgrey');
            }
        }
    }

    static outside: MapCell = new MapCell(Glyph.Unknown);
}
