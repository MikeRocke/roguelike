import { TermIF } from "term/TermIF";
import { DMapIF } from "./DMapIF";
import { WPoint } from "./WPoint";
import { MapCell } from "./MapCell";
import { Glyph } from "./Glyph";
import { TPoint } from "term/TPoint";
import { GlyphInfo } from "./GlyphInfo";
import { GlyphMap } from "./GlyphMap";
import { GameIF } from "./GameIF";
import { CanSee } from "commands/CanSee";
import { ActiveBuffs } from "./ActiveBuffs";
import { Buff } from "./Buff";
import { BuffIF } from "./BuffIF";
import { Colours } from "build/Colours";
import { Spell } from "commands/Spell";

export class DrawMap {
    static drawMapPlayer(term: TermIF, map: DMapIF, playerPosition: WPoint, game: GameIF) {
        if (!playerPosition) {
            playerPosition = new WPoint();
        }
        let vp: WPoint = new WPoint(
            -Math.floor(term.dimension.x * 0.5) + playerPosition.x,
            -Math.floor(term.dimension.y * 0.5) + playerPosition.y
        );
        this.drawMap(term, map, vp, playerPosition, game);
    }

    static drawMap(term: TermIF, map: DMapIF, viewpoint: WPoint, playerPosition: WPoint, game: GameIF) {
        let buffs = game.player.buffs;
        let blind = buffs && buffs.is(Buff.Blind);
        let unlit: string = '#001';
        let farlit: string = '#124';
        let farDist: number = 50;
        let termDimension = term.dimension;
        let t = new TPoint();
        let w = new WPoint();
        var fg: string;
        var bg: string;
        for (t.y = 0, w.y = viewpoint.y; t.y < termDimension.y; ++t.y, ++w.y) {
            for (t.x = 0, w.x = viewpoint.x; t.x < termDimension.x; ++t.x, ++w.x) {
                let cell: MapCell;
                if (map.legal(w)) {
                    cell = map.cell(w);
                } else {
                    cell = this.outside;
                }
                let dist: number = w.squareDistance(playerPosition);
                let far: boolean = (dist > farDist) && !blind;
                if (cell.sprite) {
                    far = false;
                }
                let seeMob = !!cell.mob && !far && (!blind || cell.mob.isPlayer) && CanSee.canSee(cell.mob.pos, playerPosition, map, true);
                let glyph = (seeMob ? cell.mob!.glyph : cell.glyph());
                let i: GlyphInfo = GlyphMap.info(glyph);
                if (far) {
                    bg = unlit;
                    fg = (cell.lit ? farlit : unlit);
                } else {
                    bg = i.bg;
                    fg = i.fg;
                    if (cell.object && cell.object.spell != Spell.None) {
                        fg = Colours.colours[cell.object.spell][1];
                    }

                    if (!cell.lit) {
                        cell.lit = true;
                    }

                }
                term.at(t.x, t.y, i.c, fg, bg);
            }
        }
    }
    static renderBuffs(term: TermIF, buffs: ActiveBuffs, y: number):number {
        let bmap:Map<Buff, BuffIF> = buffs._map;
        let bg = '#502';
        let fg_danger = '#ff3300';
        for (let [buff, buffIF] of bmap) {
            let label: string = Buff[buff];
            let remain:string = this.remain(buffIF);
            let sbuff: string = `${remain} ${label}`;
            term.txt(0, y++, sbuff, fg_danger, bg);
        }
        let AFF = `AF#${bmap.size}`;
        term.txt(0, y++, AFF, 'yellow', bg);

        return y;
    }
    static remain(buffIF: BuffIF): string {
        return `${buffIF.time}`;
    }

    static renderMessage(term: TermIF, game: GameIF) {
        let log = game.log;
        if (!log) {
            return;
        }
        let line = log.top();
        let number = log.len();
        let s = (number > 1)
            ? `${line} (${number} more)`
            : line;

        s = this.extend(s, term);
        term.txt(0, 0, s, 'cyan', 'blue');
    }
    static extend(s: string, term: TermIF): string {
        let dim = term.dimension;
        if (!this.mask) {
            this.mask = ' '.repeat(dim.x);
        }
        return s + this.mask.substr(0, dim.x - s.length);
    }
    static mask: string = '';


    static renderStats(term: TermIF, game: GameIF) {
        let player = game.player;
        let hp = ` HP:${player.hp}`;
        let maxHp = `MHP:${player.maxHp}`;
        let level = `LVL:${game.dungeon.level}`;
        let y = 1;
        term.txt(0, y++, hp, "yellow", "teal");
        term.txt(0, y++, maxHp, "yellow", "teal");
        term.txt(0, y++, level, "yellow", "teal");
        let buffs: ActiveBuffs = player.buffs;
        y = this.renderBuffs(term, buffs, y);
    }

    static outside: MapCell = new MapCell(Glyph.Unknown);
}
