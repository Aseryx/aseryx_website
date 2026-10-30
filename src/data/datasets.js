/**
 * Datasets for /datasets and their profiles, from the dataset cards in
 * ~/Downloads/datasetcards: the latest version of each card only (the
 * user's rule). A card marked "Approved by owner" gets its full `profile`.
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
    version: 'v0.2',
    updated: '2026-10-21',
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
    owner: 'NGOMEN BISIL Law firm',
    modality: 'Text',
    subject: 'Legal, French',
    version: 'v0.3',
    updated: '2026-10-22',
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
    profile: {
      uses: 'Fine-tuning',
      lede: 'Lawyer-written legal reasoning for the uniform business law of seventeen African states.',
      headline: [
        { value: '154', label: 'entries available now, validated' },
        { value: '4', label: 'levels of difficulty, Basic to Expert' },
        { value: '17', label: 'OHADA member states' },
        { value: '50', label: 'articles of the AUDCG covered' },
        { value: '3', label: 'entry types: definition, question and answer, case study' },
        { value: '10', label: 'entry public sample, CC BY-NC 4.0' },
      ],
      headlineNote: 'The 154 entries are a validated starting set that grows to order.',
      keywords: ['Real, human-written', 'Text', 'French', 'Instruction tuning', 'Non-exclusive', 'Built to order'],
      overview: {
        title: 'Each entry pairs a legal question with a reasoned answer, tied to the exact article, the case law and the doctrine behind it.',
        body: 'The set covers the first 50 articles of the Uniform Act on General Commercial Law (AUDCG). More uniform acts are built to order, at about an hour of a lawyer’s time per entry.',
      },
      glance: {
        columns: ['Component', 'Size', 'Detail'],
        rows: [
          ['Entries', '154', 'JSONL (instruction, input, output, metadata)'],
          ['Language', '', 'French'],
          ['Tasks', '', 'Text generation, question answering'],
          ['Difficulty', '4 levels', 'Basic, Intermediate, Advanced, Expert'],
          ['Topics', '', 'Trader status, commercial acts, evidence, prescription'],
        ],
      },
      intendedUses: [
        { title: 'Fine-tuning legal reasoning in French.' },
        { title: 'Text generation and question answering', detail: 'on OHADA commercial law, with cited sources.' },
      ],
      sampleEntry: {
        meta: 'AUDCG · Trader status · Basic · DEF',
        quote: 'What gives a person trader status under OHADA law?',
        answer:
          'The answer shows that trader status follows from several cumulative conditions rather than a single test, citing articles 2 and 3 of the AUDCG.',
        note: 'Sample entry, translated from French',
      },
      specification: [
        { label: 'Format', value: 'JSONL (instruction, input, output, metadata)' },
        { label: 'Language', value: 'French' },
        { label: 'Tasks', value: 'Text generation, question answering' },
        { label: 'Entry types', value: 'Definition, question and answer, case study' },
        { label: 'Difficulty', value: 'Basic, Intermediate, Advanced, Expert' },
        { label: 'Coverage', value: 'First 50 articles of the Uniform Act on General Commercial Law' },
        { label: 'Topics', value: 'Trader status, commercial acts, evidence, prescription' },
      ],
      metadata: {
        title: 'Fields',
        columns: ['Field', 'What it holds'],
        rows: [
          ['instruction', 'The legal question'],
          ['input', 'The facts, when there are any'],
          ['output', 'The reasoned answer'],
          ['difficulty', 'Basic to Expert'],
          ['entry_type', 'DEF, QR or CP'],
          ['article', 'Provisions cited'],
          ['sources', 'Texts, case law and doctrine, in full'],
        ],
      },
      notes: [
        {
          id: 'method',
          title: 'Method',
          body: [
            'Uniform Act → Case law → Doctrine',
            'Every rule cites its article and paragraph. References that cannot be verified are removed. Each entry is validated by a practising lawyer before it is included.',
          ],
        },
        {
          id: 'more',
          title: 'More on request',
          body: ['More uniform acts are built to order, at about an hour of a lawyer’s time per entry.'],
        },
      ],
      provenance: [
        { label: 'Author', value: 'A practising lawyer at NGOMEN BISIL Law firm, sole author', status: 'confirmed' },
        { label: 'Sources', value: 'Public legislation, published case law, cited doctrine', status: 'confirmed' },
        { label: 'Ownership', value: 'Confirmed by the owner', status: 'confirmed' },
        { label: 'Personal data', value: 'Entries do not use real party names from case law, confirmed by the owner', status: 'confirmed' },
        { label: 'Quality review', value: 'Aseryx review in progress', status: 'pending' },
      ],
      delivery: [
        { label: 'Format', value: 'JSONL, one entry per line' },
        { label: 'Public sample', value: '10 entries on Hugging Face, CC BY-NC 4.0' },
        { label: 'Full set', value: 'Not published' },
      ],
      licence: [
        { label: 'Terms', value: 'Non-exclusive. Exclusive rights quoted separately.' },
        { label: 'Signed by', value: 'NGOMEN BISIL Law firm and your team, directly' },
        { label: 'Price', value: 'On request, per entry by difficulty' },
      ],
      limits: ['French only.', 'Small by design; scale comes from commissioned work.', 'Doctrine is cited, not included.'],
    },
  },
  {
    slug: 'studio-human-motion-library',
    title: 'Studio Human Motion Library',
    owner: 'Apple Arts Studios',
    modality: 'Motion',
    subject: 'Human motion capture',
    version: 'v0.3',
    updated: '2026-10-22',
    summary:
      'Optical motion capture of real performers, as cleaned clips and full-length takes, recorded in-house by Apple Arts Studios.',
    media: 'Skeleton playback of one take',
    // The clips are cut from the full takes, so the two figures don't add up
    stats: [
      { value: '195 h 48 min', label: 'original full-length capture' },
      { value: '67 h 04 min', label: 'cleaned clips cut from the full takes' },
      { value: '15 yrs', label: 'in motion capture' },
    ],
    tags: ['Real capture', 'Body and fingers', 'Clips and full takes', 'Humanoid-ready'],
  },
];

export const findDataset = (slug) => DATASETS.find((d) => d.slug === slug);

/** The dataset whose profile is approved in full: what "a real profile" links and previews show. */
export const SAMPLE_PROFILE = DATASETS.find((d) => d.profile);

export const MODALITIES = [...new Set(DATASETS.map((d) => d.modality))];

export default DATASETS;
