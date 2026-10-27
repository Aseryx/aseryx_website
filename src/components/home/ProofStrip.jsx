import Section from '../common/Section.jsx';

// The three locked proof labels, each with one supporting line.
const PROOF = [
  { label: 'On your machine', line: 'Connect, lock and appraise where the database already is.' },
  { label: 'Quality certificate', line: 'Structure, completeness, distinctiveness, balance. Not the price.' },
  { label: 'Dataset you can license', line: 'Timed access to the locked dataset. When the time ends, access ends.' },
];

const ProofStrip = () => (
  <Section tone="secondary" spacing="compact" grid={false} aria-label="What you get">
    <ul className="grid gap-8 md:grid-cols-3 md:gap-0">
      {PROOF.map((item, i) => (
        <li key={item.label} className={`md:px-8 ${i === 0 ? 'md:pl-0' : 'md:border-l md:border-border'}`}>
          <p className="flex items-center gap-2.5 text-heading-lg text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            {item.label}
          </p>
          <p className="mt-2 text-body text-ink-secondary">{item.line}</p>
        </li>
      ))}
    </ul>
  </Section>
);

export default ProofStrip;
