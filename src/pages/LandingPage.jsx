import { useEffect, useRef, useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import CtaButton from '../components/common/CtaButton.jsx';
import HeroCells from '../components/home/HeroCells.jsx';
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
import StepMoment from '../components/product/StepMoment.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import BLOG_POSTS from '../data/blog/index.js';





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

function HowPathInteractive({ steps: PATH_STEPS, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Phones show one screen at a time: once a chip is tapped, the screen it
  // opens plays its step straight away rather than waiting to scroll in.
  const [tapped, setTapped] = useState(false);
  const pickMobile = (index) => {
    setTapped(true);
    setActiveIndex(index);
  };
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

      // How far the reader is through the active step's screen, as --p on
      // its tab: the coral rail fills with the scroll (DataVendor's
      // how-it-works progress, driven by the reader instead of a timer).
      const screen = document.getElementById(`how-screen-${PATH_STEPS[best].id}`);
      const tab = document.getElementById(`how-tab-${PATH_STEPS[best].id}`);
      if (screen && tab) {
        const rect = screen.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, (focusY - rect.top) / rect.height));
        tab.style.setProperty('--p', progress.toFixed(3));
      }
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
  }, [isDesktop, PATH_STEPS]);

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
            className={`group relative w-full text-left pl-5 xl:pl-6 py-6 xl:py-8 border-l-2 border-border -ml-px transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
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
      className="scroll-mt-28"
    >
      <StepMoment id={step.id} />
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
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                      event.preventDefault();
                      pickMobile((index + 1) % stepCount);
                    } else if (event.key === 'ArrowLeft') {
                      event.preventDefault();
                      pickMobile((index - 1 + stepCount) % stepCount);
                    }
                  }}
                  className={`inline-flex min-h-10 shrink-0 items-center rounded-lg border px-3 text-body-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
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
            <StepMoment key={active.id} id={active.id} immediate={tapped} />
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
          <HeroCells />
          <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
            <h1 className="mx-auto max-w-3xl text-display-lg text-ink [text-wrap:balance] md:text-display-xl">
              {hero.title}
            </h1>

            <p className="mx-auto mt-6 max-w-[36rem] text-lede text-ink-secondary [text-wrap:balance]">{hero.lede}</p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <CtaButton action="becomeProvider" size="lg" />
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
        {/* The broker post stays on /blog but not on Home (Notion > Aseryx Messaging, rollout list) */}
        <BlogIndex posts={BLOG_POSTS.filter((post) => post.slug !== 'whos-really-making-money-off-your-data').slice(0, 3)} />
      </Section>

      {/* ===== FAQ ===== */}
      <Section aria-labelledby="home-faq">
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
        title={copy.close.title}
        lede={copy.close.lede}
        actions={
          <>
            <CtaButton action="becomeProvider" size="lg" />
            <CtaButton action={copy.close.secondaryAction} variant="standard" size="lg" />
          </>
        }
      />
    </PageLayout>
  );
};

export default LandingPage;
