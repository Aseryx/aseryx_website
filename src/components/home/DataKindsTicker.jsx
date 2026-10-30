import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

// The kinds of data owners bring. Those that get a quality certificate today
// lead; footage, audio and 3D follow, with certificates to come.
const KINDS = [
  'Company data',
  'Reference corpora',
  'Consented research data',
  'Transaction logs',
  'Sensor data',
  'Sample libraries',
  'Maps',
  '3D models',
  'Photography',
  'Timelapse',
  'Egocentric video',
  'Teleoperation',
  'Motion capture',
  '360 video',
  'Driving footage',
  'Drone footage',
];

// One pass of the list; the second copy only makes the loop seamless, so
// assistive tech skips it.
const KindList = ({ copy = false }) => (
  <ul
    className={`flex shrink-0 items-center ${copy ? 'ticker-copy' : ''}`}
    aria-hidden={copy || undefined}
    aria-label={copy ? undefined : 'Kinds of data you can license'}
  >
    {KINDS.map((kind) => (
      <li key={kind} className="flex items-center gap-5 whitespace-nowrap pr-5 text-heading-lg text-ink">
        <span className="h-2.5 w-2.5 shrink-0 border-[1.5px] border-brand bg-brand-tint" aria-hidden="true" />
        {kind}
      </li>
    ))}
  </ul>
);

/**
 * A slow ticker of the kinds of data you can license, in the cut-cell motif
 * instead of DataVendor's moving rows. Moving content needs a way to stop
 * it, so it pauses on hover and has its own pause button (index.css).
 */
const DataKindsTicker = () => {
  const [paused, setPaused] = useState(false);

  return (
    <div className="ticker mb-10 flex items-center gap-4 border-y border-border py-5 md:mb-12" data-paused={paused}>
      <div className="ticker-window min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="ticker-track flex w-max">
          <KindList />
          <KindList copy />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label="Pause the list"
        className="ticker-toggle flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-ink-secondary transition-colors duration-150 hover:bg-hover hover:text-ink"
      >
        {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
};

export default DataKindsTicker;
