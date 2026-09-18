import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../hooks/useScrollReveal.jsx';
import ParticlesBackground from '../components/common/ParticlesBackground.jsx';
import HeroVideoBackground from '../components/common/HeroVideoBackground.jsx';
import PageLayout from '../components/layout/PageLayout.jsx';
import RiskBand from '../components/common/RiskBand.jsx';
import FaqItem from '../components/common/FaqItem.jsx';
import ProductPlaceholder from '../components/common/ProductPlaceholder.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';
import BLOG_POSTS from '../data/blog/index.js';
import { formatDate } from '../utils/formatDate.js';

/** Primary product door href on this branch (no separate app URL yet). P0: still Tally. */
const LAUNCH_HREF = TALLY.appraisal;

const LANDING_FAQS = [
  {
    question: 'What does Aseryx do?',
    answer:
      'Turn a live database into a verifiable, licensable asset without giving access to the entire database.',
    delay: 100,
  },
  {
    question: 'What gets locked?',
    answer:
      'A structured dataset: tables and fields that belong together. Not the entire database. Work stays on your machine, within your own infrastructure. Some setups move samples through our cloud; we say which path you are on before you commit.',
    delay: 150,
  },
  {
    question: 'What is the quality certificate?',
    answer:
      'Proof the locked dataset is useful. Verify confirms quality. It is not the license.',
    delay: 200,
  },
  {
    question: 'How does access work?',
    answer:
      'You license the verified dataset on your terms. When the time ends, access ends. Without handing the database to a third party.',
    delay: 250,
  },
];

const FEATURED_POST = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0];

const PATH_STEPS = [
  {
    id: 'connect',
    chip: 'Connect',
    title: 'Connect your database',
    body: 'Query the tables and fields with high utility. Stay within your own infrastructure.',
    productLabel: 'Step · Connect',
    lightSrc: '/product/workspace-overview-light.png',
    darkSrc: '/product/workspace-overview-dark.png',
    alt: 'Aseryx: connect a live database',
  },
  {
    id: 'lock',
    chip: 'Lock',
    title: 'Lock a dataset',
    body: 'Curate a structured cut. Not the entire database.',
    productLabel: 'Step · Lock',
    lightSrc: '/product/vault-light.png',
    darkSrc: '/product/vault-dark.png',
    alt: 'Aseryx: locked dataset cut from a live database',
  },
  {
    id: 'verify',
    chip: 'Verify',
    title: 'Verify its quality',
    body: 'Confirm the dataset is useful. Get a verifiable quality certificate.',
    productLabel: 'Step · Verify',
    lightSrc: '/product/appraisal-light.png',
    darkSrc: '/product/appraisal-dark.png',
    alt: 'Aseryx: quality certificate on a locked dataset',
  },
  {
    id: 'control',
    chip: 'Control',
    title: 'Control access',
    body: 'License the verified dataset on your terms. When the time ends, access ends.',
    productLabel: 'Step · Control',
    lightSrc: '/product/access-light.png',
    darkSrc: '/product/access-dark.png',
    alt: 'Aseryx: control access to a verified dataset',
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
        One path.{' '}
        <span className="text-[#6B7280] dark:text-gray-400">
          From a connected database to access you control for a set time.
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

const LandingPage = () => {
  usePageMeta({ ...PAGE_META['/'], path: '/' });

  return (
    <PageLayout>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 md:pt-32 md:pb-24 grid-bg overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <HeroVideoBackground src="/hero-bg.mp4" />
          <img
            src="/hero-bg-new.jpg"
            alt=""
            className="absolute top-0 right-0 w-full md:w-[70%] h-full object-cover object-top md:object-[center_20%] grayscale opacity-45 dark:opacity-25 mix-blend-multiply dark:mix-blend-screen pointer-events-none"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 5%, black 35%), linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 5%, black 35%), linear-gradient(to bottom, black 80%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in',
            }}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F9F8F6]/88 via-[#F9F8F6]/60 to-[#F9F8F6]/25 dark:from-[#0a0a0a]/88 dark:via-[#0a0a0a]/45 dark:to-transparent" />
          <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_80%_30%,rgba(235,94,40,0.08),transparent_55%)]" />
          <ParticlesBackground />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 text-left">
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 animate-fade-up delay-100 opacity-0 max-w-4xl text-[#111111] dark:text-white"
            style={{ animationFillMode: 'forwards' }}
          >
            Turn your chosen dataset into a licensable{'\u00A0'}
            <span className="text-brand-orange">asset.</span>
          </h1>

          <p
            className="text-base md:text-lg text-[#6B7280] dark:text-gray-300 leading-relaxed mb-10 max-w-xl animate-fade-up delay-200 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            Package and appraise your dataset, get a quality certificate, and grant access for a set time. All
            on your machine.
          </p>

          <div
            className="animate-fade-up delay-300 opacity-0 flex flex-wrap gap-4"
            style={{ animationFillMode: 'forwards' }}
          >
            <a
              href={LAUNCH_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the beta"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-orange text-black font-medium tracking-wide text-sm uppercase hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F9F8F6] dark:focus:ring-offset-[#0a0a0a]"
            >
              Join the beta
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <RiskBand items={['On your machine', 'Quality certificate', 'Dataset you can license']} />

      <HowPathInteractive />

      {/* ===== BLOG ===== */}
      {FEATURED_POST && (
        <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 grid-bg">
          <div className="max-w-7xl mx-auto relative z-10">
            <ScrollReveal>
              <div className="flex items-center justify-between gap-4 mb-10 md:mb-14">
                <p className="font-mono text-brand-orange text-xs tracking-widest uppercase">Blog</p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-[#6B7280] dark:text-gray-400 hover:text-brand-orange transition-colors"
                >
                  All notes
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <Link to={`/blog/${FEATURED_POST.slug}`} className="group block">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start section-divider pt-8 md:pt-10">
                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">
                        {formatDate(FEATURED_POST.date)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                      <span className="font-mono text-xs text-[#6B7280] dark:text-gray-500">
                        {FEATURED_POST.readTime}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#6B7280] dark:bg-gray-500" />
                      <span className="font-mono text-xs text-brand-orange uppercase tracking-wider">
                        {FEATURED_POST.category}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl leading-[1.1] tracking-tight text-[#1A1A1A] dark:text-white mb-4 group-hover:text-brand-orange transition-colors duration-300 max-w-3xl">
                      {FEATURED_POST.title}
                    </h2>
                    <p className="text-base md:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl mb-6">
                      {FEATURED_POST.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-medium group-hover:gap-3 transition-all">
                      Read
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

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
                  Grant access on your terms.
                </h2>
              </div>

              <div className="lg:col-span-4 flex flex-col lg:items-end gap-6">
                <p className="text-sm text-[#6B7280] dark:text-gray-500 lg:text-right">
                  When the time ends, access ends.
                </p>
                <a
                  href={LAUNCH_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Join the beta"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-orange text-black font-medium hover:bg-[#1A1A1A] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 focus:ring-offset-[#F3F1EE] dark:focus:ring-offset-[#0f0f0f]"
                >
                  Join the beta
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
