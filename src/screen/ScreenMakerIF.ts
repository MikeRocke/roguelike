import { GameIF } from "model/GameIF";
import { StackScreenIF } from "./stack/StackScreenIF";

export interface ScreenMakerIF {
    newGame(): StackScreenIF;
    gameOver(game: GameIF|undefined): StackScreenIF;
    more(game: GameIF|null): StackScreenIF;
}
