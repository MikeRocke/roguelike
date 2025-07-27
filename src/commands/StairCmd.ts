import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { DMapIF } from "model/DMapIF";
import { FreeSpace } from "build/FreeSpace";
import { WPoint } from "model/WPoint";

export class StairCmd extends CmdBase {
    constructor(public levelDir: number, public game: GameIF) {
        super(game.player, game);
    }

    exec(): boolean {
        let game = this.game;
        let dungeon = game.dungeon;
        let newLevel = dungeon.level + this.levelDir;
        let newMap: DMapIF = dungeon.getLevel(newLevel, game);
        let newPosition = FreeSpace.findFree(newMap, game.rnd);
        let dir = (this.levelDir != -1 ? 'descends' : 'ascends');
        this.game.message(`player ${dir} some stairs`);
        dungeon.playerSwitchLevel(newLevel, <WPoint>newPosition, game);
        return true;
    }
}
