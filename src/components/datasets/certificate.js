/**
 * Whether a dataset carries a quality certificate yet, and what its card and
 * profile say either way. Certificates start with tabular data, databases and
 * text; footage, audio and 3D can show a profile now, and theirs follow
 * (Website copy v2).
 */
export const CERTIFICATE = {
  // status is CertificateMark's: the closed seal, or the faint ring alone
  issued: {
    status: 'certified',
    label: 'Quality certificate',
    body: 'What this dataset contains and how clean and well-structured it is, worked out from this exact data.',
  },
  toFollow: {
    status: 'to-follow',
    label: 'Certificate to follow',
    body: 'Certificates start with tabular data, databases and text; for footage, audio and 3D they follow.',
  },
};

// A dataset says it carries a certificate only once one has been issued for
// it, marked by `certificate: true` on its entry in src/data/datasets.js. The
// kind of data isn't enough: a text dataset can still be waiting for its run,
// and its card would then claim a certificate nobody can see.
export const certificateFor = (dataset) => (dataset.certificate ? CERTIFICATE.issued : CERTIFICATE.toFollow);
