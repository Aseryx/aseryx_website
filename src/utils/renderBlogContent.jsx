import { NEW_TAB } from './links.js';

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
          className="text-ink underline decoration-brand underline-offset-4 hover:text-ink-secondary"
          {...NEW_TAB}
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

// Running text keeps to about 70 characters a line; the post's title and
// headings may run wider in the same column.
const MEASURE = 'max-w-[38rem]';

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
          className="mt-12 mb-5 text-page-title font-semibold text-ink"
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
        <ul key={`ul-${i}`} className={`my-6 space-y-3 ${MEASURE}`}>
          {items.map((item, idx) => (
            <li
              key={idx}
              className="border-l-2 border-brand-tint-border pl-4 text-prose text-ink"
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
      <p key={i} className={`mb-6 text-prose text-ink ${MEASURE}`}>
        {renderInline(line)}
      </p>,
    );
    i++;
  }

  return elements;
}