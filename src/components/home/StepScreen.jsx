import ClipFrame from '../product/ClipFrame.jsx';

// Each How it works step's product clip (aseryx-motion/product), by step id:
// the flow in the app that the step's words describe. Step 1 has two
// sentences, so it plays the list clip, then the certificate clip, joined
// into one file (list-certificate) so it loops like the others.
const CLIPS = {
  list: {
    name: 'list-certificate',
    label: 'An owner lists a dataset in the app, its checks clear, and its quality certificate shows its score',
  },
  query: { name: 'offer', label: 'An AI company runs a query on a dataset, then makes an offer and its payment is held' },
  paid: { name: 'paid', label: 'The owner approves the offer and gets paid' },
};

/** A How it works step's clip, centred in the step's column. */
const StepScreen = ({ step }) => <ClipFrame {...CLIPS[step.id]} className="mx-auto" />;

export default StepScreen;
