import { Spell } from "commands/Spell";
import { Glyph } from "./Glyph";
import { Slot } from "./Slot";
import { Colours } from "build/Colours";

export class Object {
    level: number = 0;
    charges: number = 0;
    constructor(public glyph: Glyph, public slot: Slot, public spell: Spell = Spell.None) {}

    description(): string {
        let label = this.name();
        if (this.spell != Spell.None) {
            let quality = Colours.colours[this.spell][1];
            return `${quality} ${label}`
        }
        return `${label}${this.level}`;
    }

    name(): string {
        return Glyph[this.glyph];
    }
}
