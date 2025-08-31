import { GameIF } from "model/GameIF";
import { ScreenMakerIF } from "screen/ScreenMakerIF";
import { StackIF } from "screen/stack/StackIF";
import { CmdIF } from "./CmdIF";
import { Slot } from "model/Slot";
import { Object } from "model/Object";
import { Glyph } from "model/Glyph";
import { HealCmd } from "./HealCmd";
import { TeleportCmd } from "./TeleportCmd";
import { BulletCmd } from "./BulletCmd";
import { CmdDirScreen } from "screen/CmdDirScreen";
import { StackScreenIF } from "screen/stack/StackScreenIF";
import { ChargedItemCost } from "./ChargedItemCost";

export class FindObjectSpell {
    constructor(public object: Object, public index: number, public game: GameIF, public stack: StackIF, public maker: ScreenMakerIF) {}

    usable(object: Object): boolean {
        let canUse = (object.slot == Slot.NotWorn);
        if (!canUse) {
            this.game.flash(
                `${object.name()} is not usable: ${object.slot}`)
        }
        return canUse;
    }

    find(): CmdIF | StackScreenIF | null {
        let object: Object = this.object;
        if (!this.usable(object)) {
            return null;
        }
        let game = this.game;
        let me = game.player;
        var cmd: CmdIF | undefined;
        var s : StackScreenIF|undefined;
        switch (object.glyph) {
            case Glyph.Potion:
                cmd = new HealCmd(object.level + 4, me, game);
                break;
            case Glyph.Scroll:
                cmd = new TeleportCmd(6, me, game);
                break;
            case Glyph.Wand:
                cmd = new BulletCmd(game.player, game, this.stack,this.maker);
                s = new CmdDirScreen(cmd, game, this.maker);
                break;
            default:
                return null;
        }
        cmd.setCost(new ChargedItemCost(game, this.object, this.index));
        return s ? s : cmd;
    }
}
