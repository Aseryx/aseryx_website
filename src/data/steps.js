/**
 * The product path in product voice, drafted from Notion > Aseryx Messaging
 * (Option E, the second-touch answer and the copy rules): no leave phrasing,
 * no "lock", no access that "ends". The ids stay as they are because the
 * step moments are keyed by them.
 */
export const STEPS = [
  {
    id: 'connect',
    chip: 'Choose',
    title: 'Choose the dataset',
    body: 'Pick the dataset you want AI teams to see. Your data stays under your control.',
  },
  {
    id: 'lock',
    chip: 'Decide',
    title: "Decide what's in it",
    body: "Keep what teams need and leave out what they don't.",
  },
  {
    id: 'verify',
    chip: 'Check',
    title: 'Get a quality check',
    body: "Aseryx checks your dataset's quality and gives teams a result they can review up front.",
  },
  {
    id: 'control',
    chip: 'Approve',
    title: 'Approve who gets a sample',
    body: 'Teams start with a small free sample. Nothing is shared until you approve, and you agree terms with them directly.',
  },
];
