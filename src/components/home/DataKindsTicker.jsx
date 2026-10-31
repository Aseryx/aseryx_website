import { useState } from 'react';
import {
  Activity,
  AudioLines,
  BookOpen,
  Box,
  Building2,
  Camera,
  Car,
  Drone,
  FlaskConical,
  Glasses,
  Joystick,
  Map as MapIcon,
  PersonStanding,
  ReceiptText,
  Rotate3d,
  Timer,
  Pause,
  Play,
} from 'lucide-react';

// The kinds of data owners bring, each with an icon for what it is. Those
// that get a quality certificate today lead; footage, audio and 3D follow,
// with certificates to come.
const KINDS = [
  { label: 'Company data', Icon: Building2 },
  { label: 'Reference corpora', Icon: BookOpen },
  { label: 'Consented research data', Icon: FlaskConical },
  { label: 'Transaction logs', Icon: ReceiptText },
  { label: 'Sensor data', Icon: Activity },
  { label: 'Sample libraries', Icon: AudioLines },
  { label: 'Maps', Icon: MapIcon },
  { label: '3D models', Icon: Box },
  { label: 'Photography', Icon: Camera },
  { label: 'Timelapse', Icon: Timer },
  { label: 'Egocentric video', Icon: Glasses },
  { label: 'Teleoperation', Icon: Joystick },
  { label: 'Motion capture', Icon: PersonStanding },
  { label: '360 video', Icon: Rotate3d },
  { label: 'Driving footage', Icon: Car },
  { label: 'Drone footage', Icon: Drone },
];

// One pass of the list; the second copy only makes the loop seamless, so
// assistive tech skips it.
const KindList = ({ copy = false }) => (
  <ul
    className={`flex shrink-0 items-center ${copy ? 'ticker-copy' : ''}`}
    aria-hidden={copy || undefined}
    aria-label={copy ? undefined : 'Kinds of data you can license'}
  >
    {KINDS.map(({ label, Icon }) => (
      <li key={label} className="flex items-center gap-3 whitespace-nowrap pr-8 text-heading-lg text-ink">
        <Icon className="h-6 w-6 shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
        {label}
      </li>
    ))}
  </ul>
);

/**
 * A slow ticker of the kinds of data you can license, each with its icon,
 * instead of rows of moving cards. Moving content needs a way to stop
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
