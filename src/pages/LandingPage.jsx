import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import HeroVideoBackground from '../components/common/HeroVideoBackground.jsx';
import PageLayout from '../components/layout/PageLayout.jsx';
import RiskBand from '../components/common/RiskBand.jsx';
import FaqItem from '../components/common/FaqItem.jsx';
import ProductPlaceholder from '../components/common/ProductPlaceholder.jsx';
import ArcadeEmbed from '../components/common/ArcadeEmbed.jsx';
import {
  GeometricPrism,
  GeometricShield,
  GeometricLattice,
  GeometricSphere,
} from '../components/common/GeometricIllustrations.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

/** Primary product door href on this branch (no separate app URL yet). */
const LAUNCH_HREF = TALLY.appraisal;

const LANDING_FAQS = [
  {
    question: 'What do I sell?',
    answer: 'Time-limited access to selected data. Not your whole dataset.',
    delay: 100,
  },
  {
    question: 'Is the quality number the price?',
    answer: 'No. You set the price. The number describes the data you locked.',
    delay: 200,
  },
  {
    question: 'Can I take access back early?',
    answer: 'No. Access runs for the months you sold. Then it ends.',
    delay: 300,
  },
  {
    question: 'Does this put me on a public catalog?',
    answer:
      'A completed quality check can still show up on a public list today. The path we walk here is a private license, not a storefront.',
    delay: 400,
  },
  {
    question: 'Who is this for?',
    answer: 'People who own data and can license a specific use.',
    delay: 500,
  },
];

const PATH_FEATURES = [
  {
    label: '01 · Choose',
    title: 'Choose',
    body: 'Choose the file or the tables the term covers.',
    productLabel: 'Step · Choose',
    lightSrc: '/product/workspace-slice-light.png',
    darkSrc: '/product/workspace-slice-dark.png',
    alt: 'Aseryx: select tables and fields for the term',
    reverse: false,
  },
  {
    label: '02 · Lock',
    title: 'Lock',
    body: 'Lock that data before anyone pays. An encrypted copy is stored. See where it sits before you commit.',
    productLabel: 'Step · Lock',
    lightSrc: '/product/vault-light.png',
    darkSrc: '/product/vault-dark.png',
    alt: 'Aseryx: locked datasets ready for a quality check',
    reverse: true,
  },
  {
    label: '03 · Check',
    title: 'Check',
    body: 'Quality-check the data you locked.',
    productLabel: 'Step · Check',
    lightSrc: '/product/appraisal-light.png',
    darkSrc: '/product/appraisal-dark.png',
    alt: 'Aseryx: quality check on locked data',
    reverse: false,
  },
  {
    label: '04 · Term',
    title: 'Term',
    body: 'Set the price. Open paid access for 3, 6, 9, or 12 months. When that period ends, access ends.',
    productLabel: 'Step · Term',
    lightSrc: '/product/access-light.png',
    darkSrc: '/product/access-dark.png',
    alt: 'Aseryx: grant time-bounded access to selected data',
    reverse: true,
  },
];

const OUTCOMES = {
  left: [
    {
      label: '01 / Scope',
      title: 'Defined scope',
      body: 'Tables, columns, or one file. Nothing else is in the deal.',
      Icon: GeometricLattice,
    },
    {
      label: '02 / Pay',
      title: 'You set the price',
      body: 'You set the price. Payment first. Then access opens.',
      Icon: GeometricSphere,
    },
  ],
  right: {
    label: '03 / Term',
    title: 'Access expires',
    body: '3, 6, 9, or 12 months. When it ends, access ends.',
    Icon: GeometricShield,
  },
};

const USE_CASE_TAGS = [
  'Media localization',
  'Fraud models',
  'Cost engines',
  'Genomics',
  'Trading research',
  'Predictive maintenance',
];

