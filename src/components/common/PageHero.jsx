import Section from './Section.jsx';

/**
 * Top of every inner page: the page's one h1, a lede and a button
 * pair. Clears the fixed nav; `aside` sits beside the copy on large screens
 * (a product moment), `children` render below (filters, fact rows).
 */
const PageHero = ({ title, lede, actions, align = 'left', aside, children }) => {
  const center = align === 'center' && !aside;

  const copy = (
    <div className={center ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'}>
      <h1 className="text-display-lg md:text-display-xl text-ink">{title}</h1>
      {lede && (
        <p className={`mt-5 text-lede text-ink-secondary max-w-[40rem] ${center ? 'mx-auto' : ''}`}>{lede}</p>
      )}
      {actions && <div className={`mt-8 flex flex-wrap gap-3 ${center ? 'justify-center' : ''}`}>{actions}</div>}
    </div>
  );

  return (
    <Section spacing="none" className="pt-28 pb-12 md:pt-36 md:pb-16">
      {aside ? (
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">{copy}</div>
          <div className="lg:col-span-5">{aside}</div>
        </div>
      ) : (
        copy
      )}
      {children}
    </Section>
  );
};

export default PageHero;
