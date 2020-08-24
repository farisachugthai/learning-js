let assert = require("assert");
import { Calculator, test } from "../src/Calculator";

let c = new Calculator();
test(c, "1+2*33/11="); // prints 9

assert.assertTrue(test(c, "1+2*33/11="), 9)