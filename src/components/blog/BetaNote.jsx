import ActionRow from '../common/ActionRow.jsx';

/** The beta line under the blog and under each post, with that page's buttons. */
const BetaNote = ({ actions, className }) => (
  <ActionRow lead="Aseryx opens in beta soon." actions={actions} className={className}>
    List your dataset now and get its profile ready.
  </ActionRow>
);

export default BetaNote;
