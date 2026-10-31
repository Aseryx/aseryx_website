import CertificateMark from '../motion/certificate/CertificateMark.jsx';
import { certificateFor } from './certificate.js';

/**
 * Says whether a dataset carries a quality certificate yet: the seal and its
 * words, in the same chip as the modality on a card. A certified seal draws
 * itself in the first time it is seen.
 */
const CertificateChip = ({ dataset, className = '' }) => {
  const { status, label } = certificateFor(dataset);
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border-light bg-card px-2 py-1 text-meta text-ink ${className}`}
    >
      <CertificateMark status={status} label={label} size={16} />
    </span>
  );
};

export default CertificateChip;
