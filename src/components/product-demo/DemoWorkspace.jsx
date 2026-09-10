import { Check } from 'lucide-react';
import { WORKSPACE_CONNECTION, WORKSPACE_SLICES } from './demoData.js';

const STAGES = [
  { id: 'explore', step: 1, label: 'Scan', hint: 'Ranked slices' },
  { id: 'structure', step: 2, label: 'Slice', hint: 'Tables & fields' },
  { id: 'review', step: 3, label: 'Upload', hint: 'Commit to Vault' },
];

const lift =
  'shadow-[0_2px_3px_-1px_rgba(15,23,42,0.07)] dark:shadow-[0_2px_3px_-1px_rgba(0,0,0,0.45)]';

const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-md border border-[#D4D2C9] bg-[#F0EFE8] px-3 py-1.5 text-[12px] font-medium whitespace-nowrap text-[#57534A] transition-colors duration-150 hover:bg-[#E9E7E0] hover:text-[#1D1B16] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#C4C4C8] dark:hover:bg-white/[0.10] dark:hover:text-white';

const btnInverse =
  'inline-flex items-center justify-center gap-2 rounded-md bg-[#1D1B16] px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#2A2822] dark:bg-white dark:text-[#1D1B16] dark:hover:bg-gray-100';

function ScoreMeter({ value }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#9B948A] dark:text-gray-500">
        Estimated score
      </p>
      <p className="mt-0.5 text-[13px] font-medium tabular-nums text-[#1D1B16] dark:text-white">
        {clamped}
        <span className="font-normal text-[#9B948A] dark:text-gray-500"> / 100</span>
      </p>
      <div
        className="mt-1.5 h-1.5 w-full min-w-[4.5rem] max-w-[6rem] overflow-hidden rounded-full bg-[#E4E4E7] dark:bg-white/10"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Estimated score ${clamped} of 100`}
      >
        <div
          className="h-full rounded-full bg-[#1D1B16] transition-[width] duration-300 dark:bg-white"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

function BuilderStageRail() {
  const activeIndex = 0;
  return (
    <nav
      aria-label="Discovery workflow"
      className={`w-full overflow-hidden border border-[#E4E2DA] bg-white dark:border-[#232328] dark:bg-[#141416] ${lift}`}
    >
      <ol className="grid grid-cols-3 divide-x divide-[#E4E2DA] dark:divide-[#232328]">
        {STAGES.map((stage, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          const disabled = stage.id !== 'explore';
          return (
            <li key={stage.id} className="min-w-0">
              <button
                type="button"
                disabled={disabled}
                aria-current={isActive ? 'step' : undefined}
                className={`w-full px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1D1B16]/20 dark:focus-visible:ring-white/20 sm:px-4 ${
                  disabled
                    ? 'cursor-not-allowed opacity-45'
                    : 'hover:bg-[#F4F4F5] dark:hover:bg-white/[0.04]'
                } ${isActive ? 'bg-[#F4F4F5] dark:bg-white/[0.06]' : ''}`}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      isComplete
                        ? 'bg-[#D4D4D8] text-[#1D1B16] dark:bg-white/25 dark:text-white'
                        : isActive
                          ? 'bg-[#1D1B16] text-white dark:bg-white dark:text-[#1D1B16]'
                          : 'bg-[#E4E4E7] text-[#71717A] dark:bg-white/10 dark:text-gray-500'
                    }`}
                  >
                    {isComplete ? <Check className="h-3 w-3" strokeWidth={2.5} /> : stage.step}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block truncate text-[13px] ${
                        isActive
                          ? 'font-semibold text-[#1D1B16] dark:text-white'
                          : 'font-medium text-[#9B948A] dark:text-gray-500'
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span
                      className={`mt-0.5 hidden truncate text-[11px] sm:block ${
                        isActive
                          ? 'text-[#57534A] dark:text-[#8B8B92]'
                          : 'text-[#9B948A] dark:text-gray-500'
                      }`}
                    >
                      {stage.hint}
                    </span>
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Workspace Discovery Scan results — ExploreStage + Workspace explore chrome
 * from aseryx_demo@demo/screenshot-ready-seed.
 */
export default function DemoWorkspace() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-white font-sans dark:bg-[#121214]">
      <div className="sticky top-0 z-30 flex-shrink-0 border-b border-[#ECEAE2] bg-white/95 px-5 pb-3.5 pt-3 backdrop-blur-md dark:border-[#1E1E22] dark:bg-[#121214]/95 lg:px-8">
        <p className="text-[11px] font-medium leading-[1.2] text-[#9B948A] dark:text-gray-500">
          <span>Tools</span>
          <span className="mx-1.5 opacity-50">/</span>
          <span>Workspace</span>
        </p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-[22px] font-medium leading-tight tracking-[-0.02em] text-[#1D1B16] dark:text-white sm:text-[24px]">
              Workspace
            </h1>
            <p className="mt-1 max-w-[36rem] truncate text-[12px] leading-[1.4] text-[#9B948A] dark:text-gray-500">
              Scan and refine slices from linked sources.
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b border-[#E4E2DA] bg-white dark:border-[#232328] dark:bg-[#141416]">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-2 lg:px-8">
          <button type="button" className={btnSecondary}>
            Back
          </button>
          <span className="text-[12px] text-[#57534A] dark:text-[#8B8B92]">
            Pick a slice starter to refine
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-6xl space-y-5 px-5 py-5 pb-10 lg:px-8">
          <BuilderStageRail />

          <div className="space-y-6">
            <section>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A] dark:text-white">
                Scanned from
              </h3>
              <div
                className={`overflow-hidden border border-[#E4E2DA] bg-white dark:border-[#232328] dark:bg-[#141416] ${lift}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-[15px] font-semibold text-[#1D1B16] dark:text-white">
                      {WORKSPACE_CONNECTION.name}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[12px] text-[#9B948A] dark:text-gray-500">
                      {WORKSPACE_CONNECTION.hostLabel}
                    </p>
                  </div>
                  <button type="button" className={`${btnSecondary} font-semibold`}>
                    Re-scan
                  </button>
                </div>
              </div>
            </section>

            <section>
              <h3 className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A] dark:text-white">
                Suggested slices
                <span className="rounded-md border border-[#E4E2DA] px-2 py-0.5 text-[10px] font-bold normal-case tracking-normal tabular-nums text-[#57534A] dark:border-[#232328] dark:text-[#8B8B92]">
                  {WORKSPACE_SLICES.length}
                </span>
              </h3>

              <ul className="space-y-3">
                {WORKSPACE_SLICES.map((slice) => (
                  <li key={slice.id}>
                    <div
                      className={`border border-[#E4E2DA] bg-white px-5 py-4 dark:border-[#232328] dark:bg-[#141416] sm:px-6 ${lift}`}
                    >
                      <div className="flex flex-wrap items-start gap-x-8 gap-y-3">
                        <div className="min-w-0 max-w-md flex-1 basis-[11rem]">
                          <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#9B948A] dark:text-gray-500">
                            Source
                          </p>
                          <p className="mt-0.5 truncate text-[15px] font-semibold text-[#1D1B16] dark:text-white">
                            {slice.title}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap items-start gap-x-8 gap-y-2">
                          <div className="min-w-[4.5rem]">
                            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#9B948A] dark:text-gray-500">
                              File size
                            </p>
                            <p className="mt-0.5 text-[13px] font-medium tabular-nums text-[#1D1B16] dark:text-white">
                              {slice.fileSize}
                            </p>
                          </div>
                          <div className="min-w-[4.5rem]">
                            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#9B948A] dark:text-gray-500">
                              Variables
                            </p>
                            <p className="mt-0.5 text-[13px] font-medium tabular-nums text-[#1D1B16] dark:text-white">
                              {slice.variables}
                            </p>
                          </div>
                          <div className="min-w-[6rem]">
                            <ScoreMeter value={slice.score} />
                          </div>
                        </div>

                        <button type="button" className={`${btnInverse} shrink-0 self-center`}>
                          Use slice
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
