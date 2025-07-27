import { TPoint } from "term/TPoint";

export class WPoint {
    constructor(public x:number=0, public y:number=0) {

    }

    set(n: WPoint) {
        this.x = n.x;
        this.y = n.y;
    }

    empty(): boolean {
        return this.x == 0 && this.y == 0;
    }

    plus(p:WPoint):WPoint {
        return this.copy().addTo(p);
    }

    copy():WPoint {
        return new WPoint(this.x, this.y);
    }

    addTo(b: WPoint): WPoint {
        this.x += b.x;
        this.y += b.y;
        return this;
    }

    dir(p:WPoint): WPoint {
        return new WPoint(
            Math.sign(p.x-this.x),
            Math.sign(p.y-this.y)
        );
    }

    dist(b:WPoint) {
        return Math.sqrt(this.squareDistance(b));
    }

    squareDistance(b: WPoint) {
        let d = this.minus(b);
        return (d.x*d.x + d.y*d.y);
    }
    minus(b: WPoint) {
        return new WPoint(this.x-b.x, this.y-b.y);
    }

    static StockDims = new WPoint(
      TPoint.StockDims.x, TPoint.StockDims.y
    );

    eq(b:WPoint): boolean {
        return this.x == b.x && this.y == b.y;
    }
}
