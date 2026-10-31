/**
 * Keeps hyphenated words whole ("Multi-Angle", "First-Person"), so a title
 * wraps between words instead of after a hyphen. CSS has no switch for
 * that; a non-breaking hyphen in the data would carry into page titles and
 * search, so only the rendered title changes.
 *
 *   <h1>{keepHyphenated(title)}</h1>
 */
export const keepHyphenated = (text) =>
  // split keeps each captured word at an odd index
  text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
