import { TPoint } from "./TPoint";


export interface TermIF {
    dimension: TPoint;
    txt(x: number, y: number, s: string, fg: string, bg: string): void;
    at(x: number, y: number, s: string, fg: string, bg: string): void;
}
