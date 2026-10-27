// Three owner promises, each with one supporting line, drafted from the
// approved Oct 21 line and Option E in Notion > Aseryx Messaging. Sits on the
// hero's bottom edge as its base, so the hero reads as one composed block.
const PROOF = [
  { label: "Checked before it's shared", line: "Aseryx checks your dataset's quality and gives teams a result they can review up front." },
  { label: 'You approve every sample', line: 'Teams start with a small free sample. Nothing is shared until you approve.' },
  { label: 'You set the price', line: 'You keep at least 80%, and you can license your dataset anywhere else too.' },
];

const ProofStrip = () => (
  <div className="relative z-10 border-t border-border bg-page px-6 lg:px-10">
    <dl className="mx-auto grid max-w-7xl gap-6 py-8 md:grid-cols-3 md:gap-0 md:py-10">
      {PROOF.map((item, i) => (
        <div key={item.label} className={`md:px-8 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-border'}`}>
          <dt className="text-heading-lg text-ink">{item.label}</dt>
          <dd className="mt-1.5 text-body text-ink-secondary">{item.line}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default ProofStrip;
