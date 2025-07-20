import { TPoint } from "term/TPoint";

export class WPoint {
    constructor(public x:number=0, public y:number=0) {

    }

    static StockDims = new WPoint(
      TPoint.StockDims.x, TPoint.StockDims.y
    );
}
