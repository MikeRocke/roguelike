import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { CmdIF } from "./CmdIF";
import { WPoint } from "model/WPoint";
import { Act } from "./Act";
import { Able } from "./Able";
import { Buff } from "model/Buff";

export abstract class CmdBase implements CmdIF {
    mob: Mob | undefined = undefined;
    act: Act = Act.Act;

    constructor(public me: Mob, public game: GameIF) {}

    exec(): boolean {
        throw new Error("Method not implemented.");
    }
    turn(): boolean {
        let r = this.able(
            <Mob>this.mob, <GameIF>this.game, this.act
        );
        if (!r.able) {
            return r.turn;
        }
        return this.exec();
    }
    able(mob: Mob, game: GameIF, act: Act): Able {
        let cant: Able = { able: false, turn: false };
        let foil: Able = { able: false, turn: true };
        let able: Able = { able: true, turn: false };
        let hit = (act == Act.Act);
        let move = (act == Act.Move);
        let hitOrMove = (hit || move);
        if (hit && this.afraid(mob, game)) {
            return cant;
        }
        if (hit && this.charmed(mob, game)) {
            return cant;
        }
        if (move && this.rooted(mob, game)) {
            return cant;
        }
        if (hitOrMove && this.levitate(mob, game)) {
            return cant;
        }
        if (this.paralyzed(mob, game)) {
            return foil;
        }
        return able;
    }
    raw(): boolean {
        return this.exec();
    }
    npcTurn(): boolean {
        return this.exec();
    }
    setDir(dir: WPoint): CmdIF {
        throw new Error("Method not implemented.");
    }
    afraid(me: Mob, game: GameIF): boolean {
        let afraid = me.is(Buff.Afraid);
        if (afraid && me.isPlayer) {
            game.flash(`Player is afraid`);
        }
        return afraid;
    }
    charmed(me: Mob, game: GameIF): boolean {
        let charmed = me.is(Buff.Charm);
        if (charmed && me.isPlayer) {
            game.flash(`Player is charmed`);
        }
        return charmed;
    }
    rooted(me: Mob, game: GameIF): boolean {
        let rooted = me.is(Buff.Root);
        if (rooted && me.isPlayer) {
            game.flash(`Player is rooted!`);
        }
        return rooted;
    }
    levitate(me: Mob, game: GameIF): boolean {
        let rooted = me.is(Buff.Levitate);
        if (rooted && me.isPlayer) {
            game.flash(`Player levitates!`);
        }
        return rooted;
    }
    paralyzed(me:Mob, game: GameIF): boolean {
        if (!me.is(Buff.Paralyze)) {
            return false;
        }
        let rate = 0;
        switch (this.act) {
                case Act.Move: rate=33; break;
                case Act.Hit: rate=25; break;
                case Act.Act: rate=20; break;
        }
        let paralyzed = !game.rnd.percent(rate);
        if (paralyzed) {
            if (me.isPlayer) {
                game.flash(`player is paralyzed`);
            }
        } else {
            let buff = me.buffs.get(Buff.Paralyze);
            buff!.time -= game.rnd.rndC(1, 2);
        }

        return paralyzed;
    }
}
