import { DMapIF } from "./DMapIF";
import { Glyph } from "./Glyph";
import { MapCell } from "./MapCell";
import { Mob } from "./Mob";
import { Object } from "./Object";
import { TurnQueue } from "./TurnQueue";
import { WPoint } from "./WPoint";

export class DMap implements DMapIF {
    cells:MapCell[][];
    turnQueue: TurnQueue = new TurnQueue();
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
    moveMob(mob: Mob, point: WPoint) {
        this.cell(mob.pos).mob = undefined;
        mob.pos.x = point.x;
        mob.pos.y = point.y;
        this.cell(mob.pos).mob = mob;
    }

    addNPC(mob: Mob): Mob {
        this.cell(mob.pos).mob = mob;
        this.turnQueue.pushMob(mob);
        return mob;
    }

    removeMob(mob: Mob):void {
        this.turnQueue.removeMob(mob);
        this.cell(mob.pos).mob = undefined;
    }

    enterMap(player: Mob, newPoint: WPoint): void {
        player.pos.set(newPoint);
        this.cell(player.pos).mob = player;
        this.turnQueue.frontPushMob(player);
    }
    blocked(p: WPoint): boolean {
        if (!this.legal(p)) {
            return true;
        }
        let c = this.cell(p);
        return c.blocked();
    }
    addObject(obj: Object, p: WPoint): void {
        this.cell(p).object = obj;
    }
}
