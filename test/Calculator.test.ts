// import * as assert from "assert";
// interesting note on imports.
// so i was running `yarn start` because apparently I learn nothing unless
// it's in a REPL.
// import Calculator from ./src/Calculator
// didn't work while in the root; however,
// import { Calculator } from ./src/Calculator
// did
import { Calculator, test } from "../src/Calculator.js";

let c = new Calculator();
test(c, "1+2*33/11="); // prints 9

// only prints 9 doesn't return the value
// also worth noting that assert.equal was deprecated.
// assert.equal(test(c, "1+2*33/11="), 9)

// however how do we call our instance?
// assert.strictEqual(c, 9)