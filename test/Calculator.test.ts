// let assert = require("assert");
import * as assert from "assert";
import { Calculator, test } from "../src/Calculator.js";

let c = new Calculator();
test(c, "1+2*33/11="); // prints 9

// only prints 9 doesn't return the value
// assert.equal(test(c, "1+2*33/11="), 9)