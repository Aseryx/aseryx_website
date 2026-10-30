import { useRef } from 'react';
import NumberFlow, { continuous } from '@number-flow/react';
import CertificateMark from '../certificate/CertificateMark.jsx';
import usePlay, { useCues } from './usePlay.js';

/**
 * How it works › List: "a dataset card with no field names" (Website v2 › Screens).
 *
 *   <Card lift className="overflow-hidden" role="figure" aria-label="A listed dataset gets a quality certificate">
 *     <MomentHeader label="List" />
 *     <ListMoment score={95} />
 *   </Card>
 *
 * A dataset card as the Exchange shows it, its words drawn as quiet bars, so it shows no field
 * names and no data. The first time it is in view the card is listed: it arrives, its lines fill
 * in, its score rings round, and it gets its quality certificate, the seal closing (about 2.4 s).
 * It rests on the certified card. The only words are the doc's: Quality certificate.
 */
const WORDS = { certificate: 'Quality certificate' }; // Website v2 › How it works › Screens
const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)';
const ROLL_MS = 900;

export default function ListMoment({ score = 95, animateOnLoad, reducedMotion, className = '', style }) {
  const ref = useRef(null);
  const state = usePlay(ref, { animateOnLoad, reducedMotion });
  const cue = useCues(state, [850, 1550]); // the score rolls, then the seal draws
  const value = Math.max(0, Math.min(100, score));
  const bar = (i, width) => <span className="axm-bar" style={{ width, '--i': i }} aria-hidden="true" />;

  return (
    <div ref={ref} className={`axm axm-list ${className}`} data-state={state} style={style}>
      <div className="axm-card axm-list-card">
        <div className="axm-list-top">
          <span className="axm-ring" style={{ '--v': value }}>
            <svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" focusable="false">
              <circle className="axm-ring-track" cx="22" cy="22" r="19.5" fill="none" strokeWidth="4" />
              <circle
                className="axm-ring-arc"
                cx="22"
                cy="22"
                r="19.5"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray={`${value} 100`}
              />
            </svg>
            <NumberFlow
              className="axm-ring-fig"
              value={cue >= 1 ? value : 0}
              animated={state === 'play'}
              plugins={[continuous]}
              spinTiming={{ duration: ROLL_MS, easing: EASE }}
              transformTiming={{ duration: ROLL_MS, easing: EASE }}
              willChange
            />
          </span>
          <span className="axm-list-name">
            {bar(0, '82%')}
            {bar(1, '46%')}
            <span className="axm-chip">
              <span className="axm-chip-seal">{cue >= 2 ? <CertificateMark size={16} animateOnLoad={state === 'play'} /> : null}</span>
              {WORDS.certificate}
            </span>
          </span>
        </div>
        <div className="axm-list-summary">
          {bar(2, '100%')}
          {bar(3, '64%')}
        </div>
        <div className="axm-rule" />
        <div className="axm-list-foot">
          {bar(4, '38%')}
          {bar(5, '22%')}
        </div>
      </div>
    </div>
  );
}
