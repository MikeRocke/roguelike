import { GameIF } from "model/GameIF";
import { CostIF } from "./CostIF";
import { Object } from "model/Object";

export class ItemCost implements CostIF {
    constructor(public game: GameIF, public obj: Object, public objIndex: number) {}

    pay(): boolean {
        this.game.message(`you use ${this.obj.name()}`);
        this.game.bag!.removeIndex(this.objIndex);
        return true;
    }

}
