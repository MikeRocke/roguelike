import { Spell } from "commands/Spell";
import { DMapIF } from "model/DMapIF";
import { Glyph } from "model/Glyph";
import { Object } from "model/Object";
import { Rnd } from "model/Rnd";
import { Slot } from "model/Slot";
import { WPoint } from "model/WPoint";

export interface ObjectTypeIF {
    glyph: Glyph;
    slot: Slot;
}

export class ObjectTypes {
    static objectTypes: ObjectTypeIF[] = [
        { glyph: Glyph.Dagger, slot: Slot.MainHand },
        { glyph: Glyph.Shield, slot: Slot.OffHand },
        { glyph: Glyph.Cap, slot: Slot.Head },
        { glyph: Glyph.Gloves, slot: Slot.Hands },
        { glyph: Glyph.Cape, slot: Slot.Back },
        { glyph: Glyph.Leggings, slot: Slot.Legs },
        { glyph: Glyph.Boots, slot: Slot.Feet },
        { glyph: Glyph.Potion, slot: Slot.NotWorn },
        { glyph: Glyph.Scroll, slot: Slot.NotWorn }
    ];

    static indexForGlyph(glyph: Glyph): number {
        return this.objectTypes.findIndex(type => type.glyph == glyph);
    }

    static addObjectTypeToMap(point: WPoint, map: DMapIF, rnd: Rnd, objectType: Glyph, level: number): Object {
        let index = this.indexForGlyph(objectType);
        let template = ObjectTypes.getTemplate(index);
        let object = this.makeTemplateObject(level, rnd, template);
        map.addObject(object, point);
        return object;
    }
    static makeTemplateObject(level: number, rnd: Rnd, template: ObjectTypeIF): Object {
        let objectLevel = rnd.spiceUpLevel(level);
        let object = new Object(template.glyph, template.slot);
        object.level = objectLevel;
        if (object.glyph == Glyph.Wand) {
            object.charges = rnd.rnd(1, objectLevel);
        }
        switch (object.glyph) {
            case Glyph.Potion:
            case Glyph.Scroll:
            case Glyph.Wand:
                this.setItemSpell(object, rnd);
        }
        return object;
    }
    static getTemplate(index: number): ObjectTypeIF {
        let len = ObjectTypes.objectTypes.length;
        if (index < 0 || index >= len) {
            throw `bad index: ${index}`
        }
        return ObjectTypes.objectTypes[index];
    }
    static randomLevelObject(level: number, random: Rnd): Object {
        let index = random.rnd(ObjectTypes.objectTypes.length);
        let template = ObjectTypes.getTemplate(index);
        return this.makeTemplateObject(level, random, template);
    }
    static addRandomObjectForLevel(p: WPoint, map: DMapIF, rnd: Rnd, level: number): Object {
        let object = this.randomLevelObject(level, rnd);
        map.addObject(object, p);
        return object;
    }

    static setItemSpell(object: Object, rnd: Rnd) {
        let level = rnd.spiceUpLevel(object.level);
        object.spell = this.spellForLevel(level);
    }

    static MaxSpell: number = Spell.None;
    static spellForLevel(level: number): Spell {
        let spell: Spell = level % this.MaxSpell;
        return spell;
    }


}
