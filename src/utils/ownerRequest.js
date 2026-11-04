import { FORMS } from '../config/forms.js';

/** The kinds of data an owner can list: the score preview's, plus audio. */
export const DATA_KINDS = [
  ['table', 'Tables'],
  ['text', 'Text'],
  ['video', 'Video'],
  ['images', 'Images'],
  ['audio', 'Audio'],
  ['3d', '3D'],
  ['motion', 'Motion'],
];

export const DATA_SIZES = [
  ['under10k', 'Under 10,000'],
  ['under100k', '10,000 to 99,999'],
  ['under1m', '100,000 to 999,999'],
  ['more', '1 million or more'],
  ['unsure', 'Not sure'],
];

// The score preview's size answers, where one fits a size here. Its top
// answer (100,000 or more) spans two of these, so it fills in none.
export const SIZE_FROM_PREVIEW = {
  under100: 'under10k',
  under400: 'under10k',
  under10k: 'under10k',
  under100k: 'under100k',
};

const labelOf = (options, value) => options.find(([option]) => option === value)?.[1] ?? '';

/**
 * A request as Formspree's email shows it: each answer under a plain label,
 * the subject naming the company, and the owner's email as the reply-to.
 * `_gotcha` is Formspree's bot trap: any request that fills it is dropped.
 */
export const toFormspree = (request) => ({
  name: request.name.trim(),
  email: request.email.trim(),
  company: request.company.trim(),
  role: request.role.trim(),
  'kind of data': request.kinds.map((kind) => labelOf(DATA_KINDS, kind)).join(', '),
  'how many entries': labelOf(DATA_SIZES, request.size),
  about: request.about.trim(),
  _subject: `List your dataset: ${request.company.trim()}`,
  _gotcha: request.trap,
});

/**
 * Sends an owner's request to list to Formspree, which emails it to the
 * team's inbox; rejects when it doesn't go through. Until the form's address
 * is set (config/forms.js), it only waits a moment and succeeds.
 */
export async function sendOwnerRequest(request) {
  if (!FORMS.ownerRequest) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }
  const response = await fetch(FORMS.ownerRequest, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(toFormspree(request)),
  });
  if (!response.ok) throw new Error(`Formspree answered ${response.status}`);
}
