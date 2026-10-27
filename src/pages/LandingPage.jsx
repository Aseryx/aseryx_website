import { useEffect, useRef, useState } from 'react';
import PageLayout from '../components/layout/PageLayout.jsx';
import Button from '../components/common/Button.jsx';
import Eyebrow from '../components/common/Eyebrow.jsx';
import HeroCells from '../components/home/HeroCells.jsx';
import ProofStrip from '../components/home/ProofStrip.jsx';
import BenchmarkTeaser from '../components/home/BenchmarkTeaser.jsx';
import BlogCard from '../components/blog/BlogCard.jsx';
import DatasetCard from '../components/datasets/DatasetCard.jsx';
import Section from '../components/common/Section.jsx';
import SectionHeader from '../components/common/SectionHeader.jsx';
import DATASETS from '../data/datasets.js';
import FaqItem from '../components/common/FaqItem.jsx';
import StepMoment from '../components/product/StepMoment.jsx';
import { usePageMeta } from '../hooks/usePageMeta.jsx';
import { PAGE_META } from '../config/pageMeta.js';
import { TALLY } from '../config/tally.js';
import BLOG_POSTS from '../data/blog/index.js';
import { STEPS } from '../data/steps.js';

/** Primary product door href on this branch (no separate app URL yet). P0: still Tally. */
const LAUNCH_HREF = TALLY.appraisal;

const LANDING_FAQS = [
  {
    question: 'Is the locked dataset a live connection?',
    answer:
      'No. It is a curated snapshot from your database, not a live connection. The live database stays where it is.',
  },
  {
    question: 'What does the certificate prove?',
    answer:
      'That the locked dataset is useful: structure, completeness, distinctiveness, balance. It is not the license and not the price.',
  },
  {
    question: 'What does a license cover?',
    answer:
      'Timed access to the locked dataset only. Not the live database. When the time ends, access ends.',
  },
  {
    question: 'Who is this for?',
    answer:
      'Companies with a live database that want a licensable cut without opening the whole warehouse.',
  },
];


const PATH_STEPS = STEPS;

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
            className={`group w-full text-left pl-5 xl:pl-6 py-6 xl:py-8 border-l-2 -ml-px transition-[border-color,color] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
              isActive ? 'border-brand' : 'border-transparent'
            } ${reducedMotion ? '' : 'duration-200'}`}
          >
            {/* Inactive steps stay at --text-secondary (not faded) so they keep readable contrast */}
            <p className="mb-2 font-mono text-body-sm tabular-nums text-ink-muted">
              {String(index + 1).padStart(2, '0')}
            </p>
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
      <h2 className="max-w-5xl text-display-lg text-ink lg:max-w-6xl">
        One path.{' '}
        <span className="text-ink-secondary">
          From a connected database to access you control for a set time.
        </span>
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
                  className={`inline-flex min-h-10 shrink-0 items-center rounded-lg border px-3 text-body-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page ${
                    isActive
                      ? 'border-transparent bg-btn-primary text-btn-primary-ink'
                      : 'border-border text-ink-secondary hover:bg-hover hover:text-ink'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')} · {step.chip}
                </button>
              );
            })}
          </div>
          <div role="tabpanel" id="how-panel-mobile" aria-labelledby={`how-tab-mobile-${active.id}`}>
            <div className="max-w-md mb-6">
              <h3 className="text-page-title font-semibold text-ink">{active.title}</h3>
              <p className="mt-2 text-body-lg text-ink-secondary">{active.body}</p>
            </div>
            <StepMoment id={active.id} />
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
      <section className="relative flex min-h-[88vh] flex-col justify-center overflow-hidden px-6 pt-28 pb-20 lg:px-10 md:pt-36 md:pb-28">
        <HeroCells />
        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <Eyebrow center>Now in beta</Eyebrow>
          </div>
          <h1
            className="mx-auto max-w-3xl text-display-lg text-ink [text-wrap:balance] md:text-display-xl animate-fade-up anim-delay-100 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            Turn your chosen dataset into a licensable{'\u00A0'}
            <span className="text-brand">asset.</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-[36rem] text-lede text-ink-secondary animate-fade-up anim-delay-200 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            Package and appraise your dataset, get a quality certificate, and grant access for a set time. All on your
            machine.
          </p>

          <div
            className="mt-10 flex flex-wrap justify-center gap-3 animate-fade-up anim-delay-300 opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            <Button href={LAUNCH_HREF} size="lg">
              Join the beta
            </Button>
            <Button href="#how-it-works" variant="standard" size="lg" arrow={false}>
              See how it works
            </Button>
          </div>
        </div>
      </section>

      <ProofStrip />

      <HowPathInteractive />

      {/* ===== DATASETS ===== */}
      <Section aria-labelledby="home-datasets">
        <SectionHeader
          id="home-datasets"
          eyebrow="Datasets"
          title="Profiles you can check"
          lede="Every dataset has a profile its owner approved line by line: what it holds, how it was made, and how it is licensed."
          action={<Button to="/datasets">All datasets</Button>}
        />
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
              eyebrow="Benchmarks"
              title="Readiness, scored the same way every time"
              lede="One formula scores every dataset in a domain, so you can compare before anyone asks for access. Readiness, not price."
              action={
                <Button to="/benchmarks" variant="standard">
                  See the benchmarks
                </Button>
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
          eyebrow="Blog"
          title="Notes on private data licensing"
          action={
            <Button to="/blog" variant="standard">
              All notes
            </Button>
          }
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <li key={post.slug} className="flex">
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      {/* ===== FAQ ===== */}
      <Section aria-labelledby="home-faq">
        <div className="grid gap-10 border-t border-border pt-16 md:pt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="home-faq"
              layout="stack"
              eyebrow="FAQ"
              title="Common questions"
              lede="What a locked dataset, a certificate and a licence are, and what they are not."
              className="!mb-0"
            />
          </div>
          <div className="border-t border-border lg:col-span-8">
            {LANDING_FAQS.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Section>

      {/* ===== CLOSE ===== */}
      <Section tone="secondary" aria-labelledby="home-close">
        <SectionHeader
          id="home-close"
          layout="center"
          eyebrow="Beta"
          title="Grant access on your terms."
          lede="When the time ends, access ends."
          action={
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={LAUNCH_HREF} size="lg">
                Join the beta
              </Button>
              <Button href="#how-it-works" variant="standard" size="lg" arrow={false}>
                See how it works
              </Button>
            </div>
          }
          className="!mb-0"
        />
      </Section>
    </PageLayout>
  );
};

export default LandingPage;
