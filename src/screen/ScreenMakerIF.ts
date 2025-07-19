import { StackScreenIF } from "./stack/StackScreenIF";

export interface ScreenMakerIF {
    newGame(): StackScreenIF;
    gameOver(): StackScreenIF;
}
