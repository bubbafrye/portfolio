export type ContentRow = {
  div: string;
  header: string;
  body: string;
  img1: string;
  img2: string;
};

/** Parse RFC-style CSV (quoted fields, commas). */
export function parseContentCsv(raw: string): ContentRow[] {
  const rows: ContentRow[] = [];
  let i = 0;
  const len = raw.length;

  const readField = (): string => {
    if (i >= len) return "";
    if (raw[i] === '"') {
      i += 1;
      let value = "";
      while (i < len) {
        if (raw[i] === '"') {
          if (raw[i + 1] === '"') {
            value += '"';
            i += 2;
            continue;
          }
          i += 1;
          break;
        }
        value += raw[i];
        i += 1;
      }
      return value;
    }

    let value = "";
    while (i < len && raw[i] !== "," && raw[i] !== "\n" && raw[i] !== "\r") {
      value += raw[i];
      i += 1;
    }
    return value.trim();
  };

  const skipLine = () => {
    while (i < len && raw[i] !== "\n") i += 1;
    if (raw[i] === "\n") i += 1;
    if (raw[i] === "\r") i += 1;
  };

  // header
  if (i < len) {
    readField();
    readField();
    readField();
    readField();
    readField();
    skipLine();
  }

  while (i < len) {
    while (i < len && (raw[i] === "\n" || raw[i] === "\r")) i += 1;
    if (i >= len) break;

    const div = readField();
    if (raw[i] === ",") i += 1;
    const header = readField();
    if (raw[i] === ",") i += 1;
    const body = readField();
    if (raw[i] === ",") i += 1;
    const img1 = readField();
    if (raw[i] === ",") i += 1;
    const img2 = readField();

    if (!div.trim()) {
      skipLine();
      continue;
    }

    rows.push({
      div: div.trim().toLowerCase(),
      header: header.trim(),
      body: body.trim(),
      img1: img1.trim(),
      img2: img2.trim(),
    });

    skipLine();
  }

  return rows;
}

export function indexContentRows(rows: ContentRow[]): Map<string, ContentRow> {
  return new Map(rows.map((row) => [row.div, row]));
}

/** Rows whose `div` column starts with `{pageSlug}-` (e.g. pageSlug `a11y` → `a11y-overview`). */
export function pageRows(rows: ContentRow[], pageSlug: string): ContentRow[] {
  const prefix = `${pageSlug.toLowerCase()}-`;
  return rows.filter((row) => row.div.startsWith(prefix));
}

export function indexPageRows(rows: ContentRow[], pageSlug: string): Map<string, ContentRow> {
  return indexContentRows(pageRows(rows, pageSlug));
}

export function requireRow(map: Map<string, ContentRow>, key: string): ContentRow {
  const row = map.get(key.toLowerCase());
  if (!row) throw new Error(`Missing content row for div "${key}"`);
  return row;
}

/** Split body on blank lines; supports `**bold:** rest` inline emphasis per paragraph. */
export function bodyParagraphs(body: string): Array<string | { bold: string; text: string }> {
  return body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const match = /^\*\*(.+?)\*\*\s*(.*)$/s.exec(chunk);
      if (match) return { bold: `${match[1]}`, text: match[2] ? ` ${match[2]}` : "" };
      return chunk;
    });
}
