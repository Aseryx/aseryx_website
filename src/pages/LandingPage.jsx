import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import HeroVideoBackground from '../components/common/HeroVideoBackground.jsx';
import PageLayout from '../components/layout/PageLayout.jsx';
import RiskBand from '../components/common/RiskBand.jsx';
import FaqItem from '../components/common/FaqItem.jsx';
import ProductPlaceholder from '../components/common/ProductPlaceholder.jsx';
import { GeometricPrism } from '../components/common/GeometricIllustrations.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';

/** Primary product door href on this branch (no separate app URL yet). P0: still Tally. */
const LAUNCH_HREF = TALLY.appraisal;

const LANDING_FAQS = [
  {
    question: 'What do I sell?',
    answer: 'Time-limited access to selected data. Not your whole dataset.',
    delay: 100,
  },
  {
    question: 'Is the quality number the price?',
    answer:
      'No. The number describes the data you locked. The buyer offers an amount; you accept or deny.',
    delay: 200,
  },
  {
    question: 'Can I take access back early?',
    answer: 'No. Access runs for the months sold. Then it ends.',
    delay: 300,
  },
  {
    question: 'Does this put me on a public catalog?',
    answer:
      'A completed quality check can still show on a public list today. The path here is a private license, not a storefront.',
    delay: 400,
  },
  {
    question: 'Who is this for?',
    answer: 'People who own data and can license a specific use.',
    delay: 500,
  },
];

const PATH_STEPS = [
  {
    id: 'choose',
    title: 'Choose',
    body: 'Choose the file or the tables the term covers.',
    productLabel: 'Step · Choose',
    lightSrc: '/product/workspace-slice-light.png',
    darkSrc: '/product/workspace-slice-dark.png',
    alt: 'Aseryx: select tables and fields for the term',
  },
  {
    id: 'lock',
    title: 'Lock',
    body: 'Lock that data before anyone pays. An encrypted copy is stored. See where it sits before you commit.',
    productLabel: 'Step · Lock',
    lightSrc: '/product/vault-light.png',
    darkSrc: '/product/vault-dark.png',
    alt: 'Aseryx: locked datasets ready for a quality check',
  },
  {
    id: 'check',
    title: 'Check',
    body: 'Quality-check the data you locked.',
    productLabel: 'Step · Check',
    lightSrc: '/product/appraisal-light.png',
    darkSrc: '/product/appraisal-dark.png',
    alt: 'Aseryx: quality check on locked data',
  },
  {
    id: 'term',
    title: 'Term',
    body: 'Open paid access for 3, 6, 9, or 12 months. You accept or deny the offer. When the period ends, access ends.',
    productLabel: 'Step · Term',
    lightSrc: '/product/access-light.png',
    darkSrc: '/product/access-dark.png',
    alt: 'Aseryx: grant time-bounded access to selected data',
  },
];

