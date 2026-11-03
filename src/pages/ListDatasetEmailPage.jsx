import PageLayout from '../components/layout/PageLayout.jsx';
import PageHero from '../components/common/PageHero.jsx';
import Section from '../components/common/Section.jsx';
import Card from '../components/common/Card.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import AseryxLogo from '../components/common/AseryxLogo.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';

// The sender is a placeholder until a team address is chosen.
const MESSAGE = {
  from: 'Aseryx <owners@aseryx.xyz>',
  to: 'maya@example.com',
  subject: 'We’ve got your request',
};

/**
 * The confirmation an owner gets after sending a request to list, as a mock
 * for its wording and tone. Served by the dev server only (AppRoutes).
 */
const ListDatasetEmailPage = () => {
  usePageMeta({
    title: 'Confirmation email | Aseryx',
    description: 'The email an owner gets after asking to list a dataset.',
    path: '/list-your-dataset/email',
    noIndex: true,
  });

  return (
    <PageLayout>
      <PageHero
        title="The confirmation email"
        lede="What an owner gets a minute after sending a request. A mock: nothing is sent yet."
      />

      <Section spacing="none" className="pb-16 md:pb-24" aria-label="Email preview">
        <Card lift className="max-w-2xl overflow-hidden" role="figure" aria-label="Confirmation email to an owner">
          <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 border-b border-border-light px-6 py-4 text-body-sm">
            <dt className="text-ink-muted">From</dt>
            <dd className="text-ink">{MESSAGE.from}</dd>
            <dt className="text-ink-muted">To</dt>
            <dd className="text-ink">{MESSAGE.to}</dd>
            <dt className="text-ink-muted">Subject</dt>
            <dd className="font-medium text-ink">{MESSAGE.subject}</dd>
          </dl>
          <div className="space-y-4 px-6 py-8 text-body text-ink-secondary">
            <AseryxLogo />
            <p className="pt-2 text-ink">Hi Maya,</p>
            <p>
              Thanks for telling us about your data. We read every request ourselves, and we bring owners on in small
              groups.
            </p>
            <p>
              When your place opens, we&apos;ll email you a link to set up your account. From there you score your data
              and approve its profile line by line before it&apos;s published.
            </p>
            <p>While you wait, you can see how ready your dataset is.</p>
            <div className="pt-1">
              <CtaButton action="previewScore" />
            </div>
            <p className="pt-2">The Aseryx team</p>
          </div>
          <p className="border-t border-border-light px-6 py-4 text-meta text-ink-muted">
            You&apos;re getting this because you asked to list a dataset on aseryx.xyz.
          </p>
        </Card>
      </Section>
    </PageLayout>
  );
};

export default ListDatasetEmailPage;
