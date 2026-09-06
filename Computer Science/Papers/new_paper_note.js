// Templater user script — creates a paper-note from a PDF in the Papers folder.
// Usage: in Obsidian, run command "Templater: Open Insert Template Modal" and pick
// "New Paper Note" (Templates/New Paper Note.md calls this).

module.exports = async (tp) => {
  const papersDir = "Computer Science/Papers";
  const notesDir  = `${papersDir}/Notes`;
  const { app } = tp;

  const pdfs = app.vault.getFiles().filter(f =>
    f.path.startsWith(papersDir + "/") &&
    f.path.endsWith(".pdf") &&
    !f.path.includes("/Notes/") &&
    !f.path.includes("/.trash/")
  );

  let chosen;
  if (pdfs.length === 1) {
    chosen = pdfs[0];
  } else if (pdfs.length === 0) {
    new Notice("No PDFs found in " + papersDir);
    return;
  } else {
    const labels = pdfs.map(f => f.basename);
    const pick = await tp.system.prompt(
      "Multiple PDFs found. Type the exact filename (no extension):\n\n" +
      labels.map((l, i) => `  ${i + 1}. ${l}`).join("\n"),
      labels[0]
    );
    chosen = pdfs.find(f => f.basename === pick) || pdfs[0];
  }

  const pdfBasename = chosen.basename;
  const titleGuess = pdfBasename.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

  const title   = await tp.system.prompt("Paper title:", titleGuess);
  const authors = await tp.system.prompt("Authors (e.g. Vaswani et al.):", "");
  const year    = await tp.system.prompt("Year:", String(new Date().getFullYear()));
  const topic   = await tp.system.prompt("Topic (free text — used for grouping in the base):", "");
  const status  = await tp.system.suggester(["to-read", "reading", "done"], ["to-read", "reading", "done"], false, "Status:");

  const noteName = title || titleGuess;
  const notePath = `${notesDir}/${noteName}.md`;

  if (app.vault.getAbstractFileByPath(notePath)) {
    new Notice(`Note already exists: ${notePath}`);
    return;
  }

  const yamlNeedsQuotes = (v) => typeof v === "string" && /[:#&*?|<>=!%@`\[\]{},]/.test(v);
  const fm = (key, val) =>
    val === undefined || val === null || val === ""
      ? `${key}: `
      : `${key}: ${yamlNeedsQuotes(val) ? `"${String(val).replace(/"/g, '\\"')}"` : val}`;

  const paperFm = `paper: "[[${chosen.name}]]"`;

  const fmLines = [
    "---",
    fm("title",   title),
    fm("authors", authors),
    fm("year",    year),
    fm("topic",   topic),
    fm("status",  status),
    paperFm,
    "tags: [paper]",
    "---",
  ];

  const body = `${fmLines.join("\n")}

## Notes

### Summary

## Key Takeaways
`;

  await app.vault.create(notePath, body);
  new Notice(`Created: ${notePath}`);
};
