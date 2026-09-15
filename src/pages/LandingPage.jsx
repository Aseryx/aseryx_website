import { useEffect, useRef, useState } from 'react';
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
];

const PATH_STEPS = [
  {
    id: 'choose',
    chip: 'Choose',
    title: 'Start with the cut that matters',
    body: 'Choose the file or the tables the term covers.',
    productLabel: 'Step · Choose',
    lightSrc: '/product/workspace-slice-light.png',
    darkSrc: '/product/workspace-slice-dark.png',
    alt: 'Aseryx: select tables and fields for the term',
  },
  {
    id: 'lock',
    chip: 'Lock',
    title: 'Lock the copy before anyone pays',
    body: 'An encrypted copy is stored. See where it sits before you commit.',
    productLabel: 'Step · Lock',
    lightSrc: '/product/vault-light.png',
    darkSrc: '/product/vault-dark.png',
    alt: 'Aseryx: locked datasets ready for a quality check',
  },
  {
    id: 'check',
    chip: 'Check',
    title: 'Prove quality on the locked set',
    body: 'Quality-check the data you locked.',
    productLabel: 'Step · Check',
    lightSrc: '/product/appraisal-light.png',
    darkSrc: '/product/appraisal-dark.png',
    alt: 'Aseryx: quality check on locked data',
  },
  {
    id: 'term',
    chip: 'Term',
    title: 'Open access on a fixed clock',
    body: 'Paid access for a set term. You accept or deny the offer. When the term ends, access ends.',
    productLabel: 'Step · Term',
    lightSrc: '/product/access-light.png',
    darkSrc: '/product/access-dark.png',
    alt: 'Aseryx: grant time-bounded access to selected data',
  },
];

/** Dia asymmetric bento: pill → body → product still. Owner/tool beats only. */
const SITUATIONS = [
  {
    label: 'Tables you keep',
    body: 'Select the tables or fields a term covers. Nothing else is in the deal.',
    slotLabel: 'Tables',
    lightSrc: '/product/workspace-slice-light.png',
    darkSrc: '/product/workspace-slice-dark.png',
    alt: 'Aseryx: select tables and fields for the term',
  },
  {
    label: 'A file for one use',
    body: 'Lock a file, quality-check it, then open access for months you control.',
    slotLabel: 'File',
    lightSrc: '/product/workspace-overview-light.png',
    darkSrc: '/product/workspace-overview-dark.png',
    alt: 'Aseryx: workspace overview for a defined set',
  },
  {
    label: 'Requests you decide',
    body: 'Someone offers a price and a term. You grant or deny. Access ends when the term ends.',
    slotLabel: 'Requests',
    lightSrc: '/product/access-light.png',
    darkSrc: '/product/access-dark.png',
    alt: 'Aseryx: grant or deny time-bounded access',
  },
  {
    label: 'Lock before access',
    body: 'Lock the data before anyone pays. See where the encrypted copy sits before you commit.',
    slotLabel: 'Lock',
    lightSrc: '/product/vault-light.png',
    darkSrc: '/product/vault-dark.png',
    alt: 'Aseryx: locked datasets ready for a quality check',
  },
  {
    label: 'Check is not the sale',
    body: 'Quality-check the locked set. That check is not the purchase. The number is not the price.',
    slotLabel: 'Check',
    lightSrc: '/product/appraisal-light.png',
    darkSrc: '/product/appraisal-dark.png',
    alt: 'Aseryx: quality check on locked data',
  },
  {
    label: 'Term then access ends',
    body: 'Open paid access for a fixed term. When the period ends, access ends.',
    slotLabel: 'Term',
    lightSrc: '/product/pillar-purpose-light.jpg',
    darkSrc: '/product/pillar-purpose-dark.jpg',
    alt: 'Aseryx: purpose-built path for access that expires',
  },
];

/** Desktop row spans: wide/narrow alternating (Dia bento). */
const BENTO_ROWS = [
  [
    { item: SITUATIONS[0], wide: true },
    { item: SITUATIONS[1], wide: false },
  ],
  [
    { item: SITUATIONS[2], wide: false },
    { item: SITUATIONS[3], wide: true },
  ],
  [
    { item: SITUATIONS[4], wide: true },
    { item: SITUATIONS[5], wide: false },
  ],
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

function useDesktopHowScrub() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return enabled;
}

function HowPathInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useDesktopHowScrub();
  const lockScrollSync = useRef(false);
  const rafRef = useRef(0);
  const active = PATH_STEPS[activeIndex];
  const stepCount = PATH_STEPS.length;

  // Dia model: all screens stack in the page. Active step = which screen is nearest viewport center.
  useEffect(() => {
    if (!isDesktop) return;

    const syncFromScroll = () => {
      if (lockScrollSync.current) return;
      const focusY = window.innerHeight * 0.42;
      let best = 0;
      let bestDist = Infinity;
      PATH_STEPS.forEach((step, index) => {
        const el = document.getElementById(`how-screen-${step.id}`);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      setActiveIndex((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        syncFromScroll();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', syncFromScroll);
    syncFromScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', syncFromScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop]);

  const selectStep = (index) => {
    setActiveIndex(index);
    const el = document.getElementById(`how-screen-${PATH_STEPS[index].id}`);
    if (!el) return;
    lockScrollSync.current = true;
    // Leave bottom room so the next screen peeks under (Dia), not a dead flush crop
    const top = window.scrollY + el.getBoundingClientRect().top;
    const targetY = Math.max(0, top - 96);
    window.scrollTo({
      top: targetY,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
    window.setTimeout(
      () => {
        lockScrollSync.current = false;
      },
      reducedMotion ? 80 : 900
    );
  };

  const onStepKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const next = (index + 1) % stepCount;
      selectStep(next);
      document.getElementById(`how-tab-${PATH_STEPS[next].id}`)?.focus();
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = (index - 1 + stepCount) % stepCount;
      selectStep(prev);
      document.getElementById(`how-tab-${PATH_STEPS[prev].id}`)?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectStep(0);
      document.getElementById(`how-tab-${PATH_STEPS[0].id}`)?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      const last = stepCount - 1;
      selectStep(last);
      document.getElementById(`how-tab-${PATH_STEPS[last].id}`)?.focus();
    }
  };

  const stepList = (
    <div
      className="space-y-0"
      role="tablist"
      aria-label="How it works steps"
      aria-orientation="vertical"
    >
      {PATH_STEPS.map((step, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={step.id}
            type="button"
            role="tab"
            id={`how-tab-${step.id}`}
            aria-selected={isActive}
            aria-controls={`how-screen-${step.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => selectStep(index)}
            onKeyDown={(event) => onStepKeyDown(event, index)}
            className={`group w-full text-left pl-5 xl:pl-6 py-6 xl:py-8 border-l-2 -ml-px transition-[border-color,opacity,color] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${
              isActive
                ? 'border-brand-orange opacity-100'
                : 'border-transparent opacity-40 hover:opacity-70'
            } ${reducedMotion ? '' : 'duration-200'}`}
          >
            <p className="font-mono text-xs uppercase tracking-wider mb-2 text-[#9CA3AF] dark:text-gray-500">
              {String(index + 1).padStart(2, '0')}
            </p>
            <div className="max-w-[16rem] xl:max-w-[18rem]">
              <h3
                className={`font-display text-lg xl:text-xl leading-snug tracking-tight ${
                  isActive ? 'text-[#111111] dark:text-white' : 'text-[#9CA3AF] dark:text-gray-500'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-base xl:text-lg leading-relaxed overflow-hidden ${
                  isActive
                    ? 'mt-2 max-h-44 opacity-100 text-[#6B7280] dark:text-[#9CA3AF]'
                    : 'mt-0 max-h-0 opacity-0 text-[#6B7280] dark:text-[#9CA3AF]'
                } ${reducedMotion ? '' : 'transition-all duration-300 ease-out'}`}
                aria-hidden={!isActive}
              >
                {step.body}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );

  const screenCard = (step) => (
    <article
      key={step.id}
      id={`how-screen-${step.id}`}
      role="tabpanel"
      aria-labelledby={`how-tab-${step.id}`}
      className="scroll-mt-28"
    >
      {/* Natural still size — full PNG, no aspect box crop */}
      <div className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[#EDEBE8] dark:bg-[#0c0c0c] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_60px_-24px_rgba(0,0,0,0.75)]">
        <ProductPlaceholder
          label={step.productLabel}
          lightSrc={step.lightSrc}
          darkSrc={step.darkSrc}
          alt={step.alt}
          aspect="auto"
          fit="natural"
          className="[&>div]:rounded-none [&>div]:border-0"
        />
      </div>
    </article>
  );

  const howClaim = (
    <div className="w-full max-w-[90rem] mx-auto px-6 md:px-10 lg:px-16 xl:px-20 pt-16 md:pt-20 lg:pt-24 pb-14 md:pb-16 lg:pb-20">
      <h2 className="font-display text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] leading-[1.2] tracking-tight max-w-5xl lg:max-w-6xl text-justify">
        One path for the data you choose.{' '}
        <span className="text-[#6B7280] dark:text-gray-400">
          Choose it. Check it. Open paid access for a term you control.
        </span>
      </h2>
    </div>
  );

  return (
    <section id="how-it-works" className="grid-bg pb-16 md:pb-24 lg:pb-32">
      {howClaim}

      {/* Mobile: chips + one screen */}
      <div className="lg:hidden px-4 md:px-8" role="tablist" aria-label="How it works steps">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-6">
            {PATH_STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  id={`how-tab-mobile-${step.id}`}
                  aria-selected={isActive}
                  aria-controls="how-panel-mobile"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                      event.preventDefault();
                      setActiveIndex((prev) => (prev + 1) % stepCount);
                    } else if (event.key === 'ArrowLeft') {
                      event.preventDefault();
                      setActiveIndex((prev) => (prev - 1 + stepCount) % stepCount);
                    }
                  }}
                  className={`shrink-0 px-4 py-2 font-mono text-xs uppercase tracking-wider border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] ${
                    isActive
                      ? 'border-brand-orange text-[#1A1A1A] dark:text-white bg-[#EDEBE8] dark:bg-[#111111]'
                      : 'border-[var(--border-color)] text-[#6B7280] dark:text-gray-500 hover:text-[#1A1A1A] dark:hover:text-white'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')} · {step.chip}
                </button>
              );
            })}
          </div>
          <div role="tabpanel" id="how-panel-mobile" aria-labelledby={`how-tab-mobile-${active.id}`}>
            <div className="max-w-md mb-6">
              <h3 className="font-display text-2xl text-[#111111] dark:text-white leading-tight tracking-tight">
                {active.title}
              </h3>
              <p className="mt-2 text-[#6B7280] dark:text-[#9CA3AF] text-base leading-relaxed">{active.body}</p>
            </div>
            <ProductPlaceholder
              key={reducedMotion ? active.id : undefined}
              label={active.productLabel}
              lightSrc={active.lightSrc}
              darkSrc={active.darkSrc}
              alt={active.alt}
              aspect="wide"
              className={reducedMotion ? '' : 'transition-opacity duration-300'}
            />
          </div>
        </div>
      </div>

      {/* Desktop Dia: sticky steps + stacked screens — wide gutter, floating stills */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(15rem,0.28fr)_minmax(0,1fr)] gap-20 xl:gap-28 2xl:gap-32 items-start w-full max-w-[90rem] mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <aside className="sticky top-28 self-start z-10 pr-2">{stepList}</aside>
        <div className="flex flex-col gap-24 xl:gap-32 2xl:gap-36 pb-20 max-w-[42rem] xl:max-w-[46rem] 2xl:max-w-[50rem]">
          {PATH_STEPS.map(screenCard)}
        </div>
      </div>
    </section>
  );
}

function SituationCard({ item }) {
  return (
    <article className="flex h-full min-h-[22rem] md:min-h-[26rem] flex-col overflow-hidden rounded-[1.75rem] bg-[#E8E4DE]/90 dark:bg-[#141414] border border-[#E0DBD4] dark:border-[#1F2937] p-6 md:p-8">
      <h3 className="font-display text-2xl md:text-3xl leading-tight tracking-tight text-[#111111] dark:text-white max-w-md">
        {item.label}
      </h3>
      <p className="mt-3 md:mt-4 text-base md:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-md">
        {item.body}
      </p>
      <div className="mt-auto pt-8 -mx-6 -mb-6 md:-mx-8 md:-mb-8">
        <ProductPlaceholder
          label={item.slotLabel}
          lightSrc={item.lightSrc}
          darkSrc={item.darkSrc}
          alt={item.alt}
          aspect="wide"
          className="[&>div]:rounded-none [&>div]:rounded-t-xl [&>div]:border-x-0 [&>div]:border-b-0"
        />
      </div>
    </article>
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
            Where valuable data enters the world through secure access.
          </h1>

          <p
            className="text-base md:text-lg text-[#6B7280] dark:text-gray-300 leading-relaxed mb-10 max-w-xl animate-fade-up delay-200 opacity-0"
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
            Designed for access that expires. The archive stays yours.
          </p>
        </div>
      </section>

      <RiskBand items={['Defined scope', 'See where data sits', 'Access expires']} />

      <HowPathInteractive />

      {/* ===== WHEN YOU OWN THE DATA — Dia asymmetric bento ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-[#F3F1EE] dark:bg-[#0c0c0c] border-y border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Same claim unit as How: lead + muted support, one block, text-justify */}
          <div className="mb-12 md:mb-16 lg:mb-20 w-full">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-[#1A1A1A] dark:text-white max-w-6xl text-justify">
              When you own the data.{' '}
              <span className="text-[#6B7280] dark:text-gray-400">
                You pick what can be accessed. You decide the term. The archive stays yours.
              </span>
            </h2>
          </div>

          {/* Mobile: single column, card order preserved */}
          <div className="flex flex-col gap-4 md:gap-5 lg:hidden">
            {SITUATIONS.map((item) => (
              <ScrollReveal key={item.label}>
                <SituationCard item={item} />
              </ScrollReveal>
            ))}
          </div>

          {/* Desktop: three alternating wide/narrow rows */}
          <div className="hidden lg:flex lg:flex-col gap-5">
            {BENTO_ROWS.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid gap-5 ${
                  rowIndex === 0
                    ? 'grid-cols-[3fr_2fr]'
                    : rowIndex === 1
                      ? 'grid-cols-[7fr_13fr]'
                      : 'grid-cols-[13fr_7fr]'
                }`}
              >
                {row.map(({ item }) => (
                  <ScrollReveal key={item.label} delay={(rowIndex + 1) * 60}>
                    <SituationCard item={item} />
                  </ScrollReveal>
                ))}
              </div>
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
                  When the term ends, access ends.
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
