/** A dataset's tags or keywords as small chips; `label` names the list. */
const TagList = ({ tags, label, className = '' }) => (
  <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label={label}>
    {tags.map((tag) => (
      <li key={tag} className="rounded-md bg-muted px-2 py-1 text-meta text-ink-secondary">
        {tag}
      </li>
    ))}
  </ul>
);

export default TagList;
