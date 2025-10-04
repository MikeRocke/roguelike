import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { Glyph } from "model/Glyph";
import { Rnd } from "model/Rnd";
import { WPoint } from "model/WPoint";

export interface BuildIF {
    makeGame(): GameIF;
    makeLevel(rnd: Rnd, level: number): DMapIF;
    makeMap(rnd: Rnd, level: number): DMapIF;
    makePlayer(): Mob;
    makeAI(): MobAiIF | null;
    addNPC(g: Glyph, x: number, y: number, map: DMapIF, level: number): Mob;
    addMapLevel_Mob(p: WPoint, map: DMapIF, rnd: Rnd): Mob;
    makeDragonLevels(rnd: Rnd, level: number, dragonLevel: number): DMapIF;
}
