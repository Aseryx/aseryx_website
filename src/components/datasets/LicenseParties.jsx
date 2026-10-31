import { LICENSING_STEPS } from '../../data/licensing.js';

/**
 * Who does what in a license, in words: the owner, Aseryx and your team.
 * Dataset profiles show it under their licensing heading; the For AI
 * companies page draws the same parties as a diagram (LicenseDiagram).
 */
const LicenseParties = ({ className = '' }) => (
  <ul className={`grid gap-6 md:grid-cols-3 ${className}`}>
    {LICENSING_STEPS.map((party) => (
      <li key={party.title}>
        <p className="text-heading-lg text-ink">{party.title}</p>
        <p className="mt-1 max-w-[18rem] text-body text-ink-secondary">{party.body}</p>
      </li>
    ))}
  </ul>
);

export default LicenseParties;
