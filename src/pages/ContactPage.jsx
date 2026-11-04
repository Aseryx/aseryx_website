import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';

// Each audience gets its own way in: AI companies book a call, owners tell us
// about their data. The first action of each is the filled button.
const DOORS = [
  {
    id: 'contact-ai-companies',
    title: 'For AI companies',
    body: 'Book a 30-minute call about the data you need and how licensing works.',
    actions: ['requestDataset', 'exploreDatasets'],
  },
  {
    id: 'contact-owners',
    title: 'For data owners',
    body: 'Tell us about your data, or see how it would score first.',
    actions: ['listDataset', 'previewScore'],
  },
];

const ContactPage = () => {
  usePageMeta({ ...PAGE_META['/contact'], path: '/contact' });

  return (
    <PageLayout>
      <PageHero
        title="Talk to the Aseryx team"
        lede="AI companies can book a call with the team. Data owners can tell us about their data."
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Ways to reach the team">
        <div className="grid gap-12 border-t border-border pt-10 md:grid-cols-2 md:gap-16">
          {DOORS.map((door) => (
            <div key={door.id}>
              <h2 id={door.id} className="text-heading-lg text-ink">
                {door.title}
              </h2>
              <p className="mt-2 max-w-[30rem] text-body text-ink-secondary">{door.body}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {door.actions.map((action, i) => (
                  <CtaButton key={action} action={action} variant={i === 0 ? undefined : 'standard'} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
};

export default ContactPage;
