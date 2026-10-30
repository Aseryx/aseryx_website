import { useEffect, useRef, useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import AseryxHero from '../components/motion/hero/AseryxHero.jsx';
import HeroCells from '../components/home/HeroCells.jsx';
import DotField from '../components/motion/canvas/DotField.jsx';
import HeroVideoBackground from '../components/common/HeroVideoBackground.jsx';
import { HOME_COPY } from '../content/homeCopy.js';
import ProofStrip from '../components/home/ProofStrip.jsx';
import DataKindsTicker from '../components/home/DataKindsTicker.jsx';
import BenchmarkTeaser from '../components/home/BenchmarkTeaser.jsx';
import BlogIndex from '../components/blog/BlogIndex.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import PageClose from '../components/common/PageClose.jsx';
import DATASETS from '../data/datasets.js';
import FaqItem from '../components/common/FaqItem.jsx';
import LoopFrame from '../components/product/LoopFrame.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import BLOG_POSTS from '../data/blog/index.js';

function HowPathInteractive({ steps: PATH_STEPS, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Phones show one step at a time; its loop plays as soon as it shows.
  const pickMobile = setActiveIndex;
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const lockScrollSync = useRef(false);
  const unlockTimer = useRef(0);
  const syncRef = useRef(null);
  const rafRef = useRef(0);
  const active = PATH_STEPS[activeIndex];
  const stepCount = PATH_STEPS.length;

  // Dia model: all screens stack in the page. Active step = which screen is nearest viewport center.
  useEffect(() => {
    if (!isDesktop) return;

    // Looked up once, not on every frame: the screens and tabs stay mounted while this runs.
    const screens = PATH_STEPS.map((step) => document.getElementById(`how-screen-${step.id}`));
    const tabs = PATH_STEPS.map((step) => document.getElementById(`how-tab-${step.id}`));

    const syncFromScroll = () => {
      if (lockScrollSync.current) return;
      const focusY = window.innerHeight * 0.42;
      let best = 0;
      let bestRect = null;
      let bestDist = Infinity;
      screens.forEach((screen, index) => {
        if (!screen) return;
        const rect = screen.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
          bestRect = rect;
        }
      });
      setActiveIndex((prev) => (prev === best ? prev : best));

      // How far the reader is through the active step's screen, as --p on
      // its tab: the coral rail fills with the scroll, driven by the reader
      // instead of a timer.
      if (bestRect && tabs[best]) {
        const progress = Math.min(1, Math.max(0, (focusY - bestRect.top) / bestRect.height));
        tabs[best].style.setProperty('--p', progress.toFixed(3));
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        syncFromScroll();
      });
    };

    syncRef.current = syncFromScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    syncFromScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      // Clear both guards: a frame or a hold left set here would stop the
      // sync for good once the desktop layout comes back.
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.clearTimeout(unlockTimer.current);
      lockScrollSync.current = false;
      syncRef.current = null;
    };
  }, [isDesktop, PATH_STEPS]);

  const selectStep = (index) => {
    setActiveIndex(index);
    const el = document.getElementById(`how-screen-${PATH_STEPS[index].id}`);
    if (!el) return;
    // Hold the scroll sync while this scroll runs, so the steps it passes
    // don't light up. A second pick restarts the hold instead of being cut
    // short by the first pick's timer, and the hold ends with one sync so
    // the rail matches where the scroll landed.
    lockScrollSync.current = true;
    window.clearTimeout(unlockTimer.current);
    // scroll-padding-top (index.css) leaves room above, so the next screen peeks under (Dia)
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    unlockTimer.current = window.setTimeout(
      () => {
        lockScrollSync.current = false;
        syncRef.current?.();
      },
      reducedMotion ? 80 : 900
    );
  };

  // One keyboard model for both step lists: arrows step round, Home and End
  // jump to the ends, and focus moves with the selection so the next press
  // starts from the new tab.
  const onTabKeyDown = (event, index, idPrefix, select) => {
    const next = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1 + stepCount,
      ArrowLeft: index - 1 + stepCount,
      Home: 0,
      End: stepCount - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const target = next % stepCount;
    select(target);
    document.getElementById(`${idPrefix}${PATH_STEPS[target].id}`)?.focus();
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
            onKeyDown={(event) => onTabKeyDown(event, index, 'how-tab-', selectStep)}
            className={`group relative w-full text-left pl-5 xl:pl-6 py-6 xl:py-8 border-l-2 border-border -ml-px transition-colors ${
              reducedMotion ? '' : 'duration-200'
            }`}
          >
            {/* The rail's coral fill: full until the scroll sync sets --p */}
            <span
              className="absolute -left-[2px] top-0 h-full w-[2px] origin-top bg-brand transition-transform duration-150"
              style={{ transform: isActive ? 'scaleY(var(--p, 1))' : 'scaleY(0)' }}
              aria-hidden="true"
            />
            {/* Inactive steps stay at --text-secondary (not faded) so they keep readable contrast */}
            <p className="mb-2 text-body-sm tabular-nums text-ink-muted">Step {index + 1}</p>
            <div className="max-w-[16rem] xl:max-w-[18rem]">
              <h3
                className={`text-heading-lg transition-colors ${
                  isActive
                    ? 'text-ink'
                    : 'text-ink-secondary group-hover:text-ink'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-body-lg overflow-hidden ${
                  isActive
                    ? 'mt-2 max-h-44 opacity-100 text-ink-secondary'
                    : 'mt-0 max-h-0 opacity-0 text-ink-secondary'
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
    >
      <LoopFrame name={step.id} />
    </article>
  );

  const howClaim = (
    <div className="w-full max-w-[90rem] mx-auto px-6 md:px-10 lg:px-16 xl:px-20 pt-16 md:pt-20 lg:pt-24 pb-14 md:pb-16 lg:pb-20">
      <h2 className="max-w-4xl text-display-lg text-ink [text-wrap:balance]">
        {title}
      </h2>
    </div>
  );

  return (
    <section id="how-it-works" className="grid-bg pb-16 md:pb-24 lg:pb-32">
      {howClaim}

      {/* Mobile: chips + one screen */}
      <div className="lg:hidden px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 mb-6" role="tablist" aria-label="How it works steps">
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
                  onClick={() => pickMobile(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index, 'how-tab-mobile-', pickMobile)}
                  className={`inline-flex min-h-10 shrink-0 items-center rounded-lg border px-3 text-body-sm transition-colors ${
                    isActive
                      ? 'border-transparent bg-btn-primary text-btn-primary-ink'
                      : 'border-border text-ink-secondary hover:bg-hover hover:text-ink'
                  }`}
                >
                  {index + 1}. {step.chip}
                </button>
              );
            })}
          </div>
          <div role="tabpanel" id="how-panel-mobile" aria-labelledby={`how-tab-mobile-${active.id}`}>
            <div className="max-w-md mb-6">
              <h3 className="text-page-title font-semibold text-ink">{active.title}</h3>
              <p className="mt-2 text-body-lg text-ink-secondary">{active.body}</p>
            </div>
            <LoopFrame key={active.id} name={active.id} />
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
  const copy = HOME_COPY;
  const { hero } = copy;

  return (
    <PageLayout>
      {/* ===== HERO ===== */}
      <section className="relative flex min-h-[88vh] flex-col overflow-hidden">
        <div className="relative flex flex-1 flex-col justify-center px-6 pt-28 pb-28 md:pt-36 md:pb-24 lg:px-10">
          <HeroVideoBackground src="/hero-bg.mp4" />
          {/* The coral cut holds the hero's motion, a generative canvas: the dot
              field fills the cut and lights up round the pointer, and the logo's
              cube assembles on top of it */}
          <HeroCells>
            <DotField step={18} radius={120} base={0.12} style={{ position: 'absolute', inset: 0 }} />
            <AseryxHero className="w-[78%]" />
          </HeroCells>
          <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
            <h1 className="mx-auto max-w-3xl text-display-lg text-ink [text-wrap:balance] md:text-display-xl">
              {hero.title}
            </h1>

            <p className="mx-auto mt-6 max-w-[36rem] text-lede text-ink-soft [text-wrap:balance]">{hero.lede}</p>

            {/* Stacked on phones, both as wide as the wider one; side by side from sm */}
            <div className="mx-auto mt-10 grid w-fit gap-3 sm:flex sm:w-auto sm:flex-wrap sm:justify-center">
              <CtaButton action="listDataset" size="lg" />
              <CtaButton action={hero.secondaryAction} variant="standard" size="lg" />
            </div>
          </div>
        </div>
        <ProofStrip items={copy.proof} />
      </section>

      <HowPathInteractive steps={copy.steps} title={copy.howTitle} />

      {/* ===== DATASETS ===== */}
      <Section aria-labelledby="home-datasets">
        <SectionHeader
          id="home-datasets"
          title={copy.datasets.title}
          lede={copy.datasets.lede}
          action={<CtaButton action="exploreDatasets" />}
        />
        <DataKindsTicker />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {DATASETS.slice(0, 3).map((dataset) => (
            <li key={dataset.slug} className="flex">
              <DatasetCard dataset={dataset} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== BENCHMARKS ===== */}
      <Section tone="secondary" aria-labelledby="home-benchmarks">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeader
              id="home-benchmarks"
              layout="stack"
              title={copy.benchmarks.title}
              lede={copy.benchmarks.lede}
              action={
                <CtaButton action="seeBenchmarks" variant="standard" />
              }
              className="!mb-0"
            />
          </div>
          <div className="lg:col-span-7">
            <BenchmarkTeaser />
          </div>
        </div>
      </Section>

      {/* ===== BLOG ===== */}
      <Section aria-labelledby="home-blog">
        <SectionHeader
          id="home-blog"
          title="Notes on private data licensing"
          action={
            <CtaButton action="readBlog" variant="standard" />
          }
        />
        <BlogIndex posts={BLOG_POSTS.filter((post) => !post.hideOnHome).slice(0, 3)} />
      </Section>

      {/* ===== FAQ ===== */}
      {/* On the same ground as the blog, so its own rule marks the break: the
          section's top padding on top of the blog's left an empty band */}
      <Section aria-labelledby="home-faq" className="!pt-0">
        <div className="grid gap-10 border-t border-border pt-16 md:pt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="home-faq"
              layout="stack"
              title="Common questions"
              className="!mb-0"
            />
          </div>
          <div className="border-t border-border lg:col-span-8">
            {copy.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Section>

      {/* ===== CLOSE ===== */}
      <PageClose
        id="home-close"
        field
        title={copy.close.title}
        lede={copy.close.lede}
        actions={
          <>
            <CtaButton action="listDataset" size="lg" />
            <CtaButton action={copy.close.secondaryAction} variant="standard" size="lg" />
          </>
        }
      />
    </PageLayout>
  );
};

export default LandingPage;
