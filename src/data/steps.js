/**
 * The product path, from Website copy v2: list, review and offer, approve.
 * Each id keys its step moment in StepMoment.
 */
export const STEPS = [
  { id: 'list', chip: 'List', title: 'List your dataset', body: 'It gets a quality certificate.' },
  { id: 'certificate', chip: 'Certificate', title: 'AI companies review it', body: 'They run a query and make an offer.' },
  { id: 'offer', chip: 'Offer', title: 'You approve', body: 'Then you get paid.' },
];

/**
 * The one sample dataset all three step moments show. It is text, the kind
 * that gets a certificate today, so the screens need no field names.
 */
export const SAMPLE_LISTING = { kind: 'Text', name: 'Commercial contracts', size: '12,400' };
