const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const root = __dirname;
const contentDir = path.join(root, 'content');
let timer;

function build() {
  execFile(process.execPath, [path.join(root, 'build.js')], (error, stdout, stderr) => {
    if (error) {
      console.error(stderr || error.message);
      return;
    }
    process.stdout.write(stdout);
  });
}

function scheduleBuild() {
  clearTimeout(timer);
  timer = setTimeout(build, 150);
}

build();
fs.watch(contentDir, { recursive: true }, (event, filename) => {
  if (filename && filename.endsWith('.md')) scheduleBuild();
});

console.log('Watching content/ for Markdown changes. Press Ctrl+C to stop.');
