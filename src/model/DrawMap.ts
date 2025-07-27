import { TermIF } from "term/TermIF";
import { DMapIF } from "./DMapIF";
import { WPoint } from "./WPoint";
import { MapCell } from "./MapCell";
import { Glyph } from "./Glyph";
import { TPoint } from "term/TPoint";
import { GlyphInfo } from "./GlyphInfo";
import { GlyphMap } from "./GlyphMap";
import { GameIF } from "./GameIF";

export class DrawMap {
    static drawMapPlayer(term:TermIF, map: DMapIF, playerPosition:WPoint, game: GameIF) {
        if (!playerPosition) {
            playerPosition = new WPoint();
        }
        let vp:WPoint = new WPoint(
            -Math.floor(term.dimension.x*0.5)+playerPosition.x,
            -Math.floor(term.dimension.y*0.5)+playerPosition.y
        );
        this.drawMap(term, map, vp);
    }

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
                term.at(t.x, t.y, i.c, i.fg, i.bg);
            }
        }
    }
    static renderMessage(term: TermIF, game: GameIF) {
        let log = game.log;
        if (!log) {
            return;
        }
        let line = log.top();
        let number = log.len();
        let s = (number > 1)
        ? `${line} (${number} more)`
        : line;

        s = this.extend(s, term);
        term.txt(0, 0, s, 'cyan', 'blue');
    }
    static extend(s: string, term: TermIF): string {
        let dim = term.dimension;
        if (!this.mask) {
            this.mask = ' '.repeat(dim.x);
        }
        return s + this.mask.substr(0, dim.x - s.length);
    }
    static mask:string='';


    static renderStats(term: TermIF, game: GameIF ) {
        let player = game.player;
        let hp = ` HP:${player.hp}`;
        let maxHp = `MHP:${player.maxHp}`;
        let y = 1;
        term.txt(0, y++, hp, "yellow", "teal");
        term.txt(0, y++, maxHp, "yellow", "teal");

    }

    static outside: MapCell = new MapCell(Glyph.Unknown);
}
