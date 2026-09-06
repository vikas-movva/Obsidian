// Templater user script — creates a paper-note from a PDF in the Papers/PDFs folder.
// Call via Templates/New Paper Note.md: <%* await tp.user.new_paper_note(tp) %>
module.exports = async (tp) => {
  const papersDir = "Computer Science/Papers";
  const pdfsDir   = `${papersDir}/PDFs`;
  const notesDir  = `${papersDir}/Notes`;
  const { app } = tp;

  const pdfs = app.vault.getFiles().filter(f =>
    f.path.startsWith(pdfsDir + "/") &&
    f.path.endsWith(".pdf")
  );

  let chosen;
  if (pdfs.length === 1) chosen = pdfs[0];
  else if (pdfs.length === 0) { new Notice("No PDFs found in " + pdfsDir); return; }
  else {
    const labels = pdfs.map(f => f.basename);
    const pick = await tp.system.prompt(
      "Multiple PDFs found. Type the exact filename (no extension):\n\n" + labels.map((l,i)=>`  ${i+1}. ${l}`).join("\n"),
      labels[0]
    );
    chosen = pdfs.find(f => f.basename === pick) || pdfs[0];
  }

  // auto-extract authors from first page (pdfjs bundled with Obsidian)
  const extractAuthors = async file => {
    try {
      const buf = await app.vault.readBinary(file);
      const pdfjs = window.pdfjsLib || window.PDFViewerApplication?.pdfjsLib || null;
      if (!pdfjs) return null;
      const doc = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
      const page = await doc.getPage(1);
      const { items } = await page.getTextContent();
      // group pdfjs fragments into lines by y (transform[5])
      const rows = new Map();
      for (const it of items) {
        const s = (it.str || "").trim();
        if (!s) continue;
        const y = it.transform ? Math.round(it.transform[5]) : 0;
        const x = it.transform ? it.transform[4] : 0;
        if (!rows.has(y)) rows.set(y, []);
        rows.get(y).push({ s, x });
      }
      let lines = [...rows.entries()].sort((a,b) => b[0]-a[0]).map(([, arr]) =>
        arr.sort((a,b)=>a.x-b.x).map(o=>o.s).join(" ").trim()
      ).filter(Boolean);
      // fallback if grouping produced nothing (no transform) — use raw items
      if (lines.length < 2) lines = items.map(i => (i.str||"").trim()).filter(Boolean);
      const idx = lines.findIndex(l => /^abstract/i.test(l));
      const slice = idx > 0 ? lines.slice(0, idx) : lines.slice(0, 10);
      const cand = slice.filter(l =>
        !/arxiv|cs\.CL|University|School|Department|Institute|Informatics|@/i.test(l) &&
        l.length > 5 && l.length < 160
      );
      // authors MUST contain " and " or "," plus a Name — never fall back to bare Name or we pick the title
      let line = cand.find(l => / and |,/.test(l) && /[A-Z][a-z]+ [A-Z][a-z]+/.test(l)) || null;
      // secondary: try regex on joined text in case authors were split across two y-groups
      if (!line) {
        const joined = cand.join(" \n ");
        const m = joined.match(/([A-Z][a-z]+ [A-Z][a-z]+(?:, [A-Z][a-z]+ [A-Z][a-z]+)*(?:\s+and\s+[A-Z][a-z]+ [A-Z][a-z]+)+)/);
        if (m) line = m[1];
      }
      if (!line || !line.includes(" ")) return null;
      return line.replace(/\s+/g, " ").trim();
    } catch { return null; }
  };

  const titleGuess = chosen.basename.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  const autoAuthors = await extractAuthors(chosen);

  const title   = await tp.system.prompt("Paper title:", titleGuess);
  const authors = await tp.system.prompt("Authors:", autoAuthors || "");
  const year    = await tp.system.prompt("Year:", String(new Date().getFullYear()));
  const topic   = await tp.system.prompt("Topic:", "");
  const status  = await tp.system.suggester(["to-read","reading","done"], ["to-read","reading","done"], false, "Status:");

  const noteName = title || titleGuess;
  const notePath = `${notesDir}/${noteName}.md`;
  if (app.vault.getAbstractFileByPath(notePath)) { new Notice(`Note already exists: ${notePath}`); return; }

  const needsQuotes = v => typeof v === "string" && /[:#&*?|<>=!%@`\[\]{},]/.test(v);
  const fm = (k,v) => !v ? `${k}: ` : `${k}: ${needsQuotes(v) ? `"${String(v).replace(/"/g,'\\"')}"` : v}`;

  const fmLines = [
    "---",
    fm("title", title),
    fm("authors", authors),
    fm("year", year),
    fm("topic", topic),
    fm("status", status),
    `paper: "[[${chosen.name}]]"`,
    "tags: [paper]",
    "---",
  ];

  await app.vault.create(notePath, `${fmLines.join("\n")}\n## Notes\n\n### Summary\n\n## Key Takeaways\n`);
  new Notice(`Created: ${notePath}`);
};
