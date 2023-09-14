"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GUI = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
class GUI {
    constructor() { }
    async openGUI() {
        if (electron_1.app.isReady())
            this.createWindow();
        await electron_1.app.whenReady();
        this.createWindow();
    }
    createWindow() {
        // Create the browser window without top menu.
        const win = new electron_1.BrowserWindow({
            width: 462,
            height: 1,
            x: 10,
            y: 10,
            resizable: true,
            maximizable: true,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true
            }
        });
        win.loadFile((0, path_1.join)(process.cwd(), 'public', 'index.html'));
    }
}
exports.GUI = GUI;
//# sourceMappingURL=GUI.js.map