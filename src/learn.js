#!/usr/bin/env node

const fs = require('fs')
let repl = require('repl')
const readline = require('readline')
// let path = require('path')
let process = require('process')
let vm = require('vm')
const os = require('os');

let term = console.Console(process.stdout)

// Similar to import builtins
const builtins = require('module').builtinModules;

// https://nodejs.org/dist/latest-v12.x/docs/api/readline.html#readline_readline_createinterface_options
// The readline.createInterface() method creates a new readline.Interface instance.
// Example of template string.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  historySize: 10000,
  terminal: true,
  prompt: `${process.cwd()}: >`,
  removeHistoryDuplicates: true,
});

rl.on('line', (line) => {
  console.log(`Received: ${line}`);
});

// https://nodejs.org/dist/latest-v12.x/docs/api/readline.html#readline_event_sigint
rl.on('SIGINT', () => {
  rl.question('Are you sure you want to exit? ', (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});


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
})

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
// @param {str} fileobj File to read
// todo: check it exists
async function processLineByLine(fileobj) {
  const fileStream = fs.createReadStream(fileobj);

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


// function read(f) {
//   return fs.readFileSync(f).toString();
// }

/*
 * @param {str} path File path
 */
function include(path) {
  let code = fs.readFileSync(path, 'utf-8');
  vm.runInThisContext(code, path);
}


// The 'reset' event is emitted when the REPL's context is reset. This
// occurs whenever the .clear command is received as input unless the REPL
// is using the default evaluator and the repl.REPLServer instance was
// created with the useGlobal option set to true. The listener callback will
// be called with a reference to the context object as the only argument.

// This can be used primarily to re-initialize REPL context to some pre-defined state:
function initializeContext(context) {
  context.m = 'test';
}

// const r = repl.start({prompt: '> '});
// initializeContext(r.context);

// called with .clear
// r.on('reset', initializeContext);
