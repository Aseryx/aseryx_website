import Card from '../common/Card.jsx';

// Illustrative checks for the certificate moment: sample values, not a real run.
const CERTIFICATE_CHECKS = [
  { name: 'Structure', value: '100%' },
  { name: 'Completeness', value: '96.4%' },
  { name: 'Validity', value: '99.1%' },
  { name: 'Uniqueness', value: '100%' },
];

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * A value whose digits roll up into place when the appraisal step plays
 * (.m-roll in index.css). At rest each column already shows its digit, so
 * the server render and reduced motion read the final value; screen readers
 * get the plain value, not the columns.
 */
const RollingValue = ({ value }) => (
  <span className="font-mono text-body-sm tabular-nums text-ink-secondary">
    <span className="sr-only">{value}</span>
    <span className="inline-flex h-[1.25em] overflow-hidden leading-[1.25em]" aria-hidden="true">
      {[...value].map((char, j) =>
        /\d/.test(char) ? (
          <span key={j} className="m-roll flex flex-col" style={{ '--j': j, transform: `translateY(${-1.25 * Number(char)}em)` }}>
            {DIGITS.map((digit) => (
              <span key={digit}>{digit}</span>
            ))}
          </span>
        ) : (
          <span key={j}>{char}</span>
        )
      )}
    </span>
  </span>
);

const PassBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-success-border bg-success-bg px-2 py-0.5 text-meta text-success-ink">
    <span className="h-1.5 w-1.5 rounded-full bg-success-dot" aria-hidden="true" />
    Pass
  </span>
);

/** Coded product moment: a dataset's appraisal, as teams see it up front. */
const CertificateMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="Appraisal preview">
    <div className="flex items-start justify-between gap-4 border-b border-border-light px-5 py-4">
      <div>
        <p className="text-meta text-ink-muted">Appraisal</p>
        <p className="mt-1 text-heading-lg text-ink">orders_2024</p>
      </div>
      <span className="rounded-md bg-muted px-2 py-1 font-mono text-table-head uppercase text-ink-secondary">Sample</span>
    </div>
    <dl className="grid grid-cols-3 border-b border-border-light text-body-sm">
      {[
        ['Tables', '4'],
        ['Fields', '38'],
        ['Rows', '48,210'],
      ].map(([label, value], i) => (
        <div key={label} className={`flex flex-col px-5 py-3 ${i ? 'border-l border-border-light' : ''}`}>
          <dt className="text-ink-muted">{label}</dt>
          <dd className="order-first font-mono text-body tabular-nums text-ink">{value}</dd>
        </div>
      ))}
    </dl>
    <ul className="px-5 py-2">
      {CERTIFICATE_CHECKS.map((check, i) => (
        <li key={check.name} className="flex items-center gap-3 border-b border-border-light py-3 last:border-0">
          <span className="text-body text-ink">{check.name}</span>
          {/* m-check: in How it works the result comes in check by check */}
          <span className="m-check ml-auto flex items-center gap-3" style={{ '--i': i }}>
            <RollingValue value={check.value} />
            <PassBadge />
          </span>
        </li>
      ))}
    </ul>
    <p className="bg-secondary px-5 py-3 font-mono text-table-head uppercase text-ink-muted">
      Checked Oct 26, 2026
    </p>
  </Card>
);

export default CertificateMoment;
