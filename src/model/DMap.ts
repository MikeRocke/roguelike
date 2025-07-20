import { DMapIF } from "./DMapIF";
import { Glyph } from "./Glyph";
import { MapCell } from "./MapCell";
import { WPoint } from "./WPoint";

export class DMap implements DMapIF {
    cells:MapCell[][];
    constructor(public dim: WPoint, public level: number, g_empty: Glyph) {
        this.cells = this.allocMap(g_empty);
    }
    allocMap(g_empty: Glyph): MapCell[][] {
        let cells = new Array(this.dim.y);
        let p:WPoint = new WPoint();
        for (p.y = 0; p.y < this.dim.y; ++p.y) {
            cells[p.y] = new Array(this.dim.x);
            for (p.x = 0; p.x < this.dim.x; ++p.x) {
                cells[p.y][p.x] = new MapCell(g_empty);
            }

        }
        return cells;
    }

    cell(p: WPoint): MapCell {
        return this.cells[p.y][p.x];
    }
    legal(p: WPoint): boolean {
        return p.x >= 0 && p.x < this.dim.x
        && p.y >= 0 && p.y < this.dim.y;
    }

}
