import ClipFrame from '../product/ClipFrame.jsx';

// Each How it works step's product clip, by step id: the flow in the app that
// the step's words describe. Step 1 has two sentences, so it plays the list
// clip, then the certificate clip, joined into one file (list-certificate).
const CLIPS = { list: 'list-certificate', query: 'offer', paid: 'paid' };

/** A How it works step's clip, centred in the step's column. */
const StepScreen = ({ step }) => <ClipFrame name={CLIPS[step.id]} className="mx-auto" />;

export default StepScreen;
