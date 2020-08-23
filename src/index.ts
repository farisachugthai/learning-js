#!/usr/bin/env node
import '*' as fs from 'fs';
let repl = require('repl')
let readline = require('readline')
// let path = require('path')
let process = require('process')
let vm = require('vm')

let term = console.Console(process.stdout)

// https://nodejs.org/api/repl.html#repl_recoverable_errors
// As a user is typing input into the REPL prompt, pressing the <enter> key
// will send the current line of input to the eval function. In order to support
// multi-line input, the eval function can return an instance of repl.Recoverable
// to the provided callback function:
function myEval(cmd, context, filename, callback) {
  let result;
  try {
    result = vm.runInThisContext(cmd);
  } catch (e) {
    if (isRecoverableError(e)) {
      return callback(new repl.Recoverable(e));
    }
  }
  callback(null, result);
}

/*
 * How does jsdoc work?
 */
function isRecoverableError(error) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message);
  }
  return false;
}


// Add some listeners
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});

// The 'warning' event is emitted whenever Node.js emits a process warning.

// A process warning is similar to an error in that it describes
// exceptional conditions that are being brought to the user's attention.
// However, warnings are not part of the normal Node.js and JavaScript
// error handling flow. Node.js can emit warnings whenever it detects bad
// coding practices that could lead to sub-optimal application
// performance, bugs, or security vulnerabilities.

process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});

// A common use case for readline is to consume an input file one line at
// a time. The easiest way to do so is leveraging the fs.ReadStream API as
// well as a for await...of loop
//
async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
  }
}
