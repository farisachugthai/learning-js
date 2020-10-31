// const os = require('os');
// const process = require('process');
// const repl = require('repl');
// const vm = require('vm');
import * as os from 'os';
import * as process from 'process';
import * as repl from 'repl';
import * as vm from 'vm';


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

function isRecoverableError(error) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message);
  }
  return false;
}

// os.userInfo() might return a username
const replServer = repl.start({
  prompt: `${os.userInfo()['username']}@${os.hostname()}: ${process.cwd()} $: `,
  input: process.stdin,
  output: process.stdout,
  // this actually fucks up the REPL horrifically
  // eval: myEval,
  ignoreUndefined: true,
  replMode: repl.REPL_MODE_STRICT,
  preview: true,
  useColors: true
});

replServer.defineCommand('sayhello', {
  help: 'Say hello',
  action(name) {
    this.clearBufferedCommand();
    console.log(`Hello, ${name}!`);
    this.displayPrompt();
  }
});

replServer.defineCommand('saybye', function saybye() {
  console.log('Goodbye!');
  this.close();
});
