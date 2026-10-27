import { useMemo, useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import { QUESTIONS, DEFAULT_ANSWERS, previewReadiness } from '../utils/readinessPreview.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

const BAND_DOT = { ready: 'bg-success-dot', usable: 'bg-pending', cleaning: 'bg-brand', serious: 'bg-critical' };

const STATUS_CHIP = {
  pass: { chip: 'border-success-border bg-success-bg text-success-ink', dot: 'bg-success-dot' },
  watch: { chip: 'border-border bg-card text-ink-secondary', dot: 'bg-pending' },
  fix: { chip: 'border-border bg-card text-ink', dot: 'bg-critical' },
};

/**
 * Radio group drawn as chips; the native input keeps keyboard and screen-reader
 * behaviour. The divider sits on a wrapper because a <legend> cuts through its
 * fieldset's own border.
 */
const ChoiceGroup = ({ question, value, onChange }) => (
  <div className="border-t border-border-light pt-6 first:border-0 first:pt-0">
    <fieldset>
      <legend className="mb-3 text-body-lg font-medium text-ink">{question.legend}</legend>
      <div className="flex flex-wrap gap-2">
        {question.options.map(([optionValue, label]) => (
          <label key={optionValue} className="cursor-pointer">
            <input
              type="radio"
              name={question.id}
              value={optionValue}
              checked={value === optionValue}
              onChange={() => onChange(question.id, optionValue)}
              className="peer sr-only"
            />
            <span
              className={
                'inline-flex min-h-10 items-center rounded-lg border border-border px-3 text-body-sm text-ink-secondary ' +
                'transition-colors duration-150 hover:bg-hover hover:text-ink ' +
                'peer-checked:border-transparent peer-checked:bg-btn-primary peer-checked:text-btn-primary-ink ' +
                'peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-page'
              }
            >
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  </div>
);

const headlineFor = (result) => {
  if (result.state === 'insufficient') return 'Too few records to score';
  return `Likely ${result.band.label.toLowerCase()}`;
};

const AppraisalPage = () => {
  usePageMeta({ ...PAGE_META['/appraisal'], path: '/appraisal' });
  const [answers, setAnswers] = useState(DEFAULT_ANSWERS);
  const result = useMemo(() => previewReadiness(answers), [answers]);
  const setAnswer = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));
  const typeLabel = QUESTIONS[0].options.find(([v]) => v === answers.type)[1].toLowerCase();

  return (
    <PageLayout>
      <PageHero
        eyebrow="Appraisal"
        title="See how ready your dataset is"
        lede="Describe your dataset and get a readiness preview: the checks it is likely to pass and what to fix first. Not a price."
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Readiness preview tool">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <Card as="form" className="p-6 md:p-8 lg:col-span-7" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              {QUESTIONS.map((q) => (
                <ChoiceGroup key={q.id} question={q} value={answers[q.id]} onChange={setAnswer} />
              ))}
            </div>
            <div className="mt-8 flex justify-end border-t border-border-light pt-6">
              <Button variant="secondary" arrow={false} onClick={() => setAnswers(DEFAULT_ANSWERS)}>
                Start over
              </Button>
            </div>
          </Card>

          <Card lift className="overflow-hidden lg:sticky lg:top-24 lg:col-span-5" aria-labelledby="preview-title">
            <div className="border-b border-border-light p-6">
              <p id="preview-title" className="text-meta text-ink-muted">
                Readiness preview · from your answers
              </p>
              <p className="mt-3 flex items-center gap-3 text-page-title font-semibold text-ink" aria-live="polite">
                {result.band && (
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${BAND_DOT[result.band.id]}`}
                    aria-hidden="true"
                  />
                )}
                {headlineFor(result)}
              </p>
              {result.state === 'low' && (
                <p className="mt-2 text-body-sm text-ink-secondary">
                  Under 400 records: scored with low confidence and not ranked.
                </p>
              )}
              {result.state === 'insufficient' && (
                <p className="mt-2 text-body-sm text-ink-secondary">
                  Under 100 records the score is computed but not shown.
                </p>
              )}
              {!result.tabular && result.state !== 'insufficient' && (
                <p className="mt-2 text-body-sm text-ink-secondary">
                  The band is indicative: scoring covers tables today, and {typeLabel} gets the profile checks below.
                </p>
              )}
            </div>

            <ul className="px-6 py-2">
              {result.checks.map((check) => (
                <li
                  key={check.name}
                  className="flex items-center justify-between gap-4 border-b border-border-light py-3 last:border-0"
                >
                  <span className="text-body text-ink">{check.name}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-meta ${STATUS_CHIP[check.status].chip}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_CHIP[check.status].dot}`} aria-hidden="true" />
                    {check.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-border-light bg-secondary p-6">
              <p className="text-heading-lg text-ink">Fix first</p>
              {result.fixFirst.length ? (
                <ol className="mt-3 space-y-2.5 text-body text-ink-secondary">
                  {result.fixFirst.map((item, i) => (
                    <li key={item} className="flex gap-3">
                      <span className="font-mono text-body-sm tabular-nums text-ink-muted">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 text-body text-ink-secondary">
                  Nothing stands out. Lock the dataset and run the real check.
                </p>
              )}
              <p className="mt-6 text-body-sm text-ink-muted">
                A preview from your answers, not an appraisal and not a price. The real check runs on the locked
                dataset, on your machine.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={TALLY.appraisal}>Join the beta</Button>
                <Button to="/benchmarks" variant="standard" arrow={false}>
                  See the benchmarks
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
};

export default AppraisalPage;
