import { DMapIF } from "model/DMapIF";
import { WPoint } from "model/WPoint";
import { BresenhamIter } from "./BresenhamIter";
import { MapCell } from "model/MapCell";
import { Mob } from "model/Mob";

export class CanSee {
    public static canSee(a: WPoint, b: WPoint, map: DMapIF, onlyEnvironment: boolean): boolean {
        let iter: BresenhamIter = BresenhamIter.BresenhamIter1(a, b);

        for (; !iter.done();) {
            let p: WPoint = iter.next();
            let c: MapCell = map.cell(p);
            if (c.opaque()) {
                return false;
            }
        }
        return true;
    }

    public static canSee2(a: Mob, b: Mob, map: DMapIF, onlyEnvironment: boolean): boolean {
        return this.canSee(a.pos, b.pos, map, onlyEnvironment);
    }
}
