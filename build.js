const fs = require('fs');
const path = require('path');

const root = __dirname;
const contentDir = path.join(root, 'content');

function markdownToHtml(markdown) {
  let counterIndex = 0;
  return markdown.trim().split(/\n\s*\n/).map((block) => {
    const text = block.trim();
    const counter = text.match(/^\{\{word-counter(?::(.+))?\}\}$/);
    if (counter) {
      counterIndex += 1;
      const id = `response-${counterIndex}`;
      const label = counter[1] || 'Your response';
      return `<label for="${id}">${label}</label><textarea id="${id}" data-word-counter placeholder="Begin writing here…"></textarea><p class="counter" aria-live="polite"><span data-count>0</span> words</p>`;
    }
    const heading = text.match(/^(#{1,6})\s+(.+)$/);
    if (heading) return `<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`;
    if (text.split('\n').every((line) => /^[-*+]\s+/.test(line))) {
      const items = text.split('\n').map((line) => `<li>${inlineMarkdown(line.replace(/^[-*+]\s+/, ''))}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    return `<p class="prompt">${inlineMarkdown(text.replace(/\n/g, ' '))}</p>`;
  }).join('\n');
}

function inlineMarkdown(text) {
  return text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>');
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
