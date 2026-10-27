// Three owner promises, each with an optional supporting line, from the page's copy
// set (src/content/homeCopy.js). Sits on the hero's bottom edge as its base,
// so the hero reads as one composed block.
const ProofStrip = ({ items }) => (
  <div className="relative z-10 border-t border-border bg-page px-6 lg:px-10">
    <ul className="mx-auto grid max-w-7xl gap-6 py-8 md:grid-cols-3 md:gap-0 md:py-10">
      {items.map((item, i) => (
        <li key={item.label} className={`md:px-8 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-border'}`}>
          <p className="text-heading-lg text-ink">{item.label}</p>
          {item.line && <p className="mt-1.5 text-body text-ink-secondary [text-wrap:pretty]">{item.line}</p>}
        </li>
      ))}
    </ul>
  </div>
);

export default ProofStrip;
