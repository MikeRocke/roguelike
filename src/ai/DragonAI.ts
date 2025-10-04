import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { StackIF } from "screen/stack/StackIF";
import { MobAi_ant } from "./MobAi_ant";
import { MobAi_cat } from "./MobAi_cat";
import { MobAiIF } from "./MobAiIF";
import { SleepAI } from "./SleepAI";
import { Mood } from "model/Mood";
import { DMapIF } from "model/DMapIF";
import { CanSee } from "commands/CanSee";
import { Rnd } from "model/Rnd";
import { Spell } from "commands/Spell";
import { NPCSpellFinder } from "commands/NPCSpellFinder";
import { CostIF } from "commands/CostIF";
import { CmdBase } from "commands/CmdBase";
import { WPoint } from "model/WPoint";
import { TeleportCmd } from "commands/TeleportCmd";

export class DragonAI implements MobAiIF {
    constructor(public speed: number, public spellRate: number) {}

    aiDir: MobAiIF = new MobAi_cat();
    aiRnd: MobAiIF = new MobAi_ant();

    turn(me: Mob, enemy: Mob, game: GameIF, screenStack: StackIF, maker: ScreenMakerIF): boolean {
        let rnd = game.rnd;
        if (DragonAI.isNear(2, me, enemy)) {
            if (rnd.oneIn(3)) {
                return this.teleport(5, me, game);
            }
        }

        let far = SleepAI.isNear(me, enemy);
        if (far) {
            me.mood = rnd.oneIn(3) ? Mood.Asleep : Mood.Wake;
            if (me.mood == Mood.Asleep) {
                return true;
            }
        }
        let lineOfFire = this.aim(me.pos, enemy.pos);
        if (lineOfFire) {
            switch(rnd.rndC(0, 2)) {
                    default: break;
                    case 0: return this.teleport(5, me, game);
                    case 1: return this.shoot(Spell.Breath, me, enemy, game, screenStack, maker);
            }
        }

        if (this.didBreathe(me, rnd, game, enemy, screenStack, maker)) {
            return true;
        }
        if (this.maybeCastSpell(me, enemy, game, screenStack, maker)) {
            return true;
        }
        for (let i = 0; i < this.speed; ++i) {
            var ai = rnd.oneIn(2) ? this.aiDir : this.aiRnd;
            ai.turn(me, enemy, game, screenStack, maker);
        }
        return true;
    }

    maybeCastSpell(me: Mob, enemy: Mob, game: GameIF, screenStack: StackIF, maker: ScreenMakerIF): boolean {
        let map = <DMapIF>game.currentMap();
        if (!CanSee.canSee2(me, enemy, map, true)) {
            return false;
        }
        let rnd = game.rnd;
        if (!rnd.oneIn(this.spellRate)) {
            return false;
        }

        let spell = this.pickSpell(me, rnd);
        return this.castSpell(spell, me, enemy, game, screenStack, maker);
    }

    pickSpell(me: Mob, rnd: Rnd): Spell {
        let range: number = (Spell.None) + 1;
        let spellIndex: number = me.level % range;
        let spell: Spell = <Spell>spellIndex;
        return spell;
    }
    castSpell(spell: Spell, me: Mob, enemy: Mob, game: GameIF, screenStack: StackIF, maker: ScreenMakerIF): boolean {
        let finder = new NPCSpellFinder(game, screenStack, maker);
        let noCost: CostIF | undefined = undefined;
        let cos = finder.find(me, spell, noCost);
        if (cos instanceof CmdBase) {
            return cos.npcTurn();
        }
        return true;
    }

    didBreathe(me: Mob, rnd: Rnd, game: GameIF, him: Mob,
        screenStack: StackIF, maker: ScreenMakerIF): boolean {
        if (!this.aim(me.pos, him.pos)) {
            return false;
        }
        let spell = Spell.Breath;
        if (!rnd.oneIn(this.spellRate)) {
            return false;
        }
        let map = <DMapIF>game.currentMap();
        if (!CanSee.canSee2(me, him, map, true)) {
            return false;
        }
        return this.shoot(spell, me, him, game, screenStack, maker);
    }

    aim(m: WPoint, e: WPoint) {
        let d = m.minus(e);
        if (d.x == 0 || d.y == 0) {
            return true;
        }
        let ax = Math.abs(d.x);
        let ay = Math.abs(d.y);
        return (ax == ay);
    }

    isMissileSpell(s: Spell) {
        return s == Spell.Missile;
    }

    shoot(spell: Spell, me: Mob, enemy: Mob, game: GameIF,
        screenStack: StackIF, maker: ScreenMakerIF): boolean {
        this.castSpell(spell, me, enemy, game, screenStack, maker);
        return true;
    }
    teleport(rad: number, me: Mob, g: GameIF): boolean {
        return new TeleportCmd(rad, me, g).npcTurn();
    }
    static isNear(limit: number, me: Mob, enemy: Mob): boolean {
        let dist = me.pos.dist(enemy.pos);
        return dist < limit;
    }
}
