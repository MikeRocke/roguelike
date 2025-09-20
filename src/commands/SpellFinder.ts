import { GameIF } from "model/GameIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { StackIF } from "screen/stack/StackIF";
import { Spell } from "./Spell";
import { CostIF } from "./CostIF";
import { CmdIF } from "./CmdIF";
import { StackScreenIF } from "screen/stack/StackScreenIF";
import { Buff } from "model/Buff";
import { Mob } from "model/Mob";
import { HealCmd } from "./HealCmd";
import { BuffCmd } from "./BuffCmd";
import { CmdDirScreen } from "screen/CmdDirScreen";
import { BulletCmd } from "./BulletCmd";
import { TeleportCmd } from "./TeleportCmd";

export class SpellFinder {
    constructor(public game: GameIF, public screenStack: StackIF, public maker: ScreenMakerIF) {

    }

    find(spell: Spell, cost: CostIF | undefined): CmdIF | StackScreenIF | null {
        let game = this.game;
        let me = game.player;
        let level = 1;
        var s: StackScreenIF | undefined;
        var cmd: CmdIF;
        let buff = this.buff;
        switch (spell) {
            case Spell.Heal: cmd = new HealCmd(level, me, game); break;
            case Spell.D_Charm: ({ s, cmd } = buff(Buff.Charm, me)); break;
            case Spell.D_Slow: ({ s, cmd } = buff(Buff.Slow, me)); break;
            case Spell.D_Afraid: ({ s, cmd } = buff(Buff.Afraid, me)); break;
            case Spell.Missile: s = this.dir(
                cmd = new BulletCmd(game.player, game, this.screenStack, this.maker)); break;
            case Spell.D_Poison: ({ s, cmd } = buff(Buff.Poison, me)); break;
            case Spell.D_Confuse: ({ s, cmd } = buff(Buff.Confuse, me)); break;
            case Spell.D_Silence: ({ s, cmd } = buff(Buff.Silence, me)); break;
            case Spell.Cleanse: cmd = new CleanseAllCmd(me, game); break;
            case Spell.D_Stun: ({ s, cmd } = buff(Buff.Stun, me)); break;
            case Spell.D_Burn: ({ s, cmd } = buff(Buff.Burn, me)); break;
            case Spell.D_Blind: ({ s, cmd } = buff(Buff.Blind, me)); break;
            case Spell.Multiply: cmd = new MultiplyCmd(me, game); break;
            case Spell.D_Freeze: ({ s, cmd } = buff(Buff.Freeze, me)); break;
            case Spell.D_Root: ({ s, cmd } = buff(Buff.Root, me)); break;
            case Spell.D_Shock: ({ s, cmd } = buff(Buff.Shock, me)); break;
            case Spell.Teleport: cmd = new TeleportCmd(6, me, game); break;
            case Spell.D_Paralyze: ({ s, cmd } = buff(Buff.Paralyze, me)); break;
            case Spell.D_Sleep: ({ s, cmd } = buff(Buff.Sleep, me)); break;
            case Spell.D_Petrify: ({ s, cmd } = buff(Buff.Petrify, me)); break;
            case Spell.Summon: cmd = new SummonCmd(me, game); break;
            case Spell.D_Bleed: ({ s, cmd } = buff(Buff.Bleed, me)); break;
            case Spell.D_Levitate: ({ s, cmd } = buff(Buff.Levitate, me)); break;
            case Spell.D_Disarm: ({ s, cmd } = buff(Buff.Disarm, me)); break;
            default: return null;
        }
        cmd.setCost(cost);
        return s ? s : cmd;
    }

    buff(buff: Buff, me: Mob): CmdOrScreen {
        let buffCmd = new BuffCmd(buff, me, this.game, me);
        let { cmd, s } = this.payload(buffCmd, me);
        return { cmd: cmd, s: s };
    }

    payload(inner: CmdIF, me: Mob): CmdOrScreen {
        let cmd: CmdIF = new PayloadCmd(
            me, this.game, this.screenStack, this.maker, inner
        );
        let dirScreen: StackScreenIF = this.dir(cmd);
        return { cmd: cmd, s: dirScreen };
    }

    dir(cmd: CmdIF): StackScreenIF {
        return new CmdDirScreen(cmd, this.game, this.maker);
    }
}
