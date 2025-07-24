import { GameIF } from "model/GameIF";
import { StackScreenIF } from "./stack/StackScreenIF";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { TermIF } from "term/TermIF";
import { DrawMap } from "model/DrawMap";
import { StackIF } from "./stack/StackIF";
import { Mob } from "model/Mob";
import { DMapIF } from "model/DMapIF";

export class BaseScreen implements StackScreenIF {
    name: string = 'base';

    constructor(public game: GameIF, public make: ScreenMakerIF) {}


    draw(term: TermIF): void {
        DrawMap.drawMapPlayer(term, <DMapIF>this.game.currentMap(), this.game.player.pos, this.game);
    }


    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
    }


    npcTurns(stack: StackIF) {
        let player = <Mob>this.game.player;
        let map = <DMapIF>this.game.currentMap();
        let q = map.turnQueue;
        var mob: Mob;
        for (mob = q.next(); !mob.isPlayer && !this.over(stack); mob = q.next()) {
            this.npcTurn(mob, player);
        }
    }
    npcTurn(m: Mob, player: Mob) {
        let ai = this.game.ai;
        if (ai) {
            ai.turn(m, player, this.game);
        }
        return true;
    }

    over(stack: StackIF): boolean {
        let over = !this.game.player.alive();
        if (over) {
            stack.pop();
            stack.push(this.make.gameOver());
        }
        return over;
    }


}
