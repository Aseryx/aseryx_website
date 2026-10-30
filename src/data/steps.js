/**
 * The product path, from Website copy v2: list, review, approve. Each id
 * picks the step's screen on Home (StepScreen) and names its loop in
 * public/motion/loops, both from the aseryx-motion folder.
 */
export const STEPS = [
  { id: 'list', chip: 'List', title: 'List your dataset', body: 'It gets a quality certificate.' },
  { id: 'query', chip: 'Review', title: 'AI companies review it', body: 'They run a query and make an offer.' },
  { id: 'paid', chip: 'Approve', title: 'You approve', body: 'Then you get paid.' },
];
