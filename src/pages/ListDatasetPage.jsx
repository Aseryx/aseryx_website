import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import Button from '../components/common/Button.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import ChoiceChips from '../components/common/ChoiceChips.jsx';
import FieldError from '../components/common/FieldError.jsx';
import { DATA_KINDS, DATA_SIZES, SIZE_FROM_PREVIEW, sendOwnerRequest } from '../utils/ownerRequest.js';
import { usePageMeta } from '../hooks/usePageMeta.jsx';

// What happens after an owner sends a request, in order.
const NEXT = [
  { title: 'We read your request', body: 'The team reads every request that comes in.' },
  { title: 'You get an invite', body: 'When your place opens, we email you a link to set up your account.' },
  {
    title: 'You score and list your data',
    body: 'Your dataset gets its quality score and a profile you approve line by line before it is published.',
  },
];

const EMPTY = { name: '', email: '', company: '', role: '', kinds: [], size: '', about: '' };

// Checked, and focused when wrong, in the order the form shows them.
const REQUIRED = [
  ['name', (f) => f.name.trim() !== '', 'Add your name'],
  ['email', (f) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()), 'Add an email we can reply to'],
  ['company', (f) => f.company.trim() !== '', 'Add your company'],
  ['kinds', (f) => f.kinds.length > 0, 'Pick at least one'],
  ['size', (f) => f.size !== '', 'Pick the closest'],
];

const INPUT =
  'mt-2 w-full rounded-lg border bg-card px-3 py-2.5 text-body text-ink placeholder:text-ink-muted ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand';

/** A labelled text input or, with `multiline`, a textarea; `error` shows under it. */
const Field = ({ id, label, optional = false, multiline = false, error, ...input }) => {
  const Control = multiline ? 'textarea' : 'input';
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div>
      <label htmlFor={id} className="text-body-lg font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-ink-muted"> (optional)</span>}
      </label>
      <Control
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className={`${INPUT} ${error ? 'border-critical' : 'border-border'} ${multiline ? 'min-h-28 resize-y' : ''}`}
        {...input}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
};

/**
 * Owners' request to list, as a mock until its email sending is set up: the
 * form, its checks and the thank-you are real, and sending only waits a
 * moment (utils/ownerRequest.js). Served by the dev server only (AppRoutes).
 * ?kind= and ?size= take the score preview's answers; ?sent=1 opens on the
 * thank-you with a sample name.
 */
const ListDatasetPage = () => {
  usePageMeta({
    title: 'List your dataset | Aseryx',
    description: 'Tell us about your data. We review every request and bring owners on in small groups.',
    path: '/list-your-dataset',
    noIndex: true,
  });
  const [params] = useSearchParams();
  const formRef = useRef(null);
  const thanksRef = useRef(null);
  const [form, setForm] = useState(() => {
    if (params.get('sent')) return { ...EMPTY, name: 'Maya', email: 'maya@example.com' };
    const kind = params.get('kind');
    return {
      ...EMPTY,
      kinds: DATA_KINDS.some(([value]) => value === kind) ? [kind] : [],
      size: SIZE_FROM_PREVIEW[params.get('size')] ?? '',
    };
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(params.get('sent') ? 'sent' : 'editing');

  // The thank-you takes focus, so a screen reader hears it once it replaces the form.
  useEffect(() => {
    if (status === 'sent') thanksRef.current?.focus();
  }, [status]);

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // An error clears as soon as its answer changes.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  const submit = async (e) => {
    e.preventDefault();
    const wrong = REQUIRED.filter(([, ok]) => !ok(form));
    setErrors(Object.fromEntries(wrong.map(([key, , message]) => [key, message])));
    if (wrong.length) {
      formRef.current?.querySelector(`[name="${wrong[0][0]}"]`)?.focus();
      return;
    }
    setStatus('sending');
    await sendOwnerRequest(form);
    setStatus('sent');
  };

  const firstName = form.name.trim().split(/\s+/)[0];

  return (
    <PageLayout>
      <PageHero
        title="List your dataset"
        lede="Tell us about your data. We review every request and bring owners on in small groups."
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Request to list a dataset">
        <div className="grid gap-12 border-t border-border pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {status === 'sent' ? (
              <div>
                <h2 ref={thanksRef} tabIndex={-1} className="text-display-lg text-ink focus:outline-none">
                  Thanks, {firstName}. Your request is in.
                </h2>
                <p className="mt-4 max-w-[36rem] text-lede text-ink-secondary">
                  We&apos;ll email you at {form.email} when your place opens. A copy of your request is on its way to
                  your inbox now.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CtaButton action="previewScore" />
                  <CtaButton action="backHome" variant="standard" />
                </div>
                <p className="mt-12 border-t border-border-light pt-4 text-body-sm text-ink-muted">
                  Mock only: nothing was sent.{' '}
                  <Link to="/list-your-dataset/email" className="text-ink underline underline-offset-2">
                    See the confirmation email
                  </Link>
                </p>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={submit} className="space-y-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    error={errors.name}
                  />
                  <Field
                    id="email"
                    label="Work email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                    error={errors.email}
                  />
                  <Field
                    id="company"
                    label="Company"
                    autoComplete="organization"
                    value={form.company}
                    onChange={(e) => set('company', e.target.value)}
                    error={errors.company}
                  />
                  <Field
                    id="role"
                    label="Role"
                    optional
                    autoComplete="organization-title"
                    value={form.role}
                    onChange={(e) => set('role', e.target.value)}
                  />
                </div>
                <ChoiceChips
                  name="kinds"
                  legend="What kind of data is it?"
                  hint="Pick all that apply."
                  options={DATA_KINDS}
                  value={form.kinds}
                  onChange={(kinds) => set('kinds', kinds)}
                  multiple
                  error={errors.kinds}
                />
                <ChoiceChips
                  name="size"
                  legend="Roughly how many entries?"
                  options={DATA_SIZES}
                  value={form.size}
                  onChange={(size) => set('size', size)}
                  error={errors.size}
                />
                <Field
                  id="about"
                  label="Tell us about it"
                  optional
                  multiline
                  placeholder="What it is, how it was made and who holds the rights."
                  value={form.about}
                  onChange={(e) => set('about', e.target.value)}
                />
                <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[28rem] text-body-sm text-ink-muted">
                    We use these details only to reply to your request. See the{' '}
                    <Link to="/privacy" className="text-ink underline underline-offset-2">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  <Button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send request'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5" aria-labelledby="list-next">
            <h2 id="list-next" className="text-heading-lg text-ink">
              What happens next
            </h2>
            <ol className="mt-4 border-t border-border">
              {NEXT.map((step, i) => (
                <li key={step.title} className="flex gap-4 border-b border-border py-5">
                  <span className="font-mono text-body-sm tabular-nums text-ink-muted">{i + 1}</span>
                  <div>
                    <p className="text-body font-medium text-ink">{step.title}</p>
                    <p className="mt-1 text-body text-ink-secondary">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Section>
    </PageLayout>
  );
};

export default ListDatasetPage;
