"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OSCM_1 = require("./src/OSCM");
const GUI_1 = require("./src/GUI");
const Controller_1 = require("./src/Controller");
require('dotenv').config();
new Controller_1.Controller(new GUI_1.GUI(), new OSCM_1.OSCMorse());
//# sourceMappingURL=main.js.map