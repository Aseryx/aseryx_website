import OfferFlow from '../motion/canvas/OfferFlow.jsx';
import { LICENSING_STEPS } from '../../data/licensing.js';

// Each party's words sit under its place in the drawing: the owner left,
// Aseryx in the middle, your team right.
const ALIGN = ['', 'md:text-center', 'md:text-right'];

/**
 * The three parties to a license and the deal between them. The offer flow
 * plays it once as it comes into view: the team's query and its count, the
 * payment held, the owner's approval, access for the term, then the payment
 * to the owner. The words are HTML under it, so the drawing is decorative.
 */
// Capped below the page width so the cubes stay the size of the words under them.
const LicenseParties = ({ className = '' }) => (
  <div className={`mx-auto max-w-4xl ${className}`}>
    <OfferFlow />
    <ul className="mt-6 grid gap-6 md:grid-cols-3">
      {LICENSING_STEPS.map((party, i) => (
        <li key={party.title} className={ALIGN[i]}>
          <p className="text-heading-lg text-ink">{party.title}</p>
          <p className="mt-1 text-body text-ink-secondary">{party.body}</p>
        </li>
      ))}
    </ul>
    <p className="mt-8 text-center text-body text-ink">Access for 3 to 12 months, on the price and term in the offer.</p>
  </div>
);

export default LicenseParties;
