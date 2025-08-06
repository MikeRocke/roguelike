import { Object } from "./Object";

export class  Bag {
    objects:Object[] = [];

    len(): number {
        return this.objects.length;
    }
    add(o: Object) {
        this.objects.push(o);
    }
    removeIndex(index: number) {
        this.objects.splice(index,1);
    }
}
