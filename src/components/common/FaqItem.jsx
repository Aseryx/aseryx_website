import { ScrollReveal } from '../../hooks/useScrollReveal.jsx';

const FaqItem = ({ question, answer, delay = 0 }) => (
  <ScrollReveal delay={delay}>
    <details className="group border-b border-border [&_summary::-webkit-details-marker]:hidden transition-all duration-300">
      <summary className="font-display text-xl md:text-2xl lg:text-3xl text-ink cursor-pointer list-none flex justify-between items-center py-6 md:py-8 hover:text-brand-orange transition-colors">
        <span className="max-w-3xl pr-8 leading-tight">{question}</span>
        <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:border-brand-orange group-open:text-black group-hover:border-brand-orange">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </summary>
      <div className="pb-10 text-ink-secondary text-base md:text-lg leading-relaxed max-w-3xl animate-fade-in">
        {answer}
      </div>
    </details>
  </ScrollReveal>
);

export default FaqItem;