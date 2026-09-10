import { useState } from 'react';
import { Search } from 'lucide-react';
import { APPRAISAL_CERTIFICATES } from './demoData.js';

const DETAIL_TABS = [
  { id: 'score', label: 'Score' },
  { id: 'insights', label: 'Insights' },
  { id: 'traceability', label: 'Traceability' },
  { id: 'proof', label: 'Proof' },
];

const GOOD_THRESHOLD = 70;

const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-md border border-[#D4D2C9] bg-[#F0EFE8] px-3 py-1.5 text-[12px] font-medium whitespace-nowrap text-[#57534A] transition-colors duration-150 hover:bg-[#E9E7E0] hover:text-[#1D1B16] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#C4C4C8] dark:hover:bg-white/[0.10] dark:hover:text-white';

const btnInverse =
  'inline-flex items-center justify-center gap-2 rounded-md bg-[#1D1B16] px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#2A2822] dark:bg-white dark:text-[#1D1B16] dark:hover:bg-gray-100';

/** Appraisal master-detail Score view — CertificateList + CertificateDetail + ScoreTab. */
export default function DemoAppraisal() {
  const [selectedId, setSelectedId] = useState(APPRAISAL_CERTIFICATES[0].id);
  const [tab, setTab] = useState('score');
  const proof =
    APPRAISAL_CERTIFICATES.find((item) => item.id === selectedId) ?? APPRAISAL_CERTIFICATES[0];

  return (
    <div className="flex h-full min-h-0 flex-col bg-white dark:bg-[#121214]">
      <div className="sticky top-0 z-30 flex-shrink-0 border-b border-[#ECEAE2] bg-white/95 px-5 pb-3.5 pt-3 backdrop-blur-md dark:border-[#1E1E22] dark:bg-[#121214]/95 lg:px-8">
        <p className="text-[11px] font-medium leading-[1.2] text-[#9B948A] dark:text-gray-500">
          <span>Data</span>
          <span className="mx-1.5 opacity-50">/</span>
          <span>Appraisal</span>
        </p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-[22px] font-medium leading-tight tracking-[-0.02em] text-[#1D1B16] dark:text-white sm:text-[24px]">
              Appraisal
            </h1>
            <p className="mt-1 max-w-[36rem] truncate text-[12px] leading-[1.4] text-[#9B948A] dark:text-gray-500">
              Quality check on vaulted data.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button type="button" className={btnSecondary}>
              Download Appraisal
            </button>
            <button type="button" className={btnInverse}>
              Generate Appraisal
            </button>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="hidden w-[240px] shrink-0 flex-col border-r border-[#E4E2DA] bg-white dark:border-[#232328] dark:bg-[#141416] sm:flex">
          <div className="border-b border-[#E4E2DA] px-3 py-3 dark:border-[#232328]">
            <label className="relative block w-full">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B948A]"
                strokeWidth={1.75}
              />
              <input
                type="search"
                placeholder="Search appraisals…"
                className="h-9 w-full rounded-md border border-[#E4E2DA] bg-white pl-9 pr-3 text-[13px] text-[#1D1B16] outline-none placeholder:text-[#A8A29E] focus:border-[#D1CCC5] dark:border-[#232328] dark:bg-[#121214] dark:text-white dark:placeholder:text-gray-500"
                readOnly
              />
            </label>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <div className="flex flex-col">
              {APPRAISAL_CERTIFICATES.map((cert, index) => {
                const selected = cert.id === proof.id;
                const isLast = index === APPRAISAL_CERTIFICATES.length - 1;
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => setSelectedId(cert.id)}
                    aria-current={selected ? 'true' : undefined}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      index === 0 ? 'border-t border-[#E4E2DA] dark:border-[#232328]' : ''
                    } ${!isLast ? 'border-b border-[#E4E2DA] dark:border-[#232328]' : ''} ${
                      selected
                        ? 'bg-[#F0EFE8] text-[#1D1B16] dark:bg-white/[0.06] dark:text-white'
                        : 'text-[#57534A] hover:bg-[#EEEDE8]/80 hover:text-[#1D1B16] dark:text-[#8B8B92] dark:hover:bg-white/[0.04] dark:hover:text-white'
                    }`}
                  >
                    <span className="block truncate text-[13px] font-medium">{cert.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white dark:bg-[#141416]">
          <div className="shrink-0 border-b border-[#E4E2DA] px-5 dark:border-[#232328] lg:px-6">
            <div className="-mb-px flex flex-wrap gap-6 overflow-x-auto">
              {DETAIL_TABS.map(({ id, label }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={`relative whitespace-nowrap pb-3 pt-4 text-[13px] font-semibold transition-colors ${
                      active
                        ? 'text-[#1D1B16] dark:text-white'
                        : 'text-[#57534A] hover:text-[#1D1B16] dark:text-[#8B8B92] dark:hover:text-white'
                    }`}
                  >
                    {label}
                    {active ? (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1D1B16] dark:bg-white"
                        aria-hidden
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="shrink-0 px-5 pt-5 lg:px-6">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <h2 className="text-[22px] font-medium leading-tight tracking-[-0.02em] text-[#1D1B16] dark:text-white sm:text-[24px]">
                  {proof.title}
                </h2>
                <p className="mt-2 max-w-[40rem] text-[13px] leading-[1.35] text-[#57534A] dark:text-[#8B8B92]">
                  Quality certificate for this vaulted snapshot. score, gates, and proof of the
                  committed slice, not the live database.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <p className="font-mono text-[12px] text-[#9B948A] dark:text-gray-500">
                    {proof.ref} · {proof.sourceLabel === 'Connected DB' ? 'Database' : proof.sourceLabel}{' '}
                    · {proof.updatedLabel}
                  </p>
                  <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    Verified · Gate passed
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-start pt-0.5">
                <span className="font-mono text-[44px] font-medium leading-none tracking-[-0.03em] tabular-nums text-[#1D1B16] dark:text-white lg:text-[52px]">
                  {proof.score}
                </span>
                <span className="ml-1.5 mt-2 text-[14px] text-[#57534A] dark:text-[#8B8B92]">
                  / 100
                </span>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 lg:px-6">
            <div className="max-w-[980px]">
              {tab === 'score' ? (
                <div>
                  <div className="divide-y divide-[#E4E2DA] border border-[#E4E2DA] dark:divide-[#232328] dark:border-[#232328]">
                    {proof.bars.map(({ label, value }) => {
                      const good = value >= GOOD_THRESHOLD;
                      return (
                        <div key={label} className="flex items-center gap-5 px-4 py-3.5 sm:gap-6">
                          <span
                            className="w-[140px] flex-shrink-0 text-[11px] font-medium uppercase tracking-[0.08em] text-[#1D1B16] dark:text-white sm:w-[200px]"
                            title={label}
                          >
                            {label}
                          </span>
                          <div className="h-[2px] flex-1 bg-[#F0EFE8] dark:bg-[#1A1A1E]">
                            <div
                              className={`h-[2px] transition-all duration-500 ${
                                good
                                  ? 'bg-emerald-700 dark:bg-emerald-400'
                                  : 'bg-amber-500 dark:bg-amber-400'
                              }`}
                              style={{ width: `${Math.min(value, 100)}%` }}
                            />
                          </div>
                          <span
                            className={`w-8 text-right font-mono text-[14px] tabular-nums ${
                              good
                                ? 'text-emerald-800 dark:text-emerald-400'
                                : 'text-amber-800 dark:text-amber-400'
                            }`}
                          >
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 grid grid-cols-1 divide-y divide-[#E4E2DA] border border-[#E4E2DA] dark:divide-[#232328] dark:border-[#232328] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
                    {proof.gates.map((gate, index) => (
                      <div
                        key={gate.label}
                        className={`px-4 py-4 ${
                          index % 2 === 0
                            ? 'sm:border-r sm:border-[#E4E2DA] dark:sm:border-[#232328]'
                            : ''
                        } ${
                          index < 3
                            ? 'lg:border-r lg:border-[#E4E2DA] dark:lg:border-[#232328]'
                            : ''
                        } ${
                          index >= 2
                            ? 'sm:border-t sm:border-[#E4E2DA] dark:sm:border-[#232328] lg:border-t-0'
                            : ''
                        }`}
                      >
                        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400">
                          Pass
                        </p>
                        <p className="mt-1.5 text-[14px] font-medium text-[#1D1B16] dark:text-white">
                          {gate.label}
                        </p>
                        <p className="mt-1 text-[12px] leading-relaxed text-[#57534A] dark:text-[#8B8B92]">
                          {gate.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-1 border border-[#E4E2DA] dark:border-[#232328] sm:grid-cols-[minmax(0,1fr)_auto]">
                    <p className="px-4 py-3.5 text-[13px] leading-relaxed text-[#57534A] dark:text-[#8B8B92]">
                      Custody holds the snapshot until you list it. This certificate scores
                      committed rows. not a live indexer feed.
                    </p>
                    <button
                      type="button"
                      onClick={() => setTab('proof')}
                      className="whitespace-nowrap border-t border-[#E4E2DA] px-4 py-3.5 text-[13px] font-medium text-[#1D1B16] transition-colors hover:bg-[#F7F6F1] dark:border-[#232328] dark:text-white dark:hover:bg-white/[0.04] sm:border-l sm:border-t-0"
                    >
                      View proof
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-[13px] text-[#57534A] dark:text-[#8B8B92]">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} detail is available in the product.
                  Score is the public tour surface.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
