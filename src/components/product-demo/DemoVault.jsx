import { useMemo, useState } from 'react';
import { Database, FileText, Search } from 'lucide-react';
import { VAULT_DATASETS } from './demoData.js';

const GRID_COLS =
  'grid grid-cols-[minmax(0,1fr)_72px_120px_88px_96px_110px] gap-4 items-center';

const lift =
  'shadow-[0_2px_3px_-1px_rgba(15,23,42,0.07)] dark:shadow-[0_2px_3px_-1px_rgba(0,0,0,0.45)]';

const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-md border border-[#D4D2C9] bg-[#F0EFE8] px-3 py-1.5 text-[12px] font-medium whitespace-nowrap text-[#57534A] transition-colors duration-150 hover:bg-[#E9E7E0] hover:text-[#1D1B16] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#C4C4C8] dark:hover:bg-white/[0.10] dark:hover:text-white';

const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-[#1D1B16] px-3 py-1.5 text-[12px] font-medium whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#2A2822] dark:bg-white dark:text-[#1D1B16] dark:hover:bg-gray-100';

/** Vault Datasets table — aseryx_demo Vault page chrome + grid. */
export default function DemoVault() {
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');

  const uploadCount = VAULT_DATASETS.filter((d) => d.source === 'upload').length;
  const connectedCount = VAULT_DATASETS.length - uploadCount;

  const tabs = [
    { id: 'all', label: 'All', count: VAULT_DATASETS.length },
    { id: 'uploads', label: 'Uploads', count: uploadCount },
    { id: 'connected', label: 'Connected', count: connectedCount },
  ];

  const rows = useMemo(() => {
    let next = VAULT_DATASETS;
    if (activeTab === 'uploads') next = next.filter((d) => d.source === 'upload');
    if (activeTab === 'connected') next = next.filter((d) => d.source === 'connected');
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      next = next.filter((d) => d.name.toLowerCase().includes(q));
    }
    return next;
  }, [activeTab, query]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white dark:bg-[#121214]">
      <div className="sticky top-0 z-30 flex-shrink-0 border-b border-[#ECEAE2] bg-white/95 px-5 pt-3 backdrop-blur-md dark:border-[#1E1E22] dark:bg-[#121214]/95 lg:px-8">
        <p className="text-[11px] font-medium leading-[1.2] text-[#9B948A] dark:text-gray-500">
          <span>Vault</span>
          <span className="mx-1.5 opacity-50">/</span>
          <span>Datasets</span>
        </p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-[22px] font-medium leading-tight tracking-[-0.02em] text-[#1D1B16] dark:text-white sm:text-[24px]">
              Datasets
            </h1>
            <p className="mt-1 max-w-[36rem] truncate text-[12px] leading-[1.4] text-[#9B948A] dark:text-gray-500">
              Committed files and database slices.
            </p>
          </div>
          <button type="button" className={`${btnPrimary} shrink-0`}>
            Upload data
          </button>
        </div>

        <div className="-mx-5 mt-4 border-t border-[#ECEAE2] px-5 pt-2.5 dark:border-[#1E1E22] lg:-mx-8 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="-mb-px flex flex-wrap gap-6">
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-2 pb-3 text-[13px] font-semibold transition-colors ${
                      active
                        ? 'text-[#1D1B16] dark:text-white'
                        : 'text-[#57534A] hover:text-[#1D1B16] dark:text-[#8B8B92] dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
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
            <div className="pb-2">
              <label className="relative block w-full sm:w-52 lg:w-60">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B948A]"
                  strokeWidth={1.75}
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search datasets…"
                  className="h-9 w-full rounded-md border border-[#E4E2DA] bg-white pl-9 pr-3 text-[13px] text-[#1D1B16] outline-none placeholder:text-[#A8A29E] focus:border-[#D1CCC5] dark:border-[#232328] dark:bg-[#141416] dark:text-white dark:placeholder:text-gray-500"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <div className="mx-auto w-full max-w-6xl px-5 py-5 pb-10 lg:px-8">
          <section className="space-y-3">
            <h3 className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1A1A1A] dark:text-white">
              Datasets
              <span className="rounded-md border border-[#E4E2DA] px-2 py-0.5 text-[10px] font-bold normal-case tracking-normal tabular-nums text-[#57534A] dark:border-[#232328] dark:text-[#8B8B92]">
                {rows.length}
              </span>
            </h3>

            <div
              className={`overflow-hidden border border-[#E4E2DA] bg-white dark:border-[#232328] dark:bg-[#141416] ${lift}`}
            >
              <div
                className={`${GRID_COLS} border-b border-[#E4E2DA] bg-[#F4F4F5] px-4 py-3 dark:border-[#232328] dark:bg-white/[0.06]`}
              >
                {['Name', 'Type', 'Source', 'Size', 'Quality', ''].map((label, i) => (
                  <span
                    key={label || `action-${i}`}
                    className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#57534A] dark:text-[#8B8B92]"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {rows.map((file) => {
                const connected = file.source === 'connected';
                return (
                  <div
                    key={file.id}
                    className={`${GRID_COLS} border-b border-[#E4E2DA] px-4 py-4 transition-colors last:border-b-0 hover:bg-[#F2F1EB]/70 dark:border-[#232328] dark:hover:bg-white/[0.03]`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${
                          connected
                            ? 'bg-[#F0EFE8] text-[#1D1B16] dark:bg-white/[0.08] dark:text-white'
                            : 'bg-[#ECE9DF] text-[#9B948A] dark:bg-white/[0.06] dark:text-gray-400'
                        }`}
                      >
                        {connected ? (
                          <Database className="h-3.5 w-3.5" strokeWidth={1.75} />
                        ) : (
                          <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                        )}
                      </span>
                      <span className="truncate text-[13px] font-medium text-[#1D1B16] dark:text-white">
                        {file.name}
                      </span>
                    </div>
                    <span className="truncate text-[13px] font-medium uppercase text-[#57534A] dark:text-[#8B8B92]">
                      {file.type}
                    </span>
                    <span className="truncate text-[13px] font-medium text-[#57534A] dark:text-[#8B8B92]">
                      {connected ? 'Database' : 'File upload'}
                    </span>
                    <span className="font-mono text-[13px] font-medium tabular-nums text-[#1D1B16] dark:text-white">
                      {file.size}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FF7A4D]" />
                      <span className="font-mono text-[13px] font-medium tabular-nums text-[#1D1B16] dark:text-white">
                        {file.quality}
                      </span>
                    </span>
                    <div className="flex items-center justify-end">
                      <button type="button" className={btnSecondary}>
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
