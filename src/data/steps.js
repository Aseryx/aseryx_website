/**
 * The product path, from Notion > Aseryx Messaging (the second-touch answer,
 * Tala's Oct 25 decisions and the copy rules): pick, appraise, approve a
 * sample, sign. Each id keys its step moment in StepMoment.
 */
export const STEPS = [
  { id: 'lock', chip: 'Pick', title: 'Pick your dataset', body: 'Choose the dataset you made and what goes in it.' },
  {
    id: 'verify',
    chip: 'Appraise',
    title: 'Get it appraised',
    body: 'Aseryx scores its quality and drafts a profile. You approve every line.',
  },
  { id: 'control', chip: 'Approve', title: 'Approve a sample', body: 'When a team asks for one, you say yes or no.' },
  { id: 'license', chip: 'Sign', title: 'Sign the license', body: 'Agree terms with the team and sign directly.' },
];
