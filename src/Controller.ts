import { GUI } from "./GUI";
import { OSCMorse } from "./OSCM";

export class Controller {
    constructor(gui: GUI, osc: OSCMorse) {
        console.log("Controller created");
        console.log(process.env, process.argv)

        if (!process.argv.includes("--nogui") && process.env.ENABLE_GUI == "true")
            gui.openGUI();
    }
}