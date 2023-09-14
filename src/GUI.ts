import { app, BrowserWindow } from 'electron';
import { join } from 'path';

export class GUI {
    constructor() { }

    async openGUI() {
        if (app.isReady())
            this.createWindow();
        await app.whenReady();
        this.createWindow();
    }

    createWindow() {
        // Create the browser window without top menu.
        const win = new BrowserWindow({
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

        win.loadFile(join(process.cwd(), 'public', 'index.html'));
    }
}