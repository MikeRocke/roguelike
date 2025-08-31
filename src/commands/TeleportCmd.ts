import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { Mob } from "model/Mob";
import { DMapIF } from "model/DMapIF";
import { WPoint } from "model/WPoint";

export class TeleportCmd extends CmdBase {
    constructor(
        public r: number, public me: Mob, public game: GameIF
    ) {
        super(me, game);
    }

    exec() {
        let game = this.game;
        let map = <DMapIF>game.currentMap();
        let p = this.pick(this.me.pos, this.r, map);
        if (!p) {
            return false;
        }
        map.moveMob(this.me, p);
        game.message(`${this.me.name} shimmers`);
        return true;
    }

    pick(c: WPoint, r: number, map: DMapIF): WPoint | null {
        let rnd = this.game.rnd;
        let p = new WPoint();
        for (var index = 15; index > 0;) {
            let dx = rnd.rnd(-r, r);
            let dy = rnd.rnd(-r, r);
            p.x = c.x + dx;
            p.y = c.y + dy;
            if (!map.legal(p)) {
                continue;
            }
            --index;
            if (map.cell(p).blocked()) {
                continue;
            }
            return p;
        }
        return null;
    }
}
