// From the node docs
// https://nodejs.org/dist/latest-v15.x/docs/api/child_process.html
// Admittedly though this isn't where I got the format for imports from
// That came from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import * as child_process from "child_process";

const ls = child_process.spawn('ls', ['-lh', '--color=always', '.']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
