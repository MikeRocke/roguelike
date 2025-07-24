import { CmdBase } from "./CmdBase";

export class WaitCmd extends CmdBase {
    exec(): boolean {
        console.log("Wait..");
        return true;
    }
}