const LandingPage = () => {
  usePageMeta({ ...PAGE_META['/'], path: '/' });
  const RightOutcomeIcon = OUTCOMES.right.Icon;

  return (
    <PageLayout>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24 grid-bg overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <HeroVideoBackground src="/hero-bg.mp4" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F8F6]/88 via-[#F9F8F6]/60 to-[#F9F8F6]/25 dark:from-[#0a0a0a]/88 dark:via-[#0a0a0a]/45 dark:to-transparent" />
          <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_80%_30%,rgba(235,94,40,0.08),transparent_55%)]" />
          <ParticlesBackground />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-left">
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-up delay-100 opacity-0 max-w-4xl"
            style={{ animationFillMode: 'forwards' }}
          >
            Open access to the data you choose under your control.
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-4 max-w-xl animate-fade-up delay-200 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="box-decoration-clone bg-brand-orange text-black px-2.5 py-1">
              You pick the files or tables. You set the term. The archive stays yours.
            </span>
          </p>

          <p
            className="text-base md:text-lg text-[#6B7280] dark:text-gray-300 leading-relaxed mb-10 max-w-xl animate-fade-up delay-250 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            Choose the data. Lock it. Run a quality check. Open paid access for a fixed term. When the term ends,
            access ends.
          </p>

          <div
            className="animate-fade-up delay-300 opacity-0 flex flex-wrap gap-4"
            style={{ animationFillMode: 'forwards' }}
          >
            <a
              href={LAUNCH_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Launch Aseryx"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-orange text-black font-medium tracking-wide text-sm uppercase hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a]"
            >
              Launch Aseryx
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p
            className="animate-fade-up delay-350 opacity-0 mt-4 text-sm md:text-base text-[#4B5563] dark:text-gray-300 max-w-xl leading-relaxed"
            style={{ animationFillMode: 'forwards' }}
          >
            Access ends when the term ends. You set the price.
          </p>
        </div>
      </section>

      <RiskBand items={['Defined scope', 'See where data sits', 'Access expires']} />

      {/* ===== INTRO (claim + Arcade proof; pillars cut) ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-10 md:mb-12 w-full text-justify">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
              One path for the data you choose.{' '}
              <span className="text-[#6B7280] dark:text-gray-400">
                Choose it. Check it. Open paid access for a term you control.
              </span>
            </h2>
          </div>

          <ScrollReveal>
            <ArcadeEmbed className="mb-4 md:mb-6" />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 md:py-28 lg:py-36 px-4 md:px-8 grid-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="section-divider pt-8 md:pt-12 mb-16 md:mb-24 max-w-2xl">
            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">How it works</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight">
              One path.
              <br />
              <span className="italic text-[#6B7280] dark:text-gray-400">Choose. Lock. Check. Term.</span>
            </h2>
          </div>

          <div className="space-y-20 md:space-y-28">
            {PATH_FEATURES.map((feature) => (
              <ScrollReveal key={feature.label}>
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                  <div className={`lg:col-span-4 ${feature.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">
                      {feature.label}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] dark:text-white mb-4 leading-tight tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[#6B7280] dark:text-gray-400 text-base leading-relaxed max-w-md">
                      {feature.body}
                    </p>
                  </div>
                  <div className={`lg:col-span-8 ${feature.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    <ProductPlaceholder
                      label={feature.productLabel}
                      lightSrc={feature.lightSrc}
                      darkSrc={feature.darkSrc}
                      alt={feature.alt}
                      aspect="video"
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUTCOMES ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16">
            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">Outcomes</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight max-w-2xl">
              The archive stays yours.
              <br />
              <span className="italic text-[#6B7280] dark:text-gray-400">You set the price. Access ends.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6 md:gap-8">
            <div className="md:col-span-3 space-y-6">
              {OUTCOMES.left.map((outcome, index) => {
                const Icon = outcome.Icon;
                return (
                  <ScrollReveal key={outcome.title} delay={(index + 1) * 100}>
                    <div className="group flex flex-col sm:flex-row bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-transparent opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center justify-center p-8 sm:p-10 grayscale group-hover:grayscale-0 transition-all duration-500 sm:border-r border-b sm:border-b-0 border-[#E8E4DE] dark:border-[#1F2937]">
                        <Icon className="w-24 h-24 md:w-32 md:h-32 text-[#6B7280] group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6 md:p-8 flex-1">
                        <p className="font-mono text-xs text-[#6B7280] dark:text-gray-500 mb-4 uppercase tracking-wider">
                          {outcome.label}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">
                          {outcome.title}
                        </h3>
                        <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">{outcome.body}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <div className="md:col-span-2">
              <ScrollReveal delay={300} className="h-full">
                <div className="group h-full flex flex-col justify-between bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-brand-orange/10 dark:border-brand-orange/20">
                  <div className="flex items-center justify-center py-8 md:py-12">
                    <RightOutcomeIcon className="w-28 h-28 md:w-36 md:h-36 text-brand-orange group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 md:p-8 border-t border-brand-orange/20 dark:border-brand-orange/30">
                    <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">
                      {OUTCOMES.right.label}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3">
                      {OUTCOMES.right.title}
                    </h3>
                    <p className="text-[#6B7280] dark:text-gray-400 text-sm leading-relaxed">
                      {OUTCOMES.right.body}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== USE CASES (tags only) ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="section-divider pt-8 md:pt-12 mb-8 md:mb-12">
            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase">Use cases</p>
          </div>

          <div className="use-cases-scroll section-divider pt-4 pb-4">
            {USE_CASE_TAGS.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap text-sm md:text-base text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors cursor-default font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HONESTY ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="group flex flex-col lg:flex-row bg-[#EDEBE8] dark:bg-[#111111] card-oasis overflow-hidden border border-[#E8E4DE] dark:border-[#1F2937]">
              <div className="lg:w-[36%] flex items-center justify-center p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-[#E8E4DE] dark:border-[#1F2937]">
                <GeometricPrism className="w-28 h-28 md:w-40 md:h-40 text-brand-orange group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex-1 p-6 md:p-10 lg:p-12">
                <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">Honesty</p>
                <h3 className="font-display text-2xl md:text-3xl text-[#1A1A1A] dark:text-white mb-6">
                  Work stays in your environment.
                </h3>
                <p className="text-base text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl">
                  Runtime and Workspace run where your data already lives. When you vault, an encrypted copy of
                  the data you selected is stored. Some paths move samples. Appraisal quality-checks that vaulted
                  data. That check is not the purchase. The number inside it is not the price.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-4">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Common <span className="italic text-[#6B7280] dark:text-gray-400">questions</span>
            </h2>
          </div>

          <div className="border-t-2 border-[var(--text-primary)] dark:border-[#333]">
            {LANDING_FAQS.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} delay={faq.delay} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CLOSE CTA ===== */}
      <section className="relative py-20 md:py-28 lg:py-32 px-4 md:px-8 bg-[#F3F1EE] dark:bg-[#0f0f0f] border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
              <div className="hidden lg:flex lg:col-span-1 justify-center">
                <span className="block w-1.5 self-stretch min-h-[10rem] rounded-full bg-brand-orange" aria-hidden />
              </div>

              <div className="lg:col-span-7">
                <span className="lg:hidden block w-12 h-1.5 rounded-full bg-brand-orange mb-8" aria-hidden />
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-[#1A1A1A] dark:text-white">
                  Open access under your control. Keep the archive.
                </h2>
                <p className="mt-6 text-lg md:text-xl text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-xl">
                  Pick files or tables. Lock. Quality-check. Then paid access for a fixed term. When the term ends,
                  access ends.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col lg:items-end gap-6">
                <p className="text-sm text-[#6B7280] dark:text-gray-500 lg:text-right">You set the price.</p>
                <a
                  href={LAUNCH_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Launch Aseryx"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-orange text-black font-medium hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F3F1EE] dark:focus:ring-offset-[#0f0f0f]"
                >
                  Launch Aseryx
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default LandingPage;
