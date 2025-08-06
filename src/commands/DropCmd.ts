import { Object } from "model/Object";
import { CmdBase } from "./CmdBase";
import { GameIF } from "model/GameIF";
import { DMapIF } from "model/DMapIF";

export class DropCmd extends CmdBase {
    constructor(public obj: Object, public index: number, game: GameIF) {
        super(game.player, game);
    }

    exec(): boolean {
        let game = this.game;
        let map = <DMapIF>game.currentMap();
        let player = game.player;
        let cell = map.cell(player.pos);
        if (cell.hasObject()) {
            game.flash("No room to drop here!");
            return false;
        }
        cell.object = this.obj;
        let bag = game.bag;
        bag.removeIndex(this.index);
        game.message(`You drop ${cell.object.name()}`);
        return true;
    }
}
