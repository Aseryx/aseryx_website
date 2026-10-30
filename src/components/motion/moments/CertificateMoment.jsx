import { useRef } from 'react';
import NumberFlow, { continuous } from '@number-flow/react';
import CertificateMark from '../certificate/CertificateMark.jsx';
import usePlay, { useCues } from './usePlay.js';

/**
 * How it works › Certificate: "Quality certificate · Score · Worked out from this exact data ·
 * Run a query" (Website v2 › Screens).
 *
 *   <Card lift className="overflow-hidden" role="figure" aria-label="A dataset's quality certificate">
 *     <MomentHeader label="Review" />
 *     <CertificateMoment score={95} />
 *   </Card>
 *
 * The certificate as a team reads it. The first time it is in view the seal closes, the score
 * counts up while its marks fill, and the line under it and Run a query follow (about 2.2 s).
 * It rests on the whole certificate. Every word on it is the doc's.
 */
const WORDS = {
  title: 'Quality certificate',
  score: 'Score',
  line: 'Worked out from this exact data',
  action: 'Run a query',
}; // Website v2 › How it works › Screens
const EASE = 'cubic-bezier(0.33, 1, 0.68, 1)';
const ROLL_MS = 1100;
const START_MS = 600;
const MARKS = 20;

export default function CertificateMoment({ score = 95, animateOnLoad, reducedMotion, className = '', style }) {
  const ref = useRef(null);
  const state = usePlay(ref, { animateOnLoad, reducedMotion });
  const cue = useCues(state, [250, START_MS]); // the seal draws, then the score rolls
  const value = Math.max(0, Math.min(100, score));
  const lit = Math.round((value / 100) * MARKS);
  // Each mark lights as the rolling figure passes its share (the figure eases out, so do the marks)
  const delay = (i) => START_MS + Math.round(ROLL_MS * (1 - Math.cbrt(1 - Math.min(1, (i + 1) / Math.max(lit, 1)))));

  return (
    <div ref={ref} className={`axm axm-cert ${className}`} data-state={state} style={style}>
      <div className="axm-card axm-cert-card">
        <p className="axm-cert-head" style={{ margin: 0 }}>
          <span className="axm-cert-seal">{cue >= 1 ? <CertificateMark size={22} animateOnLoad={state === 'play'} /> : null}</span>
          {WORDS.title}
        </p>
        <div className="axm-cert-score">
          <span className="axm-label">{WORDS.score}</span>
          <NumberFlow
            className="axm-cert-fig"
            value={cue >= 2 ? value : 0}
            animated={state === 'play'}
            plugins={[continuous]}
            spinTiming={{ duration: ROLL_MS, easing: EASE }}
            transformTiming={{ duration: ROLL_MS, easing: EASE }}
            willChange
          />
          <span className="axm-cert-marks" aria-hidden="true">
            {Array.from({ length: MARKS }, (_, i) => (
              <span key={i} className="axm-cert-mark" data-on={i < lit ? '' : undefined} style={{ '--d': `${delay(i)}ms` }} />
            ))}
          </span>
          <p className="axm-label axm-cert-line" style={{ marginBottom: 0 }}>{WORDS.line}</p>
        </div>
        <div className="axm-rule" style={{ marginTop: 20 }} />
        <div className="axm-cert-foot">
          <span className="axm-btn axm-btn--standard">{WORDS.action}</span>
        </div>
      </div>
    </div>
  );
}
