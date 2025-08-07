import { GameIF } from "model/GameIF";
import { StackScreenIF } from "./stack/StackScreenIF";
import { ScreenMakerIF } from "./ScreenMakerIF";
import { TermIF } from "term/TermIF";
import { DrawMap } from "model/DrawMap";
import { StackIF } from "./stack/StackIF";
import { Mob } from "model/Mob";
import { DMapIF } from "model/DMapIF";
import { TurnQueue } from "model/TurnQueue";

export class BaseScreen implements StackScreenIF {
    name: string = 'base';

    constructor(public game: GameIF, public make: ScreenMakerIF) {}


    draw(term: TermIF): void {
        DrawMap.drawMapPlayer(term, <DMapIF>this.game.currentMap(), this.game.player.pos, this.game);
        DrawMap.renderStats(term, this.game);
        DrawMap.renderMessage(term, this.game);
    }


    onKey(e: JQuery.KeyDownEvent, stack: StackIF): void {
    }

    tickBuffs(m: Mob) {
        if (m.buffs) {
            m.buffs.ticks(m, this.game);
        }
    }
    finishTurn(m: Mob) {
        this.tickBuffs(m);
    }

    npcTurns(stack: StackIF) {
        let player = <Mob>this.game.player;
        let map = <DMapIF>this.game.currentMap();
        let q = map.turnQueue;
        this.finishPlayerTurn(q);
        var mob: Mob;
        for (mob = q.next(); !mob.isPlayer && !this.over(stack); mob = q.next()) {
            this.npcTurn(mob, player);
        }
        this.handleMessages(stack);
    }
    finishPlayerTurn(q: TurnQueue) {
        let player = q.currentMob();
        if (!player.isPlayer) {
            throw `${player.name} is not player?`;
        }
        this.finishTurn(player);
        if (this.game.autoHeal) {
            this.game.autoHeal.turn(player, this.game);
        }
    }
    handleMessages(stack: StackIF) {
        if (!this.game.log) {
            return;
        }
        if (this.game.log.queuedMessages()) {
            stack.push(this.make.more(this.game));
        }
    }
    npcTurn(m: Mob, player: Mob) {
        let ai = this.game.ai;
        if (ai) {
            ai.turn(m, player, this.game);
        }
        this.finishTurn(m);
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
