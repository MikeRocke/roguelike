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
        let buff = this.buff;
        switch (spell) {
            case Spell.Heal: cmd = new HealCmd(level, me, game); break;
            case Spell.D_Charm: (cmd = buff(Buff.Charm, me)); break;
            case Spell.D_Slow: (cmd = buff(Buff.Slow, me)); break;
            case Spell.D_Afraid: (cmd = buff(Buff.Afraid, me)); break;
            case Spell.Missile: cmd = this.aim(
                cmd = new BulletCmd(game.player, game, this.screenStack, this.maker)); break;
            case Spell.D_Poison: (cmd = buff(Buff.Poison, me)); break;
            case Spell.D_Confuse: (cmd = buff(Buff.Confuse, me)); break;
            case Spell.D_Silence: (cmd = buff(Buff.Silence, me)); break;
            case Spell.Cleanse: cmd = new CleanseAllCmd(me, game); break;
            case Spell.D_Stun: (cmd = buff(Buff.Stun, me)); break;
            case Spell.D_Burn: (cmd = buff(Buff.Burn, me)); break;
            case Spell.D_Blind: (cmd = buff(Buff.Blind, me)); break;
            case Spell.Multiply: cmd = new MultiplyCmd(me, game); break;
            case Spell.D_Freeze: (cmd = buff(Buff.Freeze, me)); break;
            case Spell.D_Root: (cmd = buff(Buff.Root, me)); break;
            case Spell.D_Shock: (cmd = buff(Buff.Shock, me)); break;
            case Spell.Teleport: cmd = new TeleportCmd(6, me, game); break;
            case Spell.D_Paralyze: (cmd = buff(Buff.Paralyze, me)); break;
            case Spell.D_Sleep: (cmd = buff(Buff.Sleep, me)); break;
            case Spell.D_Petrify: (cmd = buff(Buff.Petrify, me)); break;
            case Spell.Summon: cmd = new SummonCmd(me, game); break;
            case Spell.D_Bleed: (cmd = buff(Buff.Bleed, me)); break;
            case Spell.D_Levitate: (cmd = buff(Buff.Levitate, me)); break;
            case Spell.D_Disarm: (cmd = buff(Buff.Disarm, me)); break;
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
