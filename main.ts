import { OSCMorse } from './src/OSCM';
import { GUI } from './src/GUI';
import { Controller } from './src/Controller';
require('dotenv').config();
new Controller(new GUI(), new OSCMorse());