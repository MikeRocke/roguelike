import { Spell } from "commands/Spell";
import { Glyph } from "./Glyph";
import { Slot } from "./Slot";

export class Object {
    level: number = 0;
    charges: number = 0;
    constructor(public glyph: Glyph, public slot: Slot, public spell: Spell = Spell.None) {}

    description(): string {
        let label = this.name();
        return `${label}${this.level}`;
    }

    name(): string {
        return Glyph[this.glyph];
    }
}
