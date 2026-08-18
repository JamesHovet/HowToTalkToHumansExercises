const fs = require('fs');
const path = require('path');

const root = __dirname;
const contentDir = path.join(root, 'content');

function markdownToHtml(markdown) {
  return markdown.trim().split(/\n\s*\n/).map((block) => {
    const text = block.trim();
    const counter = text.match(/^\{\{word-counter(?::(.+))?\}\}$/);
    if (counter) {
      const label = counter[1] || 'Your response';
      return `<label for="response">${label}</label><textarea id="response" data-word-counter placeholder="Begin writing here…"></textarea><p class="counter" aria-live="polite"><span data-count>0</span> words</p>`;
    }
    if (text.startsWith('# ')) return `<h1>${text.slice(2)}</h1>`;
    return `<p class="prompt">${text.replace(/\n/g, ' ')}</p>`;
  }).join('\n');
}

function page(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} · Communication Exercises</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main class="shell">
    ${body}
  </main>
  <script src="script.js"></script>
</body>
</html>
`;
}

fs.readdirSync(contentDir).filter((file) => file.endsWith('.md')).forEach((file) => {
  const name = path.basename(file, '.md');
  const title = name.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  const html = page(title, markdownToHtml(fs.readFileSync(path.join(contentDir, file), 'utf8')));
  fs.writeFileSync(path.join(root, `${name}.html`), html);
});

console.log('Built exercise pages from Markdown.');
