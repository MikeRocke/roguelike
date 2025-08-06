import { GameIF } from "model/GameIF";
import { CmdBase } from "./CmdBase";
import { DMapIF } from "model/DMapIF";

export class PickUpCmd extends CmdBase {
    constructor(game: GameIF) {
        super(game.player, game);
    }

    exec(): boolean {
        let game = this.game;
        let map = <DMapIF>game.currentMap();
        let player = game.player;
        let bag = game.bag;
        let c = map.cell(player.pos);
        let object = c.object;
        if (object) {
            c.object = undefined;
            bag.add(object);
            let message = `Player gets ${object.description()}`;
            game.flash(message);
            return true;
        } else {
            game.flash("Nothing to get here.");
            return false;
        }
    }
}
