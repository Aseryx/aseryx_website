/**
 * Dataset teasers for /datasets, from the owner-approved profile drafts
 * (Design canvas, Oct 2026). Sample content: confirm with each owner before
 * the page goes live.
 *
 * `media` captions the 16:9 slot until real stills exist; `sample` replaces
 * it with a quoted entry for text datasets. A stat with `pending` is still
 * being confirmed by the owner. `profile` holds the full profile (v0.3 PDF
 * layout); datasets without one show their teaser facts and a review note.
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
    profile: {
      uses: 'Autonomy, world models and simulation',
      lede: 'Driving footage shot on a nodal multi-camera rig, every angle in sync, with rich metadata on every clip.',
      headline: [
        { value: '1,750+', label: 'hours' },
        { value: '50,000+', label: 'clips' },
        { value: '9', label: 'synchronized angles, compact rig' },
        { value: '15,000+', label: 'rural clips' },
      ],
      keywords: ['Real capture', 'Video', 'Multi-angle', 'Synchronized', 'City and rural', 'Cycling POV', 'Rich metadata', 'Shoots to order'],
      overview: {
        title: 'Driving footage where every angle was recorded at the same moment, from the same point.',
        body: 'The rig is nodal, with cameras at precise 45-degree angles from the centre rather than separate front and back clusters. Every clip is synchronized across all angles by timecode and by start and stop. The library spans city plates and 15,000+ rural clips, plus cycling POV, and every clip has a description and keywords.',
      },
      glance: {
        columns: ['Component', 'Scope', 'Detail'],
        rows: [
          ['Rig', 'Nodal, 45-degree spacing', 'Compact 9-angle rig and a wider "spider" rig with more parallax'],
          ['Sync', 'All angles', 'Timecode plus start and stop'],
          ['Coverage', '1,750+ hours', 'City and rural driving, cycling POV'],
          ['Metadata', 'Every clip', 'Description and keywords'],
        ],
      },
      intendedUses: [
        { title: 'Autonomy and world models', detail: 'trained on synchronized multi-view driving.' },
        { title: 'Simulation.' },
      ],
      specification: [
        { label: 'Rig', value: 'Nodal, 45-degree spacing from centre', note: 'A compact 9-angle rig and a wider "spider" rig with more parallax' },
        { label: 'Sync', value: 'All angles in sync, timecode plus start and stop' },
        { label: 'Volume', value: '1,750+ hours, 50,000+ clips' },
        { label: 'Coverage', value: 'City and rural driving, cycling POV', note: '15,000+ rural clips' },
        { label: 'Metadata', value: 'A description and keywords on every clip' },
        { label: 'New coverage', value: 'Shot to order, based on requests' },
      ],
      metadata: {
        title: 'Clip metadata',
        columns: ['Field', 'What it records'],
        rows: [
          ['Time of day', 'Day, night, dawn, dusk'],
          ['Season', 'Season of the shoot'],
          ['Weather', 'Weather in the clip'],
          ['Region, city and street', 'Region, city and the street being travelled'],
          ['From and to streets', 'From which street to which street'],
          ['Direction of travel', 'Which way the car is heading'],
          ['Road type', 'Type of road'],
          ['Traffic', 'Whether there is traffic'],
          ['Points of interest', 'Such as overpasses, cemeteries and churches'],
        ],
        note: 'Recorded for every clip, as described by the owner.',
      },
      provenance: [
        { label: 'Author', value: 'DrivingFootage.com, the studio’s own crews', status: 'confirmed' },
        { label: 'Ownership', value: 'Owned by the studio, as stated by the owner', status: 'confirmed' },
        { label: 'Source', value: 'Own-shot. Not scraped, not synthetic.', status: 'confirmed' },
        { label: 'People and plates', value: 'Visible, not blurred, as confirmed by the owner', note: 'Blurring is done by the licensee as needed.', status: 'confirmed' },
        { label: 'Quality review', value: 'Aseryx review in progress', status: 'pending' },
      ],
      delivery: [
        { label: 'Browse', value: 'Full library with synchronized angles', note: 'youtube.com/@DrivingFootage/playlists' },
        { label: 'New coverage', value: 'Shot to order' },
      ],
      licence: [
        { label: 'Terms', value: 'Non-exclusive, as stated by the owner' },
        { label: 'Signed by', value: 'DrivingFootage.com and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'Faces and licence plates are not blurred; the licensee handles blurring and any privacy review for its use.',
        'Locations of future shoots depend on requests.',
      ],
    },
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

export const findDataset = (slug) => DATASETS.find((d) => d.slug === slug);

export const MODALITIES = [...new Set(DATASETS.map((d) => d.modality))];

export default DATASETS;
