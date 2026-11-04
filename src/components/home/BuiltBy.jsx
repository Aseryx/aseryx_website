import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

// The strip moves at Kled's pace, about 25px a second, whatever the list
// holds. GAP matches each item's px-7 on both sides, and a name in type is
// measured by its length.
const SPEED = 25;
const GAP = 56;
const widthOf = (place) => {
  const logo = place.logo ? place.height * place.ratio : 0;
  const name = !place.logo || place.named ? place.name.length * 8.5 : 0;
  return logo + name + (logo && name ? 10 : 0) + GAP;
};

const Name = ({ children }) => (
  <span className="whitespace-nowrap text-heading font-semibold tracking-tight">{children}</span>
);

// A logo is a mask over the text colour (.logo-mask in index.css), so every
// mark shows in the same ink in both themes, whatever colours its file uses.
// A logo that is only a symbol has its name set beside it (named), as its
// owner's own site does, and the name is what assistive tech reads.
const Mark = ({ place }) => {
  if (!place.logo) return <Name>{place.name}</Name>;
  const logo = (
    <span
      role={place.named ? undefined : 'img'}
      aria-label={place.named ? undefined : place.name}
      aria-hidden={place.named || undefined}
      className="logo-mask block"
      style={{ '--logo': `url(${place.logo})`, height: place.height, aspectRatio: place.ratio }}
    />
  );
  if (!place.named) return logo;
  return (
    <span className="flex items-center gap-2.5">
      {logo}
      <Name>{place.name}</Name>
    </span>
  );
};

// Four copies of the list, so half the track is always wider than the window
// and the loop never shows a gap. Only the first is read out, and reduced
// motion shows just that one, wrapped and still.
const COPIES = [false, true, true, true];

const PlaceList = ({ places, label, copy }) => (
  <ul
    className={`flex flex-wrap items-center justify-center gap-y-4 ${copy ? 'ticker-copy' : ''}`}
    aria-hidden={copy || undefined}
    aria-label={copy ? undefined : label}
  >
    {places.map((place) => (
      <li key={place.name} className="shrink-0 px-7 text-ink-secondary">
        <Mark place={place} />
      </li>
    ))}
  </ul>
);

/**
 * Under the hero: where the people building Aseryx studied, worked or went
 * through a program, as one slow strip of their logos. Moving content needs
 * a way to stop it, so it pauses on hover and has its own pause button, as
 * the data-kinds ticker does (index.css). From sm up an empty first column
 * balances the button, so the strip stays centred under the hero; phones
 * give that room to the strip. Renders nothing
 * until the list has places, so it can't ship half-filled.
 *
 *   <BuiltBy title="Built by alumni of" places={[{ name, logo, ratio, height }]} />
 */
const BuiltBy = ({ title, places, className = '' }) => {
  const [paused, setPaused] = useState(false);
  if (!places?.length) return null;
  const duration = (2 * places.reduce((width, place) => width + widthOf(place), 0)) / SPEED;

  return (
    <div className={className}>
      <p className="text-body-sm text-ink-muted">{title}</p>
      <div
        className="ticker mt-5 grid grid-cols-[minmax(0,1fr)_2.25rem] items-center gap-4 sm:grid-cols-[2.25rem_minmax(0,1fr)_2.25rem]"
        data-paused={paused}
      >
        <span className="hidden sm:block" aria-hidden="true" />
        <div className="ticker-window overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="ticker-track flex w-max items-center" style={{ animationDuration: `${duration}s` }}>
            {COPIES.map((copy, i) => (
              <PlaceList key={i} places={places} label={title} copy={copy} />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-pressed={paused}
          aria-label="Pause the logos"
          className="ticker-toggle flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-secondary transition-colors duration-150 hover:bg-hover hover:text-ink"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
};

export default BuiltBy;
