import { Glyph } from "./Glyph";
import { Mood } from "./Mood";
import { WPoint } from "./WPoint";

export class Mob {
    constructor(glyph: Glyph, x: number, y: number) {
        this.isPlayer = (glyph == Glyph.Player);
        this.glyph = glyph;
        this.name = Glyph[glyph];
        this.pos.x = x;
        this.pos.y = y;
    }

    isPlayer: boolean = false;
    glyph: Glyph = Glyph.Unknown;
    name: string = "";
    pos: WPoint = new WPoint();
    hp: number = 3;
    maxHp: number = 3;
    mood: Mood = Mood.Asleep;

    alive(): boolean {
        return this.hp > 0;
    }
}
