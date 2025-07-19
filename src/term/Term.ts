import { TermIF } from "./TermIF";
import { TPoint } from "./TPoint";


export class Term implements TermIF {
    context: CanvasRenderingContext2D;
    hside: number = 1;
    vside: number = 1;
    side: number = 40;
    scale: number = 0.8;

    constructor(public dimension: TPoint) {
        this.context = this.initContext();
    }

    initContext(): CanvasRenderingContext2D {
        let canvas = <HTMLCanvasElement>document.getElementById("canvas1");
        let context = <CanvasRenderingContext2D>canvas.getContext("2d");

        this.hside = this.side * 1.0;
        this.vside = this.side * 1.0;

        let squeeze: number = this.side * this.scale;
        context.fillStyle = "#110";
        context.strokeStyle = "red";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = `${squeeze}px sans-serif`;

        return context;
    }

    public static StockTerm(): Term {
        return new Term(TPoint.StockDims);
    }

    txt(x: number, y: number, s: string, fg: string, bg: string): void {
        let effectiveX = x;
        let effectiveY = y;
        for (let i = 0; i < s.length; i++) {
            this.at(effectiveX, effectiveY, s.charAt(i), fg, bg);
            effectiveX++;
            if (effectiveX >= this.dimension.x) {
                effectiveX = 0;
                effectiveY++;
                if (effectiveY > this.dimension.y) {
                    effectiveY = 0;
                }
            }
        }
    }
    at(x: number, y: number, s: string, fg: string, bg: string): void {
        let fx = (x) * this.hside;
        let fy = (y) * this.vside;
        let px = (x + 0.5) * this.hside;
        let py = (y + 0.5) * this.vside;

        this.context.save();
        {
            this.context.fillStyle = bg;
            this.context.fillRect(fx, fy, this.hside, this.vside);

            this.context.beginPath();
            this.context.rect(fx, fy, this.hside, this.vside);
            this.context.clip();

            this.context.fillStyle = fg;
            this.context.fillText(s, px, py);
        }

        this.context.restore();
    }

}
