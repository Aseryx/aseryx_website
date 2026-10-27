import Section from './Section.jsx';
import Eyebrow from './Eyebrow.jsx';

/**
 * Top of every inner page: eyebrow, the page's one h1, a lede and a button
 * pair. Clears the fixed nav; `children` render below (filters, fact rows).
 */
const PageHero = ({ eyebrow, title, lede, actions, align = 'left', children }) => {
  const center = align === 'center';

  return (
    <Section spacing="none" className="pt-28 pb-12 md:pt-36 md:pb-16">
      <div className={center ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'}>
        {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
        <h1 className="text-display-lg md:text-display-xl text-ink">{title}</h1>
        {lede && (
          <p className={`mt-5 text-lede text-ink-secondary max-w-[40rem] ${center ? 'mx-auto' : ''}`}>{lede}</p>
        )}
        {actions && <div className={`mt-8 flex flex-wrap gap-3 ${center ? 'justify-center' : ''}`}>{actions}</div>}
      </div>
      {children}
    </Section>
  );
};

export default PageHero;
