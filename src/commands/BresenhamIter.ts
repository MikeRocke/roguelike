import { WPoint } from "model/WPoint";

export class BresenhamIter {
    pixels: WPoint[] = [];
    i: number = 0;
    longest: number = 0;
    shortest: number = 0;
    dx1: number = 0;
    dy1: number = 0;
    dx2: number = 0;
    dy2: number = 0;
    numerator: number = 0;
    x: number = 0;
    y: number = 0;
    done(): boolean {
        return !(this.i <= this.longest);
    }
    iterAll(): void {
        for (var i = 0; i < this.longest; ++i) {
            this.next();
        }
    }
    iterAll2(): void {
        var p: WPoint;
        for (; !this.done();) {
            p = this.next();
        }
        do {
            p = this.next();
        } while (!this.done());
        console.log(p);
    }
    public static BresenhamIter1(p1: WPoint, p2: WPoint): BresenhamIter {
        return new BresenhamIter().init(p1.x, p1.y, p2.x, p2.y);
    }
    public static BresenhamIter2(x1: number, y1: number, x2: number, y2: number): BresenhamIter {
        return new BresenhamIter().init(x1, y1, x2, y2);
    }
    init(x1: number, y1: number, x2: number, y2: number): BresenhamIter {
        this.x = x1;
        this.y = y1;
        let w: number = x2 - this.x;
        let h: number = y2 - this.y;

        if (w < 0) {
            this.dx1 = -1;
        } else if (w > 0) {
            this.dx1 = 1;
        }

        if (h < 0) {
            this.dy1 = -1;
        } else if (h > 0) {
            this.dy1 = 1;
        }


        if (w < 0) {
            this.dx2 = -1;
        } else if (w > 0) {
            this.dx2 = 1;
        }
        this.longest = Math.abs(w);
        this.shortest = Math.abs(h);

        if (!(this.longest > this.shortest)) {
            this.longest = Math.abs(h);
            this.shortest = Math.abs(w);
            if (h < 0) {
                this.dy2 = -1;
            } else if (h > 0) {
                this.dy2 = 1;
            }
        }

        this.numerator = Math.floor(this.longest * 0.5);
        this.i = 0;
        return this;
    }
    next() {
        let currentPoint:WPoint = new WPoint(this.x, this.y);
        this.pixels.push(currentPoint);
        this.numerator += this.shortest;
        if (!(this.numerator < this.longest)) {
            this.numerator -= this.longest;
            this.x += this.dx1;
            this.y += this.dy1;
        } else {
            this.x += this.dx2;
            this.y += this.dy2;
        }
        ++this.i;
        return currentPoint;
    }
}
