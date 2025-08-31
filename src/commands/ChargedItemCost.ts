import { GameIF } from "model/GameIF";
import { CostIF } from "./CostIF";
import { Object } from "model/Object";

export class ChargedItemCost implements CostIF {
    constructor(public game: GameIF, public obj: Object, public objIndex: number) {}

    pay(): boolean {
        let o = this.obj;
        if (o.charges <= 0) {
            this.game.message(`You use ${this.obj.name()}`);
        } else {
            --o.charges;
            if (o.charges > 0) {
                return true;
            }
            this.game.message(`${this.obj.name()} used up`);
        }
        this.game.bag!.removeIndex(this.objIndex);
        return true;
    }
}
