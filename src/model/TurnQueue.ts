import { Mob } from "./Mob";

export class TurnQueue {
    mobs: Mob[] = [];
    currentMob(): Mob {
        return this.mobs[0];
    }
    next():Mob {
        this.pushMob(this.popMob());
        return this.currentMob();
    }
    pushMob(mob: Mob) {
        this.mobs.push(mob);
    }
    popMob(): Mob {
        return <Mob>this.mobs.shift();
    }
    removeMob(m: Mob): boolean {
        let index = this.mobs.indexOf(m);
        if (index < 0) {
            return false;
        } else {
            this.mobs.splice(index, 1);
            return true;
        }
    }
    frontPushMob(m: Mob) {
        this.mobs.unshift(m);
    }
}
