import { useState } from 'react';
import {
  BarChart3,
  ChevronDown,
  Database,
  EllipsisVertical,
  Layers3,
  Search,
  Wrench,
} from 'lucide-react';
import DemoAseryxLogo from '../product-demo/DemoAseryxLogo.jsx';
import { DEMO_NAV, DEMO_USER } from '../product-demo/demoData.js';
import DemoWorkspace from '../product-demo/DemoWorkspace.jsx';
import DemoVault from '../product-demo/DemoVault.jsx';
import DemoAppraisal from '../product-demo/DemoAppraisal.jsx';

const PAGES = {
  workspace: DemoWorkspace,
  vault: DemoVault,
  appraisal: DemoAppraisal,
};

const PAGE_CAPTIONS = {
  workspace: 'Scan and select the cut.',
  vault: 'Lock the selected data.',
  appraisal: 'Quality-check the vaulted copy.',
};

const CLICKABLE = new Set(['workspace', 'appraisal', 'vault']);

/** Sequential nav tour: Appraisal → Vault → Workspace, then done. */
const NUDGE_NEXT = {
  appraisal: 'vault',
  vault: 'workspace',
  workspace: null,
};

/**
 * Sidebar chrome mirrored from aseryx_demo Navbar + SidebarNavList +
 * SidebarSearch (demo/screenshot-ready-seed). Provider defaults: Data open,
 * Catalog and Tools collapsed.
 */
