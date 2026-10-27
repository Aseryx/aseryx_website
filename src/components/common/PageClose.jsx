import Section from './Section.jsx';

/**
 * A page's last word: its one next step, on the page itself behind a rule.
 * Not a tinted band and not centred, so it reads as the end of this page
 * rather than a banner every page shares. It sits on the previous section's
 * bottom padding, so that section must be on the page tone, not a band.
 */
const PageClose = ({ id, title, lede, actions }) => (
  <Section spacing="none" className="pb-16 md:pb-24 lg:pb-32" aria-labelledby={id}>
    <div className="grid gap-8 border-t border-border pt-12 md:pt-16 lg:grid-cols-12 lg:items-end lg:gap-12">
      <div className="lg:col-span-8">
        <h2 id={id} className="max-w-3xl text-display-lg text-ink md:text-display-xl">
          {title}
        </h2>
        {lede && <p className="mt-4 max-w-[36rem] text-lede text-ink-secondary">{lede}</p>}
      </div>
      <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">{actions}</div>
    </div>
  </Section>
);

export default PageClose;
