import { LICENSING_STEPS } from '../../data/licensing.js';

/**
 * Who does what in a license: the owner, Aseryx and your team. `centered`
 * puts each in the middle of its third, under its part of the offer flow
 * drawing above it (the owner's cube, Aseryx's frame, the team's cube).
 */
const LicenseParties = ({ centered = false, className = '' }) => (
  <ul className={`grid gap-6 md:grid-cols-3 ${centered ? 'md:text-center' : ''} ${className}`}>
    {LICENSING_STEPS.map((party) => (
      <li key={party.title}>
        <p className="text-heading-lg text-ink">{party.title}</p>
        <p className={`mt-1 max-w-[18rem] text-body text-ink-secondary ${centered ? 'md:mx-auto' : ''}`}>{party.body}</p>
      </li>
    ))}
  </ul>
);

export default LicenseParties;
