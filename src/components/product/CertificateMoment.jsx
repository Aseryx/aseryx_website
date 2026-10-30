import Card from '../common/Card.jsx';
import { SAMPLE_LISTING } from '../../data/steps.js';

// Illustrative facts for the certificate moment: sample values, not a real run.
const CERTIFICATE_FACTS = [
  ['Documents', SAMPLE_LISTING.size],
  ['Duplicates', '0.4%'],
  ['Complete', '98.2%'],
];

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * A value whose digits roll up into place when the certificate step plays
 * (.m-roll in index.css). At rest each column already shows its digit, so
 * the server render and reduced motion read the final value; screen readers
 * get the plain value, not the columns.
 */
const RollingValue = ({ value, className }) => (
  <span className={`font-mono tabular-nums ${className}`}>
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

/** Coded product moment: a dataset's quality certificate, as AI companies see it before they pay. */
const CertificateMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="A quality certificate, as AI companies see it before they pay">
    <div className="flex items-start justify-between gap-4 border-b border-border-light px-5 py-4">
      <div>
        <p className="text-meta text-ink-muted">Quality certificate</p>
        <p className="mt-1 text-heading-lg text-ink">{SAMPLE_LISTING.name}</p>
      </div>
      <span className="rounded-md bg-muted px-2 py-1 font-mono text-table-head uppercase text-ink-secondary">Sample</span>
    </div>
    <div className="flex items-center justify-between gap-4 border-b border-border-light px-5 py-4">
      <span className="text-body text-ink-secondary">Score</span>
      <RollingValue value="92" className="text-page-title text-ink" />
    </div>
    <dl className="grid grid-cols-3 border-b border-border-light text-body-sm">
      {CERTIFICATE_FACTS.map(([label, value], i) => (
        // m-check: in How it works the facts come in one by one
        <div
          key={label}
          className={`m-check flex flex-col px-5 py-3 ${i ? 'border-l border-border-light' : ''}`}
          style={{ '--i': i }}
        >
          <dt className="text-ink-muted">{label}</dt>
          <dd className="order-first font-mono text-body tabular-nums text-ink">{value}</dd>
        </div>
      ))}
    </dl>
    <div className="m-after flex flex-wrap items-center justify-between gap-3 bg-secondary px-5 py-3">
      <p className="text-body-sm text-ink-secondary">Worked out from this exact data</p>
      <span
        className="rounded-lg border border-btn-secondary-border bg-page px-3 py-1.5 text-body-sm font-medium text-btn-secondary-ink"
        aria-hidden="true"
      >
        Run a query
      </span>
    </div>
  </Card>
);

export default CertificateMoment;
