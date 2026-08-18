# Communication Exercises

A no-dependency static site for three writing exercises, ready for GitHub Pages.

## Workflow

1. Edit `content/exercise-1.md`, `content/exercise-2.md`, or `content/exercise-3.md`.
2. Build the web pages:

   ```sh
   node build.js
   ```

3. Publish the generated `exercise-*.html` files with `styles.css` and `script.js`.

## Markdown fields

Add a word-counted text field by placing this marker on its own line:

```text
{{word-counter}}
```

The default label is `Your response`. Customize it with:

```text
{{word-counter:What are you thinking?}}
```

The generated field counts words live as the user types. `styles.css` controls the responsive layout and `script.js` powers the counter.
