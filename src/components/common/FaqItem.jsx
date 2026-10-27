import { Plus } from 'lucide-react';

/** Native disclosure: works without JavaScript and keeps keyboard support for free. */
const FaqItem = ({ question, answer }) => (
  <details className="group border-b border-border [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-6 text-heading-lg text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:text-page-title md:font-medium">
      <span className="max-w-3xl">{question}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-ink-secondary transition-colors duration-150 group-hover:border-border-hover group-hover:text-ink">
        <Plus className="h-4 w-4 transition-transform duration-150 group-open:rotate-45" aria-hidden="true" />
      </span>
    </summary>
    <p className="max-w-3xl pb-8 text-body-lg text-ink-secondary animate-fade-in">{answer}</p>
  </details>
);

export default FaqItem;
