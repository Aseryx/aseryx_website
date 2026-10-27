/**
 * Who does what in a license, shared by dataset profiles and the buyers page.
 * `signs` marks the two parties to the license; Aseryx is not one of them.
 */
export const LICENSING_STEPS = [
  { title: 'Owner', signs: true, body: 'Holds the rights and approves every line before it is shared.' },
  { title: 'Aseryx', signs: false, body: 'Reviews the dataset and introduces your team to the owner.' },
  { title: 'Your team', signs: true, body: 'Signs the license directly with the owner.' },
];
