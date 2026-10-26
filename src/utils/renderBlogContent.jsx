/** Lightweight markdown renderer for blog posts (headings, lists, bold, links) */

function renderInline(text) {
  const parts = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);

    const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : -1;
    const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : -1;

    let next = -1;
    let kind = null;

    if (linkIdx !== -1 && (boldIdx === -1 || linkIdx <= boldIdx)) {
      next = linkIdx;
      kind = 'link';
    } else if (boldIdx !== -1) {
      next = boldIdx;
      kind = 'bold';
    }

    if (next > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, next)}</span>);
      remaining = remaining.slice(next);
    }

    if (kind === 'link' && linkMatch) {
      parts.push(
        <a
          key={key++}
          href={linkMatch[2]}
          className="text-brand-orange hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkMatch[1]}
        </a>,
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    if (kind === 'bold' && boldMatch) {
      parts.push(
        <strong key={key++} className="font-medium text-ink">
          {boldMatch[1]}
        </strong>,
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return parts;
}

export function renderBlogContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={i}
          className="font-display text-2xl md:text-3xl leading-tight tracking-tight mt-12 mb-6 text-ink"
        >
          {line.slice(3)}
        </h2>,
      );
      i++;
      continue;
    }

    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="space-y-3 my-6 ml-4">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="text-ink text-base md:text-lg leading-relaxed pl-4 border-l-2 border-brand-orange/30"
            >
              {renderInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    elements.push(
      <p key={i} className="text-ink text-base md:text-lg leading-relaxed mb-6">
        {renderInline(line)}
      </p>,
    );
    i++;
  }

  return elements;
}