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

/**
 * Sends an owner's request to list. A mock for now: it waits a moment and
 * succeeds, so the page can be reviewed before email sending is set up. The
 * real one posts the request to the site's own endpoint, which emails the
 * team and sends the owner a confirmation from @aseryx.xyz.
 */
export async function sendOwnerRequest() {
  await new Promise((resolve) => setTimeout(resolve, 700));
}
