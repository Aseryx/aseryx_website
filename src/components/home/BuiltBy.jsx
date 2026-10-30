/**
 * Under the hero: where the people building Aseryx studied or worked, as
 * names in the site's own type. Never official crests or logos: universities
 * and most companies don't allow their marks to suggest they endorse a
 * company. Renders nothing until the list has names, so it can't ship
 * half-filled.
 *
 *   <BuiltBy title="Built by a team from" places={['…', '…']} />
 */
const BuiltBy = ({ title, places, className = '' }) => {
  if (!places?.length) return null;
  return (
    <div className={className}>
      <p className="text-body-sm text-ink-muted">{title}</p>
      <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        {places.map((place) => (
          <li key={place} className="text-heading-lg font-semibold tracking-tight text-ink-secondary">
            {place}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuiltBy;
