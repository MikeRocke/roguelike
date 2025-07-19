import { StackScreenIF } from "./StackScreenIF";

export interface StackIF {
    pop(): void;
    push(screen: StackScreenIF): void;
    current(): StackScreenIF;
}
