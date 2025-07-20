import { MapCell } from "./MapCell";
import { WPoint } from "./WPoint";

export interface DMapIF {
    dim: WPoint;
    cell(p: WPoint): MapCell;
    legal(p: WPoint): boolean;
    level: number;
}
