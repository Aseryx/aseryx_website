/**
 * Who does what in a license, in the order the diagram shows them (owner,
 * Aseryx, your team), shared by dataset profiles and the For AI companies page.
 * `signs` marks the two parties to the license; Aseryx is not one of them.
 */
export const LICENSING_STEPS = [
  { title: 'Owner', signs: true, body: 'Owns the data and approves every offer.' },
  { title: 'Aseryx', signs: false, body: 'Issues the quality certificate and holds your payment until the owner approves.' },
  { title: 'Your team', signs: true, body: 'Reads the certificate, runs a query and makes an offer.' },
];
