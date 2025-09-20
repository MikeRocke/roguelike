import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { WPoint } from "model/WPoint";
import { MultiplyCmd } from "./MultiplyCmd";

export class SummonCmd extends MultiplyCmd {
    spawnMob(p: WPoint, map: DMapIF, game: GameIF): void {
        let me = this.me;
        let build = game.build;
        let spawned = build.addMapLevel_Mob(p, map, game.rnd);
        game.message(`${me.name} summons ${spawned.name}`)
    }
}
