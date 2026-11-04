import Card from '../common/Card.jsx';
import StatusChip from '../common/StatusChip.jsx';
import MomentHeader from '../product/MomentHeader.jsx';

// What a team's key can do, as the app's API keys page lists it.
const ABILITIES = [
  { action: 'Search the catalog', tone: 'pass', label: 'Allowed' },
  { action: 'Make an offer', tone: 'pass', label: 'Allowed' },
  { action: 'Pay for access', tone: 'pass', label: 'Allowed' },
  { action: 'Grant access', tone: 'waiting', label: 'Owners, in the app' },
];

/** Coded moment: the quickstart beside a team's API keys, after the demo's API keys page. */
const ApiKeyMoment = () => (
  <Card lift className="overflow-hidden" role="figure" aria-label="An API key's quickstart and what the key can do">
    <MomentHeader label="API key" detail="Quickstart" />
    <div className="space-y-3 px-5 py-5">
      <p className="text-body-sm text-ink-secondary">Keep the key in your environment, never in code.</p>
      <pre className="overflow-x-auto rounded-lg border border-border-light bg-secondary px-4 py-3 font-mono text-body-sm text-ink">
        <span className="text-ink-muted"># .env</span>
        {'\n'}ASERYX_API_KEY=asy_…
      </pre>
    </div>
    <ul className="border-t border-border-light">
      {ABILITIES.map((item) => (
        <li
          key={item.action}
          className="flex items-center justify-between gap-4 border-b border-border-light px-5 py-3 last:border-0"
        >
          <span className="text-body text-ink">{item.action}</span>
          <StatusChip tone={item.tone}>{item.label}</StatusChip>
        </li>
      ))}
    </ul>
  </Card>
);

export default ApiKeyMoment;
