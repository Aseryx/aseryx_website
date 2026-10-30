import Card from '../common/Card.jsx';
import MomentHeader from '../product/MomentHeader.jsx';
import ListMoment from '../motion/moments/ListMoment.jsx';
import CertificateMoment from '../motion/moments/CertificateMoment.jsx';
import OfferMoment from '../motion/moments/OfferMoment.jsx';

// Each How it works step's screen (Website v2 › How it works › Screens), by
// step id. Home drops the offer's term: v2 keeps term lengths to the For AI
// companies page, the FAQ and dataset profiles.
const SCREENS = {
  list: { label: 'A listed dataset gets its quality certificate', Moment: ListMoment },
  query: { label: 'A dataset’s quality certificate', Moment: CertificateMoment },
  paid: { label: 'An offer from an AI company, approved', Moment: OfferMoment, props: { term: null } },
};

/**
 * A How it works step's screen, framed as the site frames a coded moment:
 * a Card headed by the step's chip. It plays once, the first time half of it
 * is on screen. animateOnLoad also plays one that mounts already on screen,
 * as the phone layout's screen does each time a chip swaps it.
 */
const StepScreen = ({ step, animateOnLoad = false }) => {
  const { label, Moment, props } = SCREENS[step.id];
  return (
    <Card lift className="mx-auto flex w-full max-w-[36rem] flex-col overflow-hidden" role="figure" aria-label={label}>
      <MomentHeader label={step.chip} />
      <Moment {...props} animateOnLoad={animateOnLoad} />
    </Card>
  );
};

export default StepScreen;
