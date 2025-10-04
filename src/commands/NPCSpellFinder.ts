import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { StackIF } from "screen/stack/StackIF";
import { Spell } from "./Spell";
import { CostIF } from "./CostIF";
import { CmdIF } from "./CmdIF";
import { StackScreenIF } from "screen/stack/StackScreenIF";
import { Buff } from "model/Buff";
import { BuffCmd } from "./BuffCmd";
import { HealCmd } from "./HealCmd";
import { SummonCmd } from "./SummonCmd";
import { TeleportCmd } from "./TeleportCmd";
import { MultiplyCmd } from "./MultiplyCmd";
import { BulletCmd } from "./BulletCmd";
import { CleanseAllCmd } from "./CleanseAllCmd";
import { BreathCmd } from "./BreathCmd";

export class NPCSpellFinder {
    player: Mob;
    constructor(public game: GameIF, public screenStack: StackIF, public maker: ScreenMakerIF) {
        this.player = game.player;
    }

    find(me: Mob, spell: Spell, cost: CostIF | undefined): CmdIF | StackScreenIF | null {
        let game = this.game;
        let level = 1;
        var s: StackScreenIF | undefined;
        var cmd: CmdIF;
        switch (spell) {
            case Spell.Heal: cmd = new HealCmd(level, me, game); break;
            case Spell.D_Charm: cmd = this.buff(Buff.Charm, me); break;
            case Spell.D_Slow: cmd = this.buff(Buff.Slow, me); break;
            case Spell.D_Afraid: cmd = this.buff(Buff.Afraid, me); break;
            case Spell.Missile: cmd = this.aim(
                cmd = new BulletCmd(game.player, game, this.screenStack, this.maker)); break;
            case Spell.D_Poison: cmd = this.buff(Buff.Poison, me); break;
            case Spell.D_Confuse: cmd = this.buff(Buff.Confuse, me); break;
            case Spell.D_Silence: cmd = this.buff(Buff.Silence, me); break;
            case Spell.Cleanse: cmd = new CleanseAllCmd(me, game); break;
            case Spell.D_Stun: cmd = this.buff(Buff.Stun, me); break;
            case Spell.D_Burn: cmd = this.buff(Buff.Burn, me); break;
            case Spell.D_Blind: cmd = this.buff(Buff.Blind, me); break;
            case Spell.Multiply: cmd = new MultiplyCmd(me, game); break;
            case Spell.D_Freeze: cmd = this.buff(Buff.Freeze, me); break;
            case Spell.D_Root: cmd = this.buff(Buff.Root, me); break;
            case Spell.D_Shock: cmd = this.buff(Buff.Shock, me); break;
            case Spell.Teleport: cmd = new TeleportCmd(6, me, game); break;
            case Spell.D_Paralyze: cmd = this.buff(Buff.Paralyze, me); break;
            case Spell.D_Sleep: cmd = this.buff(Buff.Sleep, me); break;
            case Spell.D_Petrify: cmd = this.buff(Buff.Petrify, me); break;
            case Spell.Summon: cmd = new SummonCmd(me, game); break;
            case Spell.D_Bleed: cmd = this.buff(Buff.Bleed, me); break;
            case Spell.D_Levitate: cmd = this.buff(Buff.Levitate, me); break;
            case Spell.D_Disarm: cmd = this.buff(Buff.Disarm, me); break;
            case Spell.Breath: cmd = this.aim(new BreathCmd(me, game, this.screenStack, this.maker)); break;
            default: return null;
        }
        cmd.setCost(cost);
        return s ? s : cmd;
    }

    buff(buff: Buff, me: Mob): CmdIF {
        return new BuffCmd(buff, this.player, this.game, me);
    }
    aim(cmd: BulletCmd): CmdIF {
        let dir = cmd.me.pos.dir(this.player.pos);
        return cmd.setDir(dir);
    }
}
