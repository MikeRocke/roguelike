import { DMapIF } from "model/DMapIF";
import { Rnd } from "model/Rnd";
import { WPoint } from "../model/WPoint";
import { Glyph } from "model/Glyph";
export class FreeSpace {
    static findFree(map: DMapIF, rnd: Rnd): WPoint | null {
        return this.find(Glyph.Floor, map, rnd);
    }
    static find(glyph: Glyph, map: DMapIF, rnd: Rnd): WPoint | null {
        let e = new WPoint(map.dim.x - 2, map.dim.y - 2);
        let s = new WPoint(rnd.rndC(1, e.x), rnd.rndC(1, e.y));
        for (let p = s.copy(); ;) {
            let cell = map.cell(p);
            if (cell.env == glyph && !cell.mob) {
                return p;
            }
            ++p.x;
            if (p.x > e.x) {
                p.x = 1;
                ++p.y;
                if (p.y > e.y) {
                    p.y = 1;
                }
            }
            if (p.eq(s)) {
                throw 'freespace not found';
            }
        }
    }
}
