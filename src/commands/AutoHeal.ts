import { GameIF } from "model/GameIF";
import { Mob } from "model/Mob";
import { HealthAdj } from "./HealthAdj";
import { Buff } from "model/Buff";

export class AutoHeal {
    amountToHealMin: number = 1;
    timeToHealMax: number = 6;
    nextWait: number = 0;
    amount: number = 0;
    countdown: number=0;
    constructor() {
        this.resetHeal();
    }
    resetHeal() {
        this.nextWait = this.timeToHealMax;
        this.countdown = this.nextWait;
        this.amount = this.amountToHealMin;
    }

    public static combatReset(mob: Mob, game: GameIF) {
        this.clearSleep(mob, game);
       let autoHeal = game.autoHeal;
        if (mob.isPlayer && autoHeal) {
            autoHeal.resetHeal();
        }
    }
    static clearSleep(mob: Mob, game: GameIF) {
        if (!mob.is(Buff.Sleep)) {
            return;
        }
        mob.buffs.cleanse(Buff.Sleep, game, mob);
        if (mob.isPlayer){
            game.message(`Player wakes up!`);
        }
    }

    public static combatResets(a: Mob, b: Mob|null, game: GameIF) {
        this.combatReset(a, game);
        if (b) {
            AutoHeal.combatReset(b, game);
        }
    }

    turn(player: Mob, game: GameIF) {
        if(this.atFullHealth(player)) {
            return;
        }
        this.step_timeToHeal(player, game);
    }
    step_timeToHeal(mob: Mob, game: GameIF) {
       this.countdown > 0
        ? --this.countdown
        : this.healTick(mob, game);
    }
    healTick(mob: Mob, game: GameIF) {
        game.message(
        `${mob.name} feels ${this.amount} better after ${this.nextWait}`
        );

        HealthAdj.heal(mob, this.amount);
        ++this.amount;

        if (this.nextWait > 1) {
            --this.nextWait;
        }
        this.countdown = this.nextWait;
    }
    atFullHealth(mob: Mob) {
        return (mob.hp >= mob.maxHp);
    }
}
