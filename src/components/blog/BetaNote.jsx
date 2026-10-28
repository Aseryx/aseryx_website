import ActionRow from '../common/ActionRow.jsx';

/** The beta line under the blog and under each post, with that page's buttons. */
const BetaNote = ({ actions, className }) => (
  <ActionRow lead="Aseryx is in beta." actions={actions} className={className}>
    Get your dataset appraised, then license it on your terms.
  </ActionRow>
);

export default BetaNote;
