import { DMap } from "./DMap";
import { DMapIF } from "./DMapIF";
import { Glyph } from "./Glyph";
import { Rnd } from "./Rnd";
import { WPoint } from "./WPoint";

export class TestMap {
    static test0(): DMapIF {
        let wdim = new WPoint(14,8);
        let level = 0;
        return new DMap(wdim, Glyph.Wall, level);
    }

    static test(dim:WPoint, rnd:Rnd, level:number):DMapIF {
        let map = new DMap(dim, level, Glyph.Wall);
        for (var p = new WPoint(); p.y < dim.y; ++p.y) {
            for (p.x=0; p.x < dim.x; ++p.x) {
                let isEdge = !(p.x >0 && p.x < dim.x-1 && p.y >0 && p.y < dim.y-1);
                let chance = rnd.oneIn(4);
                let wall = isEdge || chance;
                map.cell(p).env = (wall ? Glyph.Wall : Glyph.Floor);
            }
        }
        return map;
    }

    static fullTest():DMapIF {
        let wdim = new WPoint(32,16);
        let rnd = new Rnd(42);
        return TestMap.test(wdim, rnd, 0);
    }
}
