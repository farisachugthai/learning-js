import { ZipCodeValidator } from "../../src/string_validation/ZipCodeValidator.js";

// Heres an interesting import that works
// Actually doesnt work that module is es6
// const assert = require('assert').strict;

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validator = new ZipCodeValidator();

// Show whether each string passed each validator
strings.forEach((s) => {
  console.log(
    `"${s}" - ${validator.isAcceptable(s) ? "matches" : "does not match"}`
  );
});
