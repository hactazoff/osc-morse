"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
class Controller {
    constructor(gui, osc) {
        console.log("Controller created");
        console.log(process.env, process.argv);
        if (!process.argv.includes("--nogui") && process.env.ENABLE_GUI == "true")
            gui.openGUI();
    }
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map