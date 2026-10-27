/**
 * Dataset teasers for /datasets, from the owner-approved profile drafts
 * (Design canvas, Oct 2026). Sample content: confirm with each owner before
 * the page goes live.
 *
 * `media` captions the 16:9 slot until real stills exist; `sample` replaces
 * it with a quoted entry for text datasets. A stat with `pending` is still
 * being confirmed by the owner.
 */
const DATASETS = [
  {
    slug: 'synchronized-multi-angle-driving-footage',
    title: 'Synchronized Multi-Angle Driving Footage',
    owner: 'DrivingFootage.com',
    modality: 'Video',
    subject: 'Driving POV',
    version: 'v0.3',
    updated: '2026-10-26',
    summary:
      'A studio’s own library of driving footage, every clip shot on a nodal multi-camera rig with all angles in sync.',
    media: 'One moment from all 9 angles in a grid',
    stats: [
      { value: '1,750+', label: 'hours' },
      { value: '50,000+', label: 'clips' },
      { value: '9', label: 'synchronized angles' },
    ],
    tags: ['Real capture', 'Multi-angle', 'Synchronized', 'Non-exclusive'],
  },
  {
    slug: 'studio-3d-models-and-materials',
    title: 'Studio 3D Models and Materials',
    owner: 'Owner name pending',
    modality: '3D',
    subject: 'Materials',
    version: 'v0.1',
    updated: '2026-10-20',
    summary: 'A studio’s own library of 3D models and physically based materials, made by hand since 2008.',
    media: 'A product render',
    stats: [
      { value: '4,200+', label: '3D models' },
      { value: '8,400+', label: 'material sets', pending: true },
      { value: '8K', label: 'top texture resolution' },
    ],
    tags: ['Human-made', 'PBR materials', 'Real-world scale', 'Non-exclusive'],
  },
  {
    slug: 'ohada-business-law',
    title: 'OHADA Business Law',
    owner: 'Owner name pending',
    modality: 'Text',
    subject: 'Legal · French',
    version: 'v0.1',
    updated: '2026-10-20',
    summary: 'Lawyer-written legal reasoning for the uniform business law of seventeen African states.',
    sample: {
      meta: 'AUDCG · Trader status · Basic',
      quote: 'What gives a person trader status under OHADA law?',
      note: 'Sample entry, translated from French',
    },
    stats: [
      { value: '154', label: 'entries available now' },
      { value: '4', label: 'levels of difficulty' },
      { value: '17', label: 'member states' },
    ],
    tags: ['Human-written', 'French', 'Instruction tuning', 'Built to order'],
  },
  {
    slug: 'studio-human-motion-library',
    title: 'Studio Human Motion Library',
    owner: 'Owner name pending',
    modality: 'Motion',
    subject: 'Human motion capture',
    version: 'v0.1',
    updated: '2026-10-20',
    summary:
      'Optical motion capture of real performers, body and fingers, recorded in-house by a studio with fifteen years in mocap.',
    media: 'Skeleton playback of one take',
    stats: [
      { value: '195 h', label: 'original capture' },
      { value: '4', label: 'delivery formats' },
      { value: '15 yrs', label: 'in motion capture' },
    ],
    tags: ['Real capture', 'Body and fingers', 'Humanoid-ready', 'Non-exclusive'],
  },
];

export const MODALITIES = [...new Set(DATASETS.map((d) => d.modality))];

export default DATASETS;
