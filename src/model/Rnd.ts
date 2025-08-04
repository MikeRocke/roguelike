import { WPoint } from "./WPoint";

export class RndRoot {
    constructor(public seed: number) {}
    getSeed(): number {
        return this.seed;
    }
    setSeet(newSeed: number) {
        this.seed = newSeed;
    }
    srand(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        var rn = this.seed / 233280;
        return rn;
    }
}

export class RndBase extends RndRoot {
    rnd(lower: number, higher: number = 0): number {
        var range, draw, roll;
        if (!higher) {
            higher = lower;
            lower = 0;
        }
        if (lower > higher) {
            let swap = lower;
            lower = higher;
            higher = swap;
        }

        range = (higher - lower);
        draw = this.srand() * range;
        roll = Math.floor(draw) + lower;
        return roll;
    }

    rndC(lower: number, higher: number): number {
        return this.rnd(lower, higher + 1);
    }
    oneIn(N: number): boolean {
        return (this.rnd(N) == 0);
    }
}

export class Rnd extends RndBase {
    rndDir2(): WPoint {
        let a = this.rndC(-1, 1);
        let b = this.oneIn(2) ? 1 : -1;
        let h = this.oneIn(2);
        return new WPoint(h ? a : b, h ? b : a);
    }
    rndDir(p: WPoint = new WPoint()): WPoint {
        return new WPoint(p.x + this.rndC(-1, 1), p.y + this.rndC(-1, 1));
    }

    spiceUpLevel(L: number): number {
        if (this.oneIn(3)) {
            let dir = this.oneIn(3) ? 1 : -1;
            L = this.spice(L + dir, dir);
            if (L < 0) {
                L = 0;
            }
        }
        return L;
    }
    spice(level: number, dir: number): number {
        return this.oneIn(4) ? this.spice(level + dir, dir) : level;
    }

}
