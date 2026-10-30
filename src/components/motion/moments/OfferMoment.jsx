import { useRef } from 'react';
import usePlay from './usePlay.js';

/**
 * How it works › Offer: "Offer from an AI company · Term: 6 months · Payment held · Approve or
 * Decline" (Website v2 › Screens).
 *
 *   <Card lift className="overflow-hidden" role="figure" aria-label="An offer from an AI company, approved">
 *     <MomentHeader label="Approve" />
 *     <OfferMoment />
 *   </Card>
 *
 * The offer as the owner gets it. The first time it is in view the offer comes in, its term shows,
 * the payment (the one round dot) drops into Payment held, and the owner approves: Approve takes
 * the coral ring and its check, the site's one signal for an approval (about 2.6 s). It rests
 * approved. Every word on it is the doc's; the company is not named.
 *
 * `term` is the term shown ('6 months'). The v2 messaging keeps term lengths to the For AI
 * companies page, the FAQ and dataset profiles, so on Home pass term={null} to drop the Term row.
 */
const WORDS = {
  title: 'Offer from an AI company',
  term: 'Term',
  months: '6 months',
  held: 'Payment held',
  approve: 'Approve',
  decline: 'Decline',
}; // Website v2 › How it works › Screens
// A small cube of dots: an organisation without a name
const Tile = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    {[2, 8, 14].flatMap((x) => [2, 8, 14].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="currentColor" />))}
  </svg>
);

export default function OfferMoment({ term = WORDS.months, animateOnLoad, reducedMotion, className = '', style }) {
  const ref = useRef(null);
  const state = usePlay(ref, { animateOnLoad, reducedMotion });

  return (
    <div ref={ref} className={`axm axm-offer ${className}`} data-state={state} style={style}>
      <div className="axm-card">
        <div className="axm-offer-head">
          <span className="axm-offer-tile">
            <Tile />
          </span>
          <p className="axm-offer-title">{WORDS.title}</p>
        </div>
        <div className="axm-rule" />
        <div className="axm-offer-body">
          {term && (
            <p className="axm-offer-row" style={{ margin: 0 }}>
              <span className="axm-label" style={{ fontSize: 13 }}>{WORDS.term}</span>
              <b>{term}</b>
            </p>
          )}
          <span className="axm-offer-chip">
            <span className="axm-offer-dot" aria-hidden="true" />
            {WORDS.held}
          </span>
        </div>
        <div className="axm-rule" />
        <div className="axm-offer-foot">
          <span className="axm-btn axm-btn--secondary axm-offer-decline">{WORDS.decline}</span>
          <span className="axm-btn axm-btn--primary axm-offer-approve">
            <svg className="axm-offer-check" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
              <path d="M2.5 7.4 5.6 10.4 11.5 3.9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
            </svg>
            {WORDS.approve}
          </span>
        </div>
      </div>
    </div>
  );
}
