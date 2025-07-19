import { Term } from "./Term";
import { TPoint } from "./TPoint";

export class ResizingTerm extends Term {
    public reinitContext() {
        this.context = this.initContext();
    }
    public resize(w_px: number, h_px: number) {
        let tx = Math.floor(w_px/ this.dimension.x);
        let ty = Math.floor(h_px / this.dimension.y);
        let side_cand = (tx > ty ? ty : tx);
        this.side = side_cand;
        this.reinitContext();
    }

    public onResize() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        $('#canvas1').prop('width', w);
        $('#canvas1').prop('height', h);
        this.resize(w, h);
    }

    public static StockTerm(): ResizingTerm {
        return new ResizingTerm(TPoint.StockDims);
    }
}
