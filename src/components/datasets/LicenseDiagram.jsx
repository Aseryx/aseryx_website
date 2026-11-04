import { LICENSING_STEPS } from '../../data/licensing.js';

// The bracket runs from the centre of the first column to the centre of the
// last: a column is (100% - two 2rem gaps) / 3 wide, so its centre sits at a
// sixth of that from the edge.
const BRACKET_INSET = 'calc((100% - 4rem) / 6)';

/**
 * The three parties to a license as a diagram, not a row of cards: the two
 * that sign have solid outlines, Aseryx a dashed one, and the license line
 * runs under Aseryx from the owner straight to your team. Centred, like the
 * heading above it. On phones the parties stack, so the license line comes
 * last, under a coral rule in place of the bracket.
 */
const LicenseDiagram = ({ className = '' }) => (
  <div className={`relative text-center ${className}`}>
    <ul className="grid gap-8 md:grid-cols-3">
      {LICENSING_STEPS.map((party) => (
        <li key={party.title}>
          <p
            className={`flex h-16 items-center justify-center rounded-xl bg-page px-5 text-heading-lg ${
              party.signs ? 'border border-ink text-ink' : 'border border-dashed border-border-hover text-ink-secondary'
            }`}
          >
            {party.title}
          </p>
          <p className="mx-auto mt-4 max-w-xs text-body text-ink-secondary md:mt-28">{party.body}</p>
        </li>
      ))}
    </ul>

    <div
      className="pointer-events-none absolute top-16 hidden h-12 rounded-b-xl border-x-[1.5px] border-b-[1.5px] border-brand md:block"
      style={{ left: BRACKET_INSET, right: BRACKET_INSET }}
      aria-hidden="true"
    />
    {/* w-max: from the middle, an absolute line only has half the width to fill, and wrapped */}
    <p className="mx-auto mt-8 w-fit max-w-xs border-t-2 border-brand pt-4 text-body text-ink md:absolute md:left-1/2 md:top-28 md:mt-0 md:w-max md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2 md:border-0 md:bg-page md:px-3 md:pt-0">
      Access for 3 to 12 months, on the price and term in the offer.
    </p>
  </div>
);

export default LicenseDiagram;
