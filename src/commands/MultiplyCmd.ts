import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { DMapIF } from "model/DMapIF";
import { WPoint } from "model/WPoint";
import { Rnd } from "model/Rnd";

export class MultiplyCmd extends CmdBase {
    constructor(public me: Mob, public game: GameIF) {
        super(me, game);
    }

    exec(): boolean {
        let game = this.game;
        let map = <DMapIF>game.currentMap();
        let p = this.find(map, game.rnd);
        if (p == null) {
            return true;
        }
        this.spawnMob(p, map, game);
        return true;
    }

    spawnMob(p: WPoint, map: DMapIF, game: GameIF) {
        let me = this.me;
        let build = game.build;
        build.addNPC(me.glyph, p.x, p.y, map, me.level);
        game.message(`${me.name} breeds`)
    }

    find(map: DMapIF, rnd: Rnd) : WPoint|null {
        let pos = this.me.pos;
        let c: WPoint[] = [];
        let a = new WPoint();
        for (a.y=-1;a.y<=1;++a.y) {
            for (a.x=-1;a.x<=1;++a.x) {
                let b = pos.plus(a);
                if (!map.blocked(b)) {
                    c.push(b);
                }
            }
        }

        return this.pick(c, rnd);
    }

    pick(c:WPoint[], r:Rnd): WPoint|null {
        if (c.length == 0) {
            return null;
        }
        let ix = r.rnd(c.length);
        return c[ix];
    }
}
