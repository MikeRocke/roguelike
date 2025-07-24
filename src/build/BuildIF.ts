import { MobAiIF } from "ai/MobAiIF";
import { DMapIF } from "model/DMapIF";
import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { Rnd } from "model/Rnd";

export interface BuildIF {
    makeGame(): GameIF;
    makeLevel(rnd: Rnd, level: number): DMapIF;
    makeMap(rnd: Rnd, level: number): DMapIF;
    makePlayer(): Mob;
    makeAI(): MobAiIF|null;
}
