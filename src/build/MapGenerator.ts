import { DMap } from "model/DMap";
import { DMapIF } from "model/DMapIF";
import { Glyph } from "model/Glyph";
import { Rnd } from "model/Rnd";
import { WPoint } from "model/WPoint";
import { TPoint } from "term/TPoint";

export class MapGenerator {
    constructor(public map: DMapIF, public random: Rnd) {}

    public loop(map: DMapIF, random: Rnd) {
        let num = 20;
        let ul = new WPoint();
        let xt = new WPoint();
        for (var n = 0; n < num; ++n) {
            this.pick(ul, xt);
            let filled = random.oneIn(3);
            this.draw(ul, xt, filled);
        }
        return map;
    }
    draw(ul: WPoint, xt: WPoint, filled: boolean) {
        let center = filled ? Glyph.Wall : Glyph.Floor;
        let x2 = xt.x - 1;
        let y2 = xt.y - 1;

        let seconds: WPoint[] = [];
        let p = new WPoint();

        for (let y = 0; y <= xt.y; ++y) {
            p.y = y + ul.y;
            for (let x = 0; x <= xt.x; ++x) {
                p.x = x + ul.x;
                let edge = (x == 0 || y == 0 || x == xt.x || y == xt.y);
                let section = (x == 1 || y == 1 || x == x2 || y == y2);
                let glyph = edge
                    ? Glyph.Floor
                    : (section ? Glyph.Wall : center);
                this.map.cell(p).env = glyph;
                if (section) {
                    seconds.push(p.copy());
                }
            }
        }
        if (!filled) {
            this.makeDoors(seconds);
        }
    }
    makeDoors(seconds: WPoint[]) {
        let r = this.random;
        for (var i = r.rnd(1,3); i >= 0; --i) {
            let ix = r.rnd(0, seconds.length);
            let p = seconds[ix];
            this.map.cell(p).env = Glyph.DoorsClosed;
        }
    }
    pick(ul: WPoint, xt: WPoint) {
        let random = this.random;
        let dim = this.map.dim;
        xt.y = random.rndC(4, 8);
        xt.x = random.rndC(4, 12);

        if (random.oneIn(2)) {
            let swap = xt.x;
            xt.x = xt.y;
            xt.y = swap;
        }
        ul.x = random.rnd(1, dim.x - xt.x - 1);
        ul.y = random.rnd(1, dim.y - xt.y - 1);
    }

    public static test(level:number):DMapIF {
        let dim = TPoint.StockDims;
        let wdim = new WPoint(dim.x, dim.y);
        let map = new DMap(wdim, level, Glyph.Rock);
        let rnd = new Rnd(42);
        let gen = new MapGenerator(map, rnd);

        return gen.loop(map, rnd);

    }
}
