import { Object } from "./Object";
import { Slot } from "./Slot";

export class Worn {
    _objs: Map<Slot, Object> = new Map();

    add(o: Object) {
        this.legalObject(o);
        this._objs.set(o.slot, o);
    }

    remove(s: Slot) {
        this.legalSlot(s);
        this._objs.delete(s);
    }

    len(): number {
        return this._objs.size;
    }

    get(s: Slot): Object | undefined {
        return this._objs.get(s);
    }

    legalSlot(s: Slot) {
        if (!this.has(s)) {
            throw `slot ${s} not worn`;
        }
    }
    has(s: Slot) {
        return this._objs.has(s);
    }
    legalObject(o: Object) {
        let slot = o.slot;
        if (slot == Slot.NotWorn) {
            throw `slot NotWorn not valid for ${o.name()}`;
        }
        if (slot == undefined) {
            throw `no slow for ${o.name()}`;
        }
    }

    AC(): number {
        let ac: number = 0;
        for (let [, v] of this._objs) {
            ac += v.level;
        }
        return ac;
    }

    AC_reduce(): number {
        let ac = this.AC();
        let reduce = 1.0 / (ac * 0.1 + 1.0);
        return reduce;
    }
    public static weaponSlots: Slot[] = [Slot.BothHands, Slot.MainHand, Slot.OffHand];
    static isWeapon(o: Object) {
        return o.slot in Worn.weaponSlots;
    }

    weapon(): Object | undefined {
        for (var slot of Worn.weaponSlots) {
            if (this.has(slot)) {
                return this.get(slot);
            }
        }
        return undefined;
    }

    weaponDamage():number {
        let weapon = this.weapon();
        if (weapon) {
            return weapon.level + 1;
        } else {
            return 2;
        }
    }
}