export default function ProductDemo({ className = '' }) {
  const [activeId, setActiveId] = useState('workspace');
  const [nudgeId, setNudgeId] = useState('appraisal');
  const [sectionOpen, setSectionOpen] = useState({
    data: true,
    catalog: false,
    tools: false,
  });
  const ActivePage = PAGES[activeId] ?? DemoWorkspace;

  const toggleSection = (key) => {
    setSectionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectPage = (id) => {
    setActiveId(id);
    if (id === nudgeId) {
      setNudgeId(NUDGE_NEXT[id] ?? null);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="relative flex h-[min(72vh,720px)] min-h-[560px] overflow-hidden rounded-xl border border-[var(--border-color)] bg-white font-sans antialiased shadow-[0_2px_3px_-1px_rgba(15,23,42,0.07)] dark:bg-[#121214] dark:shadow-[0_2px_3px_-1px_rgba(0,0,0,0.45)]"
        role="region"
        aria-label="Aseryx product demo"
      >
        <aside className="relative z-20 flex w-[260px] shrink-0 flex-col border-r border-[#E4E2DA] bg-[#F5F4F0] dark:border-[#232328] dark:bg-[#0E0E10]">
          <div className="flex h-[72px] flex-shrink-0 items-center justify-between px-5">
            <DemoAseryxLogo className="h-6 w-auto max-w-[160px]" title="Aseryx" />
          </div>

          <nav
            className="relative min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-4"
            aria-label="Product demo navigation"
          >
            <div className="mb-5 px-1">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                  <Search className="h-4 w-4 text-[#57534A] dark:text-[#8B8B92]" strokeWidth={1.75} />
                </div>
                <div
                  className="flex h-8 w-full items-center rounded-lg border border-[#E4E2DA] bg-transparent pl-9 pr-14 text-[13px] font-medium text-[#A8A29E] dark:border-[#2E2E34] dark:text-gray-400"
                  aria-hidden
                >
                  Search navigation...
                </div>
                <div className="absolute inset-y-0 right-2 flex items-center gap-1 opacity-60">
                  <span className="rounded-md border border-[#E4E2DA] bg-[#F0EFE8] px-1.5 py-0.5 text-[10px] font-medium text-[#8B8580] dark:border-[#2E2E34] dark:bg-white/[0.06] dark:text-[#8B8B92]">
                    ⌘
                  </span>
                  <span className="rounded-md border border-[#E4E2DA] bg-[#F0EFE8] px-1.5 py-0.5 text-[10px] font-medium text-[#8B8580] dark:border-[#2E2E34] dark:bg-white/[0.06] dark:text-[#8B8B92]">
                    /
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <span className="flex w-full items-center gap-2.5 rounded-md border border-transparent px-2.5 py-1.5 text-[13px] font-medium leading-[1.35] text-[#6B6560] dark:text-[#7A7A82]">
                <BarChart3 className="h-4 w-4 flex-shrink-0 opacity-70" strokeWidth={1.5} />
                <span className="truncate">{DEMO_NAV.top[0].label}</span>
              </span>
            </div>

            <NavSection
              id="data"
              label="Data"
              icon={Database}
              open={sectionOpen.data}
              onToggle={() => toggleSection('data')}
              items={DEMO_NAV.data}
              activeId={activeId}
              onSelect={selectPage}
              nudgeId={nudgeId}
            />
            <NavSection
              id="catalog"
              label="Catalog"
              icon={Layers3}
              open={sectionOpen.catalog}
              onToggle={() => toggleSection('catalog')}
              items={DEMO_NAV.catalog}
              activeId={activeId}
              onSelect={selectPage}
            />
            <NavSection
              id="tools"
              label="Tools"
              icon={Wrench}
              open={sectionOpen.tools}
              onToggle={() => toggleSection('tools')}
              items={DEMO_NAV.tools}
              activeId={activeId}
              onSelect={selectPage}
            />
          </nav>

          <div className="relative flex-shrink-0 border-t border-[#E4E2DA] p-4 dark:border-[#232328]">
            <div className="flex items-center justify-between gap-3">
              <div className="group flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#3F3F3F] text-[14px] font-bold tracking-wide text-white">
                  {DEMO_USER.initials}
                </div>
                <div className="min-w-0 text-left">
                  <div className="truncate font-sans text-[15px] font-semibold leading-[1.2] text-[#1D1B16] dark:text-white">
                    {DEMO_USER.name}
                  </div>
                  <div className="mt-0.5 truncate text-[13px] font-medium text-[#57534A] dark:text-[#8B8B92]">
                    {DEMO_USER.organization}
                  </div>
                </div>
              </div>
              <span
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[#57534A] dark:text-[#8B8B92]"
                aria-hidden
              >
                <EllipsisVertical className="h-4 w-4" />
              </span>
            </div>
          </div>
        </aside>

        <div className="min-h-0 min-w-0 flex-1 overflow-hidden bg-white dark:bg-[#121214]">
          <ActivePage />
        </div>
      </div>

      <p className="mt-3 text-sm text-[#57534A] dark:text-[#8B8B92]">{PAGE_CAPTIONS[activeId]}</p>
    </div>
  );
}

function NavSection({
  label,
  icon: Icon,
  open,
  onToggle,
  items,
  activeId,
  onSelect,
  nudgeId = null,
}) {
  return (
    <div className="mt-0.5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-1.5 rounded-md px-2.5 pb-1 pt-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#9A958C] transition-colors duration-150 hover:text-[#6B6560] dark:text-[#5C5C64] dark:hover:text-[#8B8B92]"
        aria-expanded={open}
      >
        <Icon className="h-3 w-3 flex-shrink-0 opacity-60" strokeWidth={2} />
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown
          className={`h-2.5 w-2.5 flex-shrink-0 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <div
          className="mb-0.5 ml-[18px] mt-0.5 space-y-px pl-2.5"
          role="group"
          aria-label={label}
        >
          {items.map((item) => {
            const active = item.id === activeId;
            const clickable = CLICKABLE.has(item.id);
            const nudged = nudgeId === item.id;
            const className = `
              relative w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[13px] font-medium font-sans leading-[1.35] transition-all duration-150 border border-transparent
              ${
                active
                  ? 'bg-[#E8E7E1] font-medium text-[#1D1B16] dark:bg-white/[0.05] dark:text-white'
                  : 'text-[#6B6560] hover:bg-[#EEEDE8]/80 hover:text-[#1D1B16] dark:text-[#7A7A82] dark:hover:bg-white/[0.04] dark:hover:text-white'
              }
              ${nudged ? 'demo-nudge-target ring-1 ring-[#1D1B16]/20 dark:ring-white/25' : ''}
            `;

            return (
              <div key={item.id} className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-1 left-0 top-1 w-px -translate-x-2.5 bg-[#D4D2C9]/80 dark:bg-[#2E2E34]/80"
                />
                {clickable ? (
                  <button
                    type="button"
                    onClick={() => onSelect(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={className}
                  >
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  </button>
                ) : (
                  <span className={`${className} cursor-default opacity-80`}>
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