const SITUATIONS = [
  {
    label: 'Tables you keep',
    body: 'Select the tables or fields a term covers. Nothing else is in the deal.',
  },
  {
    label: 'A file for one use',
    body: 'Lock a file, quality-check it, then open access for months you control.',
  },
  {
    label: 'Requests you decide',
    body: 'Someone offers a price and a term. You grant or deny. Access ends when the term ends.',
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}

function HowPathInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const active = PATH_STEPS[activeIndex];

  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
      <div className="max-w-7xl mx-auto relative z-10">
        <p className="font-mono text-brand-orange text-xs tracking-widest uppercase mb-10 md:mb-14">
          How it works
        </p>

        {/* Mobile: horizontal step chips above one screen */}
        <div className="lg:hidden mb-8" role="tablist" aria-label="How it works steps">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {PATH_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`how-tab-mobile-${step.id}`}
                  aria-selected={isActive}
                  aria-controls="how-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                      event.preventDefault();
                      setActiveIndex((prev) => (prev + 1) % PATH_STEPS.length);
                    } else if (event.key === 'ArrowLeft') {
                      event.preventDefault();
                      setActiveIndex((prev) => (prev - 1 + PATH_STEPS.length) % PATH_STEPS.length);
                    }
                  }}
                  className={`shrink-0 px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${
                    isActive
                      ? 'border-brand-orange text-[#1A1A1A] dark:text-white bg-[#EDEBE8] dark:bg-[#111111]'
                      : 'border-[var(--border-color)] text-[#6B7280] dark:text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')} · {step.title}
                </button>
              );
            })}
          </div>
          <div className="mt-6" role="tabpanel" id="how-panel" aria-labelledby={`how-tab-mobile-${active.id}`}>
            <h3 className="font-display text-2xl text-[#1A1A1A] dark:text-white mb-3 leading-tight tracking-tight">
              {active.title}
            </h3>
            <p className="text-[#6B7280] dark:text-gray-400 text-base leading-relaxed mb-6 max-w-md">
              {active.body}
            </p>
            <ProductPlaceholder
              key={reducedMotion ? active.id : undefined}
              label={active.productLabel}
              lightSrc={active.lightSrc}
              darkSrc={active.darkSrc}
              alt={active.alt}
              aspect="video"
              className={reducedMotion ? '' : 'transition-opacity duration-200'}
            />
          </div>
        </div>

        {/* Desktop: left steps / right one large screen */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          <div className="lg:col-span-4" role="tablist" aria-label="How it works steps" aria-orientation="vertical">
            <div className="space-y-0 border-l border-[var(--border-color)]">
              {PATH_STEPS.map((step, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    id={`how-tab-${step.id}`}
                    aria-selected={isActive}
                    aria-controls="how-panel-desktop"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                        event.preventDefault();
                        const next = (index + 1) % PATH_STEPS.length;
                        setActiveIndex(next);
                        document.getElementById(`how-tab-${PATH_STEPS[next].id}`)?.focus();
                      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                        event.preventDefault();
                        const prev = (index - 1 + PATH_STEPS.length) % PATH_STEPS.length;
                        setActiveIndex(prev);
                        document.getElementById(`how-tab-${PATH_STEPS[prev].id}`)?.focus();
                      } else if (event.key === 'Home') {
                        event.preventDefault();
                        setActiveIndex(0);
                        document.getElementById(`how-tab-${PATH_STEPS[0].id}`)?.focus();
                      } else if (event.key === 'End') {
                        event.preventDefault();
                        const last = PATH_STEPS.length - 1;
                        setActiveIndex(last);
                        document.getElementById(`how-tab-${PATH_STEPS[last].id}`)?.focus();
                      }
                    }}
                    className={`group w-full text-left pl-6 py-5 border-l-2 -ml-px transition-[border-color,opacity,color] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${
                      isActive
                        ? 'border-brand-orange opacity-100'
                        : 'border-transparent opacity-45 hover:opacity-75'
                    } ${reducedMotion ? '' : 'duration-200'}`}
                  >
                    <p
                      className={`font-mono text-xs uppercase tracking-wider mb-2 ${
                        isActive ? 'text-brand-orange' : 'text-[#6B7280] dark:text-gray-500'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3
                      className={`font-display text-2xl xl:text-3xl leading-tight tracking-tight ${
                        isActive
                          ? 'text-[#1A1A1A] dark:text-white'
                          : 'text-[#6B7280] dark:text-gray-400'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-[#6B7280] dark:text-gray-400 text-base leading-relaxed max-w-sm overflow-hidden ${
                        isActive ? 'mt-3 max-h-40 opacity-100' : 'mt-0 max-h-0 opacity-0'
                      } ${reducedMotion ? '' : 'transition-all duration-200'}`}
                      aria-hidden={!isActive}
                    >
                      {step.body}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="lg:col-span-8"
            role="tabpanel"
            id="how-panel-desktop"
            aria-labelledby={`how-tab-${active.id}`}
          >
            <ProductPlaceholder
              key={active.id}
              label={active.productLabel}
              lightSrc={active.lightSrc}
              darkSrc={active.darkSrc}
              alt={active.alt}
              aspect="video"
              className={reducedMotion ? '' : 'transition-opacity duration-200'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const LandingPage = () => {
  usePageMeta({ ...PAGE_META['/'], path: '/' });

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
            Your data hub. Access on your terms.
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed mb-4 max-w-xl animate-fade-up delay-200 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            <span className="box-decoration-clone bg-brand-orange text-black px-2.5 py-1">
              Pick the files or tables. Decide who gets access and for how long. Keep the archive.
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
            You accept or deny the offer. Access ends when the term ends.
          </p>
        </div>
      </section>

      <RiskBand items={['Defined scope', 'See where data sits', 'Access expires']} />

      <HowPathInteractive />

      {/* ===== WHEN YOU OWN THE DATA ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="section-divider pt-8 md:pt-12 mb-12 md:mb-16 max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-[#1A1A1A] dark:text-white">
              When you own the data
            </h2>
            <p className="mt-5 text-base md:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed">
              You pick what can be accessed. You decide the term. The archive stays yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
            {SITUATIONS.map((item, index) => (
              <ScrollReveal key={item.label} delay={(index + 1) * 80}>
                <div>
                  <p className="font-mono text-xs text-brand-orange mb-4 uppercase tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl text-[#1A1A1A] dark:text-white mb-3 leading-tight tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-[#6B7280] dark:text-gray-400 text-base leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
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
                  Your data stays where it lives.
                </h3>
                <p className="text-base text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl">
                  The tool runs where your data already lives. When you vault, an encrypted copy of the data you
                  selected is stored. Some paths move samples. Appraisal quality-checks that vaulted data. That
                  check is not the purchase. The number inside it is not the price.
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
                  Access on your terms. Keep the archive.
                </h2>
              </div>

              <div className="lg:col-span-4 flex flex-col lg:items-end gap-6">
                <p className="text-sm text-[#6B7280] dark:text-gray-500 lg:text-right">
                  You accept or deny the offer.
                </p>
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
