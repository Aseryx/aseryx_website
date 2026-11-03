import { useMemo, useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import Button from '../components/common/Button.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import Card from '../components/common/Card.jsx';
import StatusChip from '../components/common/StatusChip.jsx';
import ChoiceChips from '../components/common/ChoiceChips.jsx';
import { BAND_TONE } from '../components/benchmarks/bandTone.js';
import { QUESTIONS, DEFAULT_ANSWERS, previewReadiness } from '../utils/readinessPreview.js';
import { BANDS } from '../data/benchmarks.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import LoopFrame from '../components/product/LoopFrame.jsx';

// Worst to best, left to right, so a better answer moves the marker right.
const SCALE = [...BANDS].reverse();

/**
 * Where the band sits among the four, with a marker that slides when an
 * answer moves it. Decorative: the headline above already says the band.
 */
const BandScale = ({ band }) => {
  const index = SCALE.findIndex((b) => b.id === band.id);
  // Four segments with three 4px gaps: each is a quarter of what is left.
  const segment = 'calc((100% - 12px) / 4)';
  return (
    <div className="mt-5" aria-hidden="true">
      <div className="relative grid h-1.5 grid-cols-4 gap-1">
        {SCALE.map((b) => (
          <span key={b.id} className="rounded-full bg-muted" />
        ))}
        <span
          className={`absolute inset-y-0 rounded-full transition-[left,background-color] duration-300 ease-out ${BAND_TONE[band.id].dot}`}
          style={{ width: segment, left: `calc(${index} * (${segment} + 4px))` }}
        />
      </div>
      <div className="mt-2 grid grid-cols-4 gap-1 text-meta">
        {SCALE.map((b) => (
          <span key={b.id} className={`transition-colors duration-300 ${b.id === band.id ? 'text-ink' : 'text-ink-muted'}`}>
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
};

/**
 * One question as chips. The divider sits on a wrapper because a <legend>
 * cuts through its fieldset's own border.
 */
const ChoiceGroup = ({ question, value, onChange }) => (
  <div className="border-t border-border-light pt-6 first:border-0 first:pt-0">
    <ChoiceChips
      name={question.id}
      legend={question.legend}
      options={question.options}
      value={value}
      onChange={(option) => onChange(question.id, option)}
    />
  </div>
);

const headlineFor = (result, typeLabel) => {
  if (result.state === 'unscored') return `No score for ${typeLabel}`;
  if (result.state === 'insufficient') return 'Too few records to score';
  return `Likely ${result.band.label.toLowerCase()}`;
};

const AppraisalPage = () => {
  usePageMeta({ ...PAGE_META['/appraisal'], path: '/appraisal' });
  const [answers, setAnswers] = useState(DEFAULT_ANSWERS);
  // Changed lines settle in only after the first answer, not on page load:
  // every line carries .animate-settle, but its duration stays 0s until then.
  // A finished animation does not replay when its duration changes, so only
  // lines that remount (their key changed) move.
  const [touched, setTouched] = useState(false);
  const result = useMemo(() => previewReadiness(answers), [answers]);
  const setAnswer = (id, value) => {
    setTouched(true);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };
  const settle = 'animate-settle';
  const typeName = QUESTIONS[0].options.find(([v]) => v === answers.type)[1];
  // Lower case mid-sentence, except an initialism such as 3D.
  const typeLabel = typeName === typeName.toUpperCase() ? typeName : typeName.toLowerCase();
  const headline = headlineFor(result, typeLabel);
  const questions = QUESTIONS.filter((q) => result.tabular || !q.tableOnly);

  return (
    <PageLayout>
      <PageHero
        title="See how ready your dataset is"
        lede="Answer a few questions for a preview of your quality score: what is likely to score well, and what to fix first."
        aside={<LoopFrame name="appraise" />}
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Readiness preview tool">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <form className="lg:col-span-7" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              {questions.map((q) => (
                <ChoiceGroup key={q.id} question={q} value={answers[q.id]} onChange={setAnswer} />
              ))}
            </div>
            <div className="mt-8 border-t border-border pt-6">
              <Button
                variant="secondary"
                onClick={() => {
                  setTouched(true);
                  setAnswers(DEFAULT_ANSWERS);
                }}
              >
                Start over
              </Button>
            </div>
          </form>

          <Card
            lift
            className="overflow-hidden lg:sticky lg:top-24 lg:col-span-5"
            style={{ '--settle-duration': touched ? '0.2s' : '0s' }}
            aria-labelledby="preview-title"
          >
            <div className="p-6">
              <p id="preview-title" className="text-meta text-ink-muted">
                Readiness preview from your answers
              </p>
              {/* The live region stays put; only its content is swapped, keyed so it settles in */}
              <p className="mt-3 text-page-title font-semibold text-ink" aria-live="polite">
                <span key={headline} className={`flex items-center gap-3 ${settle}`}>
                  {result.band && (
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${BAND_TONE[result.band.id].dot}`}
                      aria-hidden="true"
                    />
                  )}
                  {headline}
                </span>
              </p>
              {result.band && <BandScale band={result.band} />}
              {result.state === 'low' && (
                <p className="mt-2 text-body-sm text-ink-secondary">
                  Under 400 entries: scored with low confidence and not ranked.
                </p>
              )}
              {result.state === 'insufficient' && (
                <p className="mt-2 text-body-sm text-ink-secondary">
                  Under 100 entries, the score is computed but not shown.
                </p>
              )}
              {result.state === 'unscored' && (
                <p className="mt-2 text-body-sm text-ink-secondary">
                  The quality score covers tables: CSV, TSV, JSON and JSONL files.
                </p>
              )}
            </div>

            {result.checks.length > 0 && (
              <ul className="border-t border-border-light px-6 py-2">
                {result.checks.map((check) => (
                  <li
                    key={check.name}
                    className="flex items-center justify-between gap-4 border-b border-border-light py-3 last:border-0"
                  >
                    <span className="text-body text-ink">{check.name}</span>
                    <StatusChip key={check.status} tone={check.status} className={settle}>
                      {check.label}
                    </StatusChip>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-6 border-t border-border-light bg-secondary p-6">
              {result.tabular && (
                <div>
                  <p className="text-heading-lg text-ink">Fix first</p>
                  {result.fixFirst.length ? (
                    <ol className="mt-3 space-y-2.5 text-body text-ink-secondary">
                      {result.fixFirst.map((item, i) => (
                        <li key={item} className={`flex gap-3 ${settle}`}>
                          <span className="font-mono text-body-sm tabular-nums text-ink-muted">{i + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="mt-3 text-body text-ink-secondary">
                      Nothing stands out. List your dataset to get its quality certificate.
                    </p>
                  )}
                </div>
              )}
              {result.beforeListing.length > 0 && (
                <div>
                  <p className="text-heading-lg text-ink">Before you list</p>
                  <ul className="mt-3 space-y-2.5 text-body text-ink-secondary">
                    {result.beforeListing.map((item) => (
                      <li key={item} className={settle}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {result.tabular && (
                <p className="text-body-sm text-ink-muted">
                  A preview from your answers. Your real score is worked out from the dataset itself, and it
                  never sets a price.
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <CtaButton action="listDataset" />
                <CtaButton action="seeBenchmarks" variant="standard" />
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
};

export default AppraisalPage;
