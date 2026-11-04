import Button from './Button.jsx';
import { CTA } from '../../config/ctas.js';

/** A Button whose label and destination come from the shared CTA list. */
const CtaButton = ({ action, ...props }) => {
  const { label, to, href } = CTA[action];
  return (
    <Button to={to} href={href} {...props}>
      {label}
    </Button>
  );
};

export default CtaButton;
