// The three locked proof labels, each with one supporting line. Sits on the
// hero's bottom edge as its base, so the hero reads as one composed block.
const PROOF = [
  { label: 'On your machine', line: 'Connect, lock and appraise where the database already is.' },
  { label: 'Quality certificate', line: 'Structure, completeness, distinctiveness, balance. Not the price.' },
  { label: 'Dataset you can license', line: 'Timed access to the locked dataset. When the time ends, access ends.' },
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
