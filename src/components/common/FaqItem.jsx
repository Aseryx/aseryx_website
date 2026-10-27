import { Plus } from 'lucide-react';

/** Native disclosure: works without JavaScript and keeps keyboard support for free. */
const FaqItem = ({ question, answer }) => (
  <details className="group border-b border-border [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-6 text-heading-lg text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand md:text-page-title md:font-medium">
      <span className="max-w-3xl">{question}</span>
      <Plus
        className="h-5 w-5 shrink-0 text-ink-secondary transition-transform duration-150 group-hover:text-ink group-open:rotate-45"
        aria-hidden="true"
      />
    </summary>
    <p className="max-w-3xl pb-8 text-body-lg text-ink-secondary [text-wrap:pretty] animate-fade-in">{answer}</p>
  </details>
);

export default FaqItem;
