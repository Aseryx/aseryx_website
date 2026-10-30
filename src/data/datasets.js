/**
 * Datasets for /datasets and their profiles, from the dataset cards in
 * ~/Downloads/datasetcards: the latest version of each card only (the
 * user's rule). Every dataset has its full `profile`: the user confirmed on
 * Oct 30, 2026 that all of them are approved by their owners, and asked for
 * provenance to show only confirmed lines, so lines a card still marks as
 * being confirmed are left out.
 *
 * `media` captions the 16:9 slot until real stills exist, over `art`, a
 * drawing of what the dataset holds (DatasetArt); a dataset without `media`
 * is captioned with its approved profile's sample question instead. `ownerLogo` is the logo from the owner's
 * card, where the card has one. A stat with `pending` is still
 * being confirmed by the owner. `profile` holds the full profile (v0.3 PDF
 * layout).
 */
import { OWNER_PENDING } from './owners.js';

export { OWNER_PENDING };

const ENTRIES = [
  {
    slug: 'synchronized-multi-angle-driving-footage',
    title: 'Synchronized Multi-Angle Driving Footage',
    owner: 'DrivingFootage.com',
    ownerLogo: { src: '/images/owners/drivingfootage-com.png', width: 324, height: 96 },
    modality: 'Video',
    subject: 'Driving POV',
    version: 'v0.3',
    updated: '2026-10-26',
    summary:
      'A studio’s own library of driving footage, every clip shot on a nodal multi-camera rig with all angles in sync.',
    media: 'One moment from all 9 angles in a grid',
    art: 'driving',
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
      ],
      delivery: [
        { label: 'Browse', value: 'Full library with synchronized angles', note: 'youtube.com/@DrivingFootage/playlists' },
        { label: 'New coverage', value: 'Shot to order' },
      ],
      license: [
        { label: 'Terms', value: 'Non-exclusive, as stated by the owner' },
        { label: 'Signed by', value: 'DrivingFootage.com and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'Faces and license plates are not blurred; the licensee handles blurring and any privacy review for its use.',
        'Locations of future shoots depend on requests.',
      ],
    },
  },
  {
    slug: 'studio-3d-models-and-materials',
    title: 'Studio 3D Models and Materials',
    owner: OWNER_PENDING,
    modality: '3D',
    subject: 'Materials',
    version: 'v0.2',
    updated: '2026-10-21',
    summary: 'A studio’s own library of 3D models and physically based materials, made by hand since 2008.',
    media: 'A product render',
    art: 'render',
    stats: [
      { value: '4,200+', label: '3D models' },
      { value: '8,400+', label: 'material sets', pending: true },
      { value: '8K', label: 'top texture resolution' },
    ],
    tags: ['Human-made', 'PBR materials', 'Real-world scale', 'Non-exclusive'],
    profile: {
      uses: 'Generative 3D and simulation',
      lede: 'A studio’s own library of 3D models and physically based materials, made by hand since 2008.',
      headline: [
        { value: '4,200+', label: '3D models' },
        { value: '8,400+', label: 'material sets' },
        { value: '8K', label: 'top texture resolution' },
      ],
      keywords: ['Human-made', '3D models', 'PBR materials', 'Real-world scale', 'Croissant metadata', 'Non-exclusive', 'Pilot available'],
      overview: {
        title: 'Clean, human-made 3D and material data with nothing scraped and nothing generated.',
        body: 'Every asset ships with real-world scale, captions, tags and a metadata file, plus fixed train and test splits. It is ready for text-to-3D, image-to-3D, material generation and simulation work. There are over 40 categories in all, and a license can cover one category, a family or the whole library.',
      },
      glance: {
        columns: ['Component', 'Detail', 'Format'],
        rows: [
          ['Models', '4,200+, a product render for each', 'GLB and USDZ, with physics properties'],
          ['Materials', '8,400+ sets at 2K, 4K and 8K', 'PBR, OpenPBR .mtlx'],
          ['Scale', 'Real-world centimetres', 'Measured from geometry'],
          ['Metadata', 'Per asset, plus a master index', 'JSON, Croissant 1.0'],
          ['Splits', 'Fixed train and test', 'Balanced by category'],
        ],
      },
      intendedUses: [{ title: 'Text-to-3D and image-to-3D.' }, { title: 'Material generation.' }, { title: 'Simulation.' }],
      specification: [
        { label: 'Models', value: 'GLB and USDZ, with physics properties', note: 'A product render for each model' },
        { label: 'Materials', value: '2K, 4K and 8K PBR sets, OpenPBR .mtlx', note: 'Normal maps in OpenGL and DirectX; 16-bit height maps where available' },
        { label: 'Scale', value: 'Real-world centimetres, measured from geometry', note: 'Uncertain scales are flagged, never guessed' },
        { label: 'Metadata', value: 'Per-asset JSON, master index, Croissant 1.0' },
        { label: 'Integrity', value: 'SHA-256 per file, triangle and vertex counts' },
        { label: 'Splits', value: 'Fixed train and test splits, balanced by category' },
      ],
      metadata: {
        title: 'Largest categories',
        columns: ['Category', 'Count'],
        rows: [
          ['Furnishing', '854'],
          ['Architecture', '844'],
          ['Deciduous trees', '622'],
          ['Concrete materials', '595'],
          ['Wood materials', '532'],
          ['Metal materials', '472'],
          ['Rock materials', '435'],
          ['Brick wall materials', '427'],
        ],
        note: 'Over 40 categories in all.',
      },
      provenance: [
        { label: 'Author', value: 'The studio’s in-house team', note: 'Identity shared once there is mutual interest', status: 'confirmed' },
        { label: 'Ownership', value: 'Owned outright, documented chain of ownership', status: 'confirmed' },
        { label: 'Source', value: 'Not scraped, not synthetic, not user-generated', status: 'confirmed' },
        { label: 'People', value: 'None. Objects and surfaces only.', status: 'confirmed' },
      ],
      delivery: [{ label: 'Delivery', value: 'Bulk download with index and checksums' }],
      license: [
        { label: 'Terms', value: 'Non-exclusive, perpetual, worldwide' },
        { label: 'Covers', value: 'Training production models you ship or sell' },
        { label: 'Protection', value: 'IP warranty and indemnity on paid licenses' },
        { label: 'Separate quote', value: 'Exclusivity, resale, redistribution' },
        { label: 'Signed by', value: 'The owner and your team, directly' },
        { label: 'Price', value: 'On request. A fixed-price pilot is available.' },
      ],
      limits: [
        'Training licenses start at 1,000 assets.',
        'The evaluation set is for internal evaluation only.',
        'Height maps are not available for every material.',
      ],
    },
  },
  {
    slug: 'ohada-business-law',
    title: 'OHADA Business Law',
    owner: 'NGOMEN BISIL Law firm',
    modality: 'Text',
    art: 'law',
    subject: 'Legal, French',
    version: 'v0.3',
    updated: '2026-10-22',
    summary: 'Lawyer-written legal reasoning for the uniform business law of seventeen African states.',
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
      ],
      delivery: [
        { label: 'Format', value: 'JSONL, one entry per line' },
        { label: 'Public sample', value: '10 entries on Hugging Face, CC BY-NC 4.0' },
        { label: 'Full set', value: 'Not published' },
      ],
      license: [
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
    ownerLogo: { src: '/images/owners/apple-arts-studios.png', width: 127, height: 96 },
    modality: 'Motion',
    subject: 'Human motion capture',
    version: 'v0.3',
    updated: '2026-10-22',
    summary:
      'Optical motion capture of real performers, as cleaned clips and full-length takes, recorded in-house by Apple Arts Studios.',
    media: 'Skeleton playback of one take',
    art: 'motion',
    // The clips are cut from the full takes, so the two figures don't add up
    stats: [
      { value: '195 h 48 min', label: 'original full-length capture' },
      { value: '67 h 04 min', label: 'cleaned clips cut from the full takes' },
      { value: '15 yrs', label: 'in motion capture' },
    ],
    tags: ['Real capture', 'Body and fingers', 'Clips and full takes', 'Humanoid-ready'],
    profile: {
      uses: 'Humanoid robotics and animation',
      lede: 'Optical motion capture of real performers, as cleaned clips and full-length takes, recorded in-house by Apple Arts Studios.',
      headline: [
        { value: '195 h 48 min', label: 'original full-length capture sequences, Tier 2' },
        { value: '67 h 04 min', label: 'cleaned, segmented clips, Tier 1, cut from Tier 2' },
        { value: '24', label: 'OptiTrack PrimeX 41 cameras, evaluation release' },
        { value: '120 Hz', label: 'capture rate, evaluation release' },
        { value: '53', label: 'point skeleton, evaluation release' },
        { value: '15 yrs', label: 'in motion capture' },
      ],
      headlineNote: 'Tier 1 is derived from Tier 2 and is not extra capture. Mirrored versions are not counted in the hours.',
      keywords: ['Real capture', 'Motion capture', 'Body and fingers', 'Clips and full takes', 'Humanoid-ready', 'Capture to order'],
      overview: {
        title: 'Two tiers from the same capture: cleaned clips, and the full-length takes they were cut from.',
        body: 'Tier 2 is 195 hours 48 minutes of original full-length capture sequences. Tier 1 is 67 hours 04 minutes of cleaned, segmented motion clips cut from Tier 2. Mirrored versions exist for both tiers. The public evaluation release ships SOMA Uniform BVH, Unitree G1 CSV and metadata.',
      },
      glance: {
        columns: ['Component', 'Size or rate', 'Format'],
        rows: [
          ['Tier 1', '67 h 04 min', 'Cleaned, segmented clips'],
          ['Tier 2', '195 h 48 min', 'Full-length continuous recordings'],
          ['Mirrored versions', 'Both tiers', 'Not counted in the hours'],
          ['Formats', 'Evaluation release', 'SOMA Uniform BVH, Unitree G1 CSV, metadata CSV'],
          ['Capture', '24 cameras, 120 Hz in the evaluation release', 'Vicon and OptiTrack optical systems'],
          ['Other formats', 'On request', 'Discussed per dataset'],
        ],
      },
      intendedUses: [
        { title: 'Humanoid imitation learning and whole-body control,', detail: 'with Unitree G1 retargets included.' },
        { title: 'Motion generation models', detail: 'trained on real performers.' },
        { title: 'Retargeting and animation pipelines.' },
        { title: 'Clips or continuous takes,', detail: 'depending on the training setup.' },
      ],
      specification: [
        { label: 'Release', value: 'Evaluation release, version 3.1, public on Hugging Face', note: 'huggingface.co/datasets/Appleartsstudios/Motion_Dataset' },
        { label: 'Contents', value: '2.58k metadata rows, originals and mirrors', note: 'As shown in the Hugging Face viewer' },
        { label: 'Move length', value: '7.2 to 26.2 s' },
        { label: 'Frames', value: '216 to 2.68k per file', note: 'Hugging Face viewer figures' },
        { label: 'BVH frame rate', value: '30 to 120 fps' },
        { label: 'Capture setup', value: 'Optical, OptiTrack PrimeX 41, 24 cameras, 120 Hz, 53-point skeleton, studio in India', note: 'The same in every row' },
        {
          label: 'Coverage',
          value: '96 moves in 7 categories, with 8 props',
          note: '6 performers, all male, aged 23 to 33, 54 to 91 kg and 160 to 183 cm tall, in 1 package (Locomotion). Evaluation release.',
        },
      ],
      metadata: {
        title: 'Metadata columns',
        columns: ['1 to 8', '9 to 16', '17 to 24', '25 to 32'],
        rows: [
          ['move_name', 'actor_gender', 'prop_dimension_length', 'modality'],
          ['filename', 'actor_age', 'take_actor_filename', 'capture_setup_system_type'],
          ['package', 'actor_weight', 'take_prop_filename', 'capture_setup_camera_model'],
          ['category', 'actor_height', 'move_duration', 'capture_setup_camera_count'],
          ['is_mirror', 'prop_name', 'file_frames', 'capture_setup_skeleton_label'],
          ['move_soma_uniform_path', 'content_props', 'capture_setup_frame_rate_hz', 'capture_setup_location'],
          ['unitree_g1_path', 'prop_dimension_height', 'bvh_fps', 'file_format'],
          ['actor_uid', 'prop_dimension_width', 'version', 'file_format.1'],
        ],
        note: '32 columns per row in the evaluation release.',
      },
      notes: [
        {
          id: 'more',
          title: 'More on request',
          body: ['Brief → Capture → Deliver', 'The studio records custom motion to a brief: specific actions, performers or environments.'],
        },
      ],
      provenance: [
        { label: 'Studio', value: 'Apple Arts Studios, in-house capture team', status: 'confirmed' },
        { label: 'Ownership', value: 'Produced in-house and owned by the studio, as stated by the owner', status: 'confirmed' },
        { label: 'Source', value: 'Recorded in the studio. Not scraped, not synthetic.', status: 'confirmed' },
      ],
      delivery: [
        { label: 'Formats', value: 'SOMA Uniform BVH, Unitree G1 CSV, metadata' },
        { label: 'Other formats', value: 'Other formats and processing discussed per dataset' },
        { label: 'Delivery', value: 'Bulk download, by take or by category' },
        { label: 'Public release', value: 'Evaluation set on Hugging Face, under the Apple Arts Studio Motion Dataset license' },
      ],
      license: [
        { label: 'Terms', value: 'Agreed directly with Apple Arts Studios for each intended use' },
        { label: 'Signed by', value: 'Apple Arts Studios and your team, directly' },
        { label: 'Price', value: 'On request. Custom capture quoted separately.' },
      ],
      limits: [
        'Motion only; no video of the performers.',
        'Tier 1 is cut from Tier 2, so the two tiers’ hours do not add up.',
        'Mirrored files are copies of the same takes.',
        'The public evaluation release covers one package (Locomotion) and six male performers.',
      ],
    },
  },
  {
    slug: 'central-european-rural-landscapes',
    title: 'Central European Rural Landscapes',
    owner: 'BATRIS s. r. o.',
    modality: 'Image',
    subject: 'Scene classification',
    version: 'v0.4',
    updated: '2026-10-27',
    summary: 'Photographs of rural Central Europe, each labelled by landscape type, shot and annotated by one owner.',
    media: 'Ground and drone views, labelled by landscape type',
    art: 'landscape',
    stats: [
      { value: '945', label: 'labelled images in v1.0' },
      { value: '7', label: 'landscape classes' },
      { value: '8064 × 4536', label: 'largest image size, pixels' },
    ],
    tags: ['Real capture', 'Ground and drone', 'Labelled', 'Non-exclusive'],
    profile: {
      uses: 'Scene classification',
      lede: 'Photographs of rural Central Europe, each labelled by landscape type, shot and annotated by one owner.',
      headline: [
        { value: '945', label: 'labelled images in v1.0' },
        { value: '7', label: 'landscape classes' },
        { value: '8064 × 4536', label: 'largest image size, pixels; smallest about 1596 × 898' },
      ],
      keywords: ['Real capture', 'Images', 'Ground and drone', 'Labelled', 'Non-exclusive', 'Collection on request'],
      overview: {
        title: 'Built to teach a model what kind of rural place it is looking at: meadow, forest, wetland, mountain or farmland.',
        body: 'Ground-level photography mixed with vertical and oblique drone imagery, across several seasons including winter. Each image carries one primary class and optional supporting tags.',
      },
      glance: {
        columns: ['Component', 'Size or rate', 'Format'],
        rows: [
          ['Images', '945', 'JPEG, RGB, about 1596 × 898 to 8064 × 4536 px, landscape and portrait; sizes vary with the capture device'],
          ['Viewpoints', 'Ground and drone', 'Ground photography, vertical and oblique drone imagery'],
          ['Labels', 'One per image', 'Primary class plus optional tags, CSV, one row per image'],
          ['Metadata', 'EXIF removed', 'No coordinates or location data'],
        ],
      },
      intendedUses: [{ title: 'Rural scene classification', detail: 'from ground and drone views.' }],
      specification: [
        { label: 'Format', value: 'JPEG, RGB, natural colour' },
        {
          label: 'Size',
          value: 'About 1596 × 898 to 8064 × 4536 pixels',
          note: 'Landscape and portrait. Sizes reflect the capture devices and methods used; images were not downscaled or resampled.',
        },
        { label: 'Viewpoints', value: 'Ground photography, vertical and oblique drone imagery' },
        { label: 'Labels', value: 'One primary class per image, optional tags', note: 'CSV, one row per image' },
        { label: 'Metadata', value: 'EXIF removed. No coordinates or location data.' },
        { label: 'Version', value: 'v1.0, classes and tags frozen' },
      ],
      metadata: {
        title: 'Classes',
        columns: ['Class', 'Images'],
        rows: [
          ['Meadows and pastures', '395'],
          ['Mosaic rural landscape', '224'],
          ['Forest landscapes', '188'],
          ['Agricultural landscape, arable land', '58'],
          ['Water and wetland environments', '52'],
          ['Anthropogenic and technical features', '16'],
          ['Mountain and sub-mountain terrain', '12'],
        ],
        note: 'Images per class, v1.0. Classes and tags are frozen.',
      },
      notes: [
        {
          id: 'more',
          title: 'More on request',
          body: [
            'Shot → Selected → Labelled',
            'About 400 to 500 further photos are awaiting selection, technical processing and annotation. Processing is tentatively planned to begin in 2027; the completion date and the final number of images are not yet fixed. Targeted collection, by class or by season, is also possible, subject to the client’s specific requirements, technical and operational feasibility, and mutually agreed terms.',
          ],
        },
      ],
      provenance: [
        { label: 'Owner', value: 'BATRIS s. r. o.', status: 'confirmed' },
        { label: 'Author', value: 'One owner took every photo and labelled every image', status: 'confirmed' },
        { label: 'Ownership', value: 'Confirmed by the owner', status: 'confirmed' },
        {
          label: 'People and plates',
          value: 'None identifiable, confirmed by the owner',
          note: 'No blurring applied; distant figures or vehicles can’t be fully ruled out.',
          status: 'confirmed',
        },
        { label: 'Location data', value: 'Removed', status: 'confirmed' },
      ],
      delivery: [
        { label: 'Delivery', value: 'One ZIP archive per class, with the full label set' },
        {
          label: 'Public sample',
          value: 'On Hugging Face, with technical documentation and methodology',
          note: 'huggingface.co/datasets/batris-data/central-europe-rural-landscape-dataset-sample',
        },
      ],
      license: [
        { label: 'Terms', value: 'Non-exclusive commercial license' },
        {
          label: 'Allowed',
          value: 'AI training, research, commercial products',
          note: 'Derived outputs belong to the licensee, provided they do not contain the dataset or a substantial portion of it, or enable its reconstruction.',
        },
        { label: 'Not allowed', value: 'Redistributing, reselling or sublicensing the images' },
        { label: 'Signed by', value: 'BATRIS s. r. o. and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'Classes are uneven (mountain terrain has 12 images, meadows have 395).',
        'Scene labels only, no boxes or masks.',
        'Central Europe only; countries are not broken out.',
        'Image sizes vary with the capture device.',
      ],
    },
  },
  {
    // The card withholds the owner's name until there is mutual interest, and
    // whether the retailers' terms allow this use is still being checked
    slug: 'us-retail-product-and-barcode-catalog',
    title: 'US Retail Product and Barcode Catalog',
    owner: OWNER_PENDING,
    modality: 'Tabular',
    subject: 'Retail products',
    version: 'v0.2',
    updated: '2026-10-21',
    summary: 'A verified catalog of US retail products with exact barcode matches across eight major retailers.',
    media: 'One product matched across retailers by its barcode',
    art: 'retail',
    stats: [
      { value: '1,175,454', label: 'SKUs' },
      { value: '420,382', label: 'exact cross-store barcode matches' },
      { value: '8', label: 'retailers' },
    ],
    tags: ['UPC and GTIN', 'Cross-store matches', 'Exact matching', 'Non-exclusive'],
    profile: {
      uses: 'Product matching, entity resolution and pricing models',
      lede: 'A verified catalog of US retail products with exact barcode matches across eight major retailers.',
      headline: [
        { value: '1,175,454', label: 'SKUs' },
        { value: '420,382', label: 'exact cross-store barcode matches' },
        { value: '8', label: 'retailers' },
      ],
      keywords: ['Tabular', 'Retail', 'UPC and GTIN', 'Cross-store matches', 'Exact matching', 'Evaluation slices', 'Non-exclusive'],
      overview: {
        title: 'Product data where every cross-store match is an exact barcode match, never a fuzzy guess.',
        body: 'Each product carries verified barcodes, retailer IDs, brand, title, category, stock status and shelf pricing. Barcodes are validated with GS1 check digits, and products are matched across retailers only when the barcodes agree exactly. The catalog covers Walmart, Target, Amazon, Kroger, Fry’s, Meijer, Publix and Aldi.',
      },
      glance: {
        columns: ['Component', 'Size', 'Detail'],
        rows: [
          ['Products', '1,175,454 SKUs', 'Barcode (UPC/GTIN), retailer IDs, brand, title, category, stock status, shelf price'],
          ['Matches', '420,382', 'Exact cross-store barcode matches'],
          ['Retailers', '8', 'Walmart, Target, Amazon, Kroger, Fry’s, Meijer, Publix, Aldi'],
          ['Evaluation slices', '10,000 and 25,000 SKUs', 'Ready'],
        ],
      },
      intendedUses: [
        { title: 'Product matching', detail: 'across retailers, on exact barcodes.' },
        { title: 'Entity resolution.' },
        { title: 'Pricing models', detail: 'on shelf prices anchored to physical stores.' },
      ],
      specification: [
        { label: 'Fields', value: 'Barcode (UPC/GTIN), retailer IDs, brand, title, category, stock status, shelf price' },
        { label: 'Pricing', value: 'Shelf prices anchored to physical store locations' },
        { label: 'Validation', value: 'GS1 check-digit pipeline', note: 'Leading zeros preserved in every UPC' },
        { label: 'Matching', value: 'Exact barcode matches only, no fuzzy matching' },
        { label: 'Evaluation', value: '10,000 and 25,000 SKU slices ready', note: '500-row sanitized preview available' },
      ],
      provenance: [
        { label: 'Author', value: 'An independent data builder', note: 'Identity shared once there is mutual interest', status: 'confirmed' },
        { label: 'Source', value: 'Retailers’ public web storefronts, normalized by the owner', note: 'No logins, no restricted partner feeds', status: 'confirmed' },
        { label: 'Personal data', value: 'None. Products only.', status: 'confirmed' },
      ],
      delivery: [
        { label: 'Delivery', value: 'A licensed cut for a term', note: 'The master catalog stays with the owner' },
        { label: 'Preview', value: '500-row sanitized preview available' },
      ],
      license: [
        { label: 'Terms', value: 'Non-exclusive; slices or the full catalog' },
        { label: 'Signed by', value: 'The owner and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'US retailers only.',
        'Prices and stock are snapshots in time.',
        'Collected from public storefronts, so retailer terms must be cleared before a license.',
      ],
    },
  },
  {
    slug: 'photogrammetry-scans-of-real-people',
    title: 'Photogrammetry Scans of Real People',
    owner: 'Bethe Beheer B.V., trading as HumanAlloy',
    ownerLogo: { src: '/images/owners/humanalloy.png', width: 531, height: 96 },
    modality: '3D',
    subject: 'Human scans',
    version: 'v0.3',
    updated: '2026-10-26',
    summary:
      'A closed catalogue of 4,342 finished 3D models of 125 real people, plus 537 raw A-pose scans, captured on a 132-DSLR photogrammetry rig.',
    media: 'One finished model beside its raw photo set',
    art: 'scan',
    stats: [
      { value: '4,342', label: 'unique processed 3D human models' },
      { value: '125', label: 'unique people across the whole set' },
      { value: '537', label: 'raw A-pose scans' },
    ],
    tags: ['Real capture', '3D scans', 'Raw photo sets', 'Signed releases'],
    profile: {
      uses: 'Digital humans, avatars and neural rendering',
      lede: 'A closed catalogue of 4,342 finished 3D models of 125 real people, plus 537 raw A-pose scans, captured on a 132-DSLR photogrammetry rig.',
      headline: [
        { value: '4,342', label: 'unique processed 3D human models' },
        { value: '125', label: 'unique people across the whole set' },
        { value: '537', label: 'raw A-pose scans, of 105 of the same people' },
        { value: '~130', label: 'DSLR photos per scan, 132-camera rig' },
        { value: '20', label: 'pose and scenario categories' },
        { value: '349', label: 'scans with 2 to 5 people' },
      ],
      headlineNote:
        'Counts from the owner’s catalogue reconciliation of October 22, 2026: unique models only, file variants and duplicate copies excluded. Capture has ended, so the set is stable.',
      keywords: ['Real capture', '3D scans', 'Raw photo sets', 'Per-scan calibration', 'A-pose', 'Signed releases', 'Closed set'],
      overview: {
        title: 'Every finished model comes with the raw photos, calibration and full-resolution scan behind it.',
        body: 'Each finished model is a static FBX mesh of about 40k triangles with a 2K texture. Behind it sits a raw capture bundle of about 130 DSLR photos with per-scan camera calibration, the high-resolution raw OBJ and an 8K texture. Every model carries metadata for scenario, gender, age group, ethnicity, pose, attire, season and setting. Capture has ended, so the set and its release documentation are stable.',
      },
      glance: {
        columns: ['Component', 'Size or rate', 'Format'],
        rows: [
          ['Finished model', '~40k tris, 20k verts', 'FBX, static (un-rigged), 2K diffuse texture'],
          ['Raw capture bundle', '~130 photos per scan', 'JPEG, per-scan calibration, raw OBJ, 8K texture'],
          ['A-pose raw scans', '537, 0.1 to 2.8 GB each', 'Unoptimised RealityCapture OBJ, 8K diffuse'],
          ['Camera parameters', 'Per scan', 'XML or COLMAP-style export'],
          ['Metadata', 'Per model', 'Scenario, gender, age group, ethnicity, pose, attire, season, setting'],
          ['On request', 'Other formats', 'Other mesh formats, Gaussian-splat exports'],
        ],
      },
      intendedUses: [
        { title: 'Multi-view and neural rendering', detail: '(NeRF, Gaussian splatting, multi-view diffusion) from the raw bundles and calibration.' },
        { title: 'Appearance and figure-in-scene training', detail: 'from finished models.' },
        { title: 'Rigging, retargeting and pose-conditioned training', detail: 'from the A-pose scans.' },
        { title: 'Curated subsets', detail: 'by scenario, age group or other attributes.' },
      ],
      specification: [
        {
          label: 'Finished model',
          value: 'Static FBX, optimised mesh (~40k tris, 20k verts), 2K diffuse texture',
          note: 'Production-ready. For archviz, real time, asset placement and appearance training.',
        },
        {
          label: 'Raw capture bundle',
          value: '~130 source DSLR photos per scan (JPEG) with per-scan calibration, plus the high-resolution raw OBJ and 8K texture',
          note: 'For NeRF, Gaussian splatting and multi-view diffusion',
        },
        {
          label: 'Viewpoints',
          value: 'Around 130 per scan',
          note: 'Occasionally one or two fewer where a camera dropped out. The rig changed over the years, which is why calibration comes per scan rather than as one generic rig.',
        },
        {
          label: 'A-pose scans',
          value: '537 scans in a neutral A-pose, of 105 people who also appear in the catalogue',
          note: 'Not processed into finished models and not sold on the owner’s site. Licensed as raw scans only, with the raw capture bundle available too.',
        },
        { label: 'Metadata', value: 'Per model: scenario, gender, age group, ethnicity, pose, attire, season, setting' },
      ],
      metadata: {
        title: 'Scenario and pose',
        columns: ['Category', 'Models'],
        rows: [
          ['Sitting', '876'],
          ['Standing', '833'],
          ['Business', '536'],
          ['Kids', '465'],
          ['Walking', '409'],
          ['Sport', '325'],
          ['Cycling', '234'],
          ['Pool', '120'],
          ['Couple', '99'],
          ['Formal affairs', '90'],
          ['Hospitality', '85'],
          ['Shopping', '68'],
          ['Mix', '50'],
          ['Medical', '50'],
          ['Bathroom', '35'],
          ['Driving', '28'],
          ['Door', '15'],
          ['Formal', '10'],
          ['Dancing', '10'],
          ['Misc', '5'],
        ],
        note: 'Models per category. Subject ages run from under 1 year to 93 years.',
      },
      notes: [
        {
          id: 'people',
          title: 'Who is in the catalogue',
          body: [
            'Gender: female 2,365 models (54.5%), male 2,198 (50.6%).',
            'Age group: adult 3,626 (83.5%), teen 349 (8.0%), senior 315 (7.3%), child 257 (5.9%), baby 8 (0.2%).',
            'Ethnicity: Caucasian 3,157 (72.7%), Black 549 (12.6%), Middle Eastern 253 (5.8%), Indian 197 (4.5%), Asian 142 (3.3%), Mixed 110 (2.5%), Latino 51 (1.2%).',
            'People per scan: one in 3,994 models (92.0%), two in 315 (7.3%), three in 24 (0.6%), four in 7 (0.2%), five in 3 (0.1%).',
            'Counts are per model. A multi-person scan is counted once for each attribute in the frame, so columns can add up to more than 4,342.',
          ],
        },
        {
          id: 'a-pose',
          title: 'A-pose scans by theme',
          body: [
            'Casual 300, Business 62, Kids 55, Sport 50, Pool 25, Professions 20, Formal affairs 15, Bathroom 10.',
            '537 scans, sorted into 108 theme folders.',
          ],
        },
      ],
      provenance: [
        {
          label: 'Owner',
          value: 'Bethe Beheer B.V. (trading as HumanAlloy), Netherlands',
          note: 'Captured, processed and rights-managed in-house by one operator, over a decade.',
          status: 'confirmed',
        },
        {
          label: 'Source',
          value: 'Own capture on a purpose-built 132-DSLR rig in a Netherlands studio',
          note: 'No scraping and no third-party aggregation: every model traces back to a known capture session.',
          status: 'confirmed',
        },
        { label: 'Consent', value: 'A signed model release for every subject, reconciled per model and kept in-house', status: 'confirmed' },
        {
          label: 'Track record',
          value: 'Licensed in 2026, non-exclusively, to a major creative-software research organisation for model training',
          status: 'confirmed',
        },
      ],
      delivery: [
        { label: 'Delivery', value: 'Secure bulk transfer (cloud or object storage), per model or full set' },
        { label: 'Documentation', value: 'Per-model metadata', note: 'Releases are not distributed; representative releases are shared for legal review only.' },
        { label: 'Evaluation set', value: 'For due diligence, on request' },
      ],
      license: [
        { label: 'Options', value: 'Full catalogue (4,342 models); curated subset; evaluation set; raw capture add-on; A-pose raw scan add-on' },
        { label: 'Terms', value: 'Per model, per subject or whole set. Exclusivity and scope agreed per engagement.' },
        { label: 'Signed by', value: 'Bethe Beheer B.V. and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'Closed set; no new capture.',
        'Finished models are static, un-rigged meshes with 2K textures; 8K comes with the raw bundle.',
        'A-pose scans are raw only.',
        '72.7% of models are tagged Caucasian.',
        'The releases do not name AI training explicitly.',
        'Faces and bodies of real people: the licensee’s legal review applies to every use, and separately to the minors subset.',
      ],
    },
  },
  {
    // The figures are the Azimov v1.0.0 release's; the card says the set
    // grows about 10 h a day.
    slug: 'first-person-facility-maintenance',
    title: 'First-Person Facility Maintenance',
    owner: 'vfrog',
    ownerLogo: { src: '/images/owners/vfrog.png', width: 100, height: 96 },
    modality: 'Video',
    subject: 'Egocentric',
    version: 'v0.3',
    updated: '2026-10-22',
    summary:
      'Head-mounted stereo video of maintenance workers on real shifts, with hand tracking, head pose, IMU and per-second action labels.',
    media: 'One shift from the wearer’s point of view',
    art: 'pov',
    stats: [
      { value: '506.9 h', label: 'recorded; 493.4 h labelled' },
      { value: '920', label: 'sessions, 887 fully processed' },
      { value: '10', label: 'wearers, written informed consent' },
    ],
    tags: ['Real capture', 'Egocentric video', 'Hand tracking', 'Action labels'],
    profile: {
      uses: 'Robot learning and action recognition',
      lede: 'Head-mounted stereo video of maintenance workers on real shifts, with hand tracking, head pose, IMU and per-second action labels.',
      headline: [
        { value: '506.9 h', label: 'recorded; 494.7 h processed, 493.4 h labelled' },
        { value: '920', label: 'sessions, 887 fully processed; median 25 min, longest 2 h 30 min' },
        { value: '10', label: 'wearers, all in Qatar; written informed consent' },
        { value: '5', label: 'EgoSense E6 headsets' },
        { value: '125', label: 'action labels in use, 38 curated; 3,822 raw object strings' },
        { value: '3.97 TB', label: 'about 10.5 GB per recorded hour' },
      ],
      headlineNote:
        '625+ hours as of October 21, 2026, adding about 10 hours a day. About 280 h were recorded in the 30 days to October 9, and 10,000 h are projected over the following 3 months.',
      keywords: ['Real capture', 'Egocentric video', 'Hand tracking', 'Head pose', 'IMU', 'Action labels', 'Written consent', 'Non-exclusive', 'Growing'],
      overview: {
        title: 'Real maintenance shifts, seen from the worker’s own eyes, with both hands tracked.',
        body: '506.9 hours recorded on 5 head-mounted stereo headsets by 10 wearers in Qatar, mostly night-shift facility maintenance in parking garages, plant rooms, corridors and restrooms. Each session carries synchronized stereo RGB video, grayscale tracking cameras, 6-DoF head pose, about 1 kHz IMU, 26-joint tracking for both hands and per-second action labels.',
      },
      glance: {
        columns: ['Stream', 'Rate', 'Format'],
        rows: [
          ['Stereo RGB video', '30 fps', 'HEVC, 2 × 2328 × 1748'],
          ['Stereo grayscale tracking', '~60 fps', 'HEVC, 2 × 640 × 480'],
          ['Stereo grayscale ctrl', '~60 fps', 'HEVC, 2 × 640 × 480'],
          ['Head pose (6-DoF)', '30 Hz', 'CSV, metres + quaternion'],
          ['Accelerometer and gyroscope', 'About 1 kHz', 'CSV, m/s² and rad/s'],
          ['Articulated hand tracking', 'Median 16.5 Hz across sessions', 'CSV, 26 joints × 2 hands'],
          ['2D and 3D hand keypoints', 'Per RGB frame', 'CSV, normalised px and mm'],
          ['Action labels', '1 Hz', 'CSV'],
          ['Calibration, sync, QC', 'n/a', 'JSON and CSV'],
        ],
      },
      intendedUses: [
        { title: 'Egocentric action recognition', detail: 'and temporal segmentation.' },
        { title: 'Hand pose estimation', detail: 'against stereo video.' },
        { title: 'Robot learning from demonstration', detail: 'on multi-step, tool-based work.' },
        { title: 'Visual-inertial odometry and sensor fusion', detail: 'with calibrated stereo and about 1 kHz IMU.' },
      ],
      specification: [
        {
          label: 'Hand tracking',
          value: 'Device-native articulated tracking at about 16 Hz',
          note: 'Position, orientation quaternion and radius per joint, in metres, in the head-pose world frame.',
        },
        { label: 'Hand 2D', value: '26 keypoints per hand in the left RGB eye (2328 × 1748), normalised to 0 to 1' },
        { label: 'Hand 3D', value: '26 keypoints per hand in the head frame, integer mm (+x right, +y up, −z forward)' },
        { label: 'Joint order', value: '26 joints in OpenXR order, the same in all three forms' },
        {
          label: 'Coverage',
          value: 'At least one hand in 98.5% of frames; right hand active in 77% of samples, left in 55%',
          note: 'Right-hand tracking drops while walking (63% of samples against 81% otherwise). The left hand is often out of view during overhead screwdriver work. Demo session figures.',
        },
        {
          label: 'Alignment',
          value: 'hand_2d and hand_3d are keyed to RGB frames and already account for a 4-frame tracking latency',
          note: 'hand_tracking runs on its own device clock; align it through sync_manifest.csv.',
        },
        {
          label: 'Timing',
          value: 'Raw tier: nothing is resampled onto a common clock; sync_manifest.csv is the master timeline',
          note: 'Address video frames by frame_index, not by seeking to pts_us: container timestamps drift by up to about 1.6 s mid-session.',
        },
        {
          label: 'Quality',
          value: 'No gaps in the inertial, pose and hand streams; at least 99.6% coverage for every stream',
          note: 'Measured on the 24-minute demo session from the owner’s quality report: 43,191 frames in sync, a hand detected in 98.5% of frames.',
        },
      ],
      metadata: {
        title: 'Top 10 labels by hours',
        columns: ['Label', 'Hours'],
        rows: [
          ['walk', '60.5 h'],
          ['idle', '44.0 h'],
          ['hold', '32.4 h'],
          ['adjust', '31.3 h'],
          ['inspect', '19.4 h'],
          ['drive_machine', '17.5 h'],
          ['carry', '15.2 h'],
          ['wipe_surface', '14.0 h'],
          ['twist_fasten', '11.7 h'],
          ['paint_coat', '11.6 h'],
        ],
        note: 'Full dataset, v1.0.0. Every second carries an action label, with the objects being handled. Labels are machine-generated by vision-language models (Gemini 3.7 Flash for 53% of labelled time, Qwen 3.8 Max for 44%, MiniMax M3 for 3%) and are not human-reviewed; their accuracy against human ground truth has not yet been measured.',
      },
      notes: [
        {
          id: 'environments',
          title: 'Environments',
          body: [
            'Parking garage 73.7 h (190 sessions), corridors, lobbies and lifts 73.1 h (124), plant rooms 71.4 h (127), restrooms 51.5 h (87), food and hospitality 31.2 h (49), offices 28.7 h (38), outdoor 28.0 h (56), ceiling plenum 26.1 h (62), retail 24.8 h (38), leisure and fitness 22.1 h (29), other 29.6 h (50), not categorised 46.6 h (70).',
            'Environments are model-assigned. Work types include MEP, plumbing, electrical, painting and HVAC.',
          ],
        },
        {
          id: 'demo',
          title: 'Demo session',
          body: [
            'One participant replacing a ceiling light fixture indoors, September 2026: fetching and placing a ladder, putting on gloves, removing the cover and fixture with a screwdriver, swapping the bulb, reassembling and cleaning up.',
            '24 minutes and 1,440 labelled seconds across 29 action classes, recorded continuously and split into spans of about 2 minutes.',
          ],
        },
        { id: 'more', title: 'More on request', body: ['vfrog is launching a logistics collection at 50 hours a day and takes custom orders.'] },
      ],
      provenance: [
        { label: 'Owner', value: 'vfrog', status: 'confirmed' },
        { label: 'Who', value: '10 wearers, all based in Qatar, mostly night-shift work', status: 'confirmed' },
        { label: 'Hardware', value: '5 EgoSense E6 headsets', status: 'confirmed' },
        {
          label: 'When',
          value: 'Uploaded August 17 to October 9, 2026',
          note: 'Headset clocks drifted, so session folder names are not recording dates.',
          status: 'confirmed',
        },
        {
          label: 'Consent',
          value: 'Written informed consent from all 10 wearers, covering recording, commercial licensing, and AI and robotics training and evaluation',
          note: 'Consent chain: operator, location manager, employer (owner).',
          status: 'confirmed',
        },
        {
          label: 'Anonymisation',
          value: 'Faces and phones blurred, legible text targeted',
          note: 'Detection on keyframes at 2 Hz, each box held ±15 frames and enlarged 25%. Automated, so misses are possible.',
          status: 'confirmed',
        },
        { label: 'Audio and location', value: 'Audio deleted before upload; no GPS or other location data', status: 'confirmed' },
      ],
      delivery: [
        { label: 'Formats', value: 'Raw (MP4 + JSON + CSV), LeRobot v3.0, MCAP' },
        {
          label: 'Tiers',
          value: 'Raw; Annotated; curated subsets and clips',
          note: 'Annotated is the raw tier plus per-second labels, hand keypoints, motion signals and spans.',
        },
        { label: 'Delivery', value: 'From cloud storage' },
        {
          label: 'Demo session',
          value: 'One full demo session, about 24 minutes, through gated access on vfrog’s dataset page',
          note: 'huggingface.co/datasets/vfrogAI/azimov. Reviewed by vfrog, usually within 1 to 2 business days.',
        },
      ],
      license: [
        { label: 'Terms', value: 'Non-exclusive by default. Exclusive subsets available.' },
        { label: 'Scope', value: 'Worldwide commercial license, including AI training and robotics' },
        { label: 'License', value: 'vfrog’s data license, version 1.0' },
        {
          label: 'Not allowed',
          value: 'Identifying, contacting, profiling, tracking or re-identifying people; facial recognition or building facial-image databases; biometric categorisation; emotion inference in the workplace; social scoring; worker surveillance or performance monitoring; weapons development',
        },
        { label: 'Signed by', value: 'vfrog and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'One region (Qatar) and five headsets. Domestic, kitchen, factory-assembly and outdoor tasks are rare or absent.',
        'Much of the footage is dim night-shift work; dark-related labels account for about 11 hours.',
        'The task mix is dominated by walking and general hand use. Check the label statistics before choosing a subset.',
        'Labels are unreviewed model output at 1-second granularity, with near-duplicate labels and no confidence on 60% of label runs.',
        'Hand tracking is an on-device estimate (median 16.5 Hz, as low as about 6 Hz in some sessions), not motion-capture ground truth.',
        'Factory RGB extrinsics are not accurate enough for stereo matching; use rgb_stereo_calibration.json instead.',
        'Not included: audio (deleted before upload), depth maps, body pose.',
      ],
    },
  },
  {
    slug: 'tonalityprint-voice-dataset',
    title: 'TonalityPrint Voice Dataset v1.0',
    owner: 'Ronda Polhill, TonalityPrint',
    modality: 'Speech',
    subject: 'Expressive voice',
    version: 'v0.1',
    updated: '2026-10-26',
    summary:
      'One speaker, 18 sentences, each recorded in 8 prosodic states and annotated for the intent the voice carries, not only its emotion.',
    media: 'One sentence spoken eight ways',
    art: 'voice',
    stats: [
      { value: '144', label: 'recordings, 3 to 6 seconds each' },
      { value: '18', label: 'sentences, each in 8 prosodic states' },
      { value: '48 kHz', label: 'mono WAV, 16-bit PCM' },
    ],
    tags: ['Real capture', 'American English', 'One speaker', 'Expert annotation'],
    profile: {
      uses: 'Prosody and voice AI',
      lede: 'One speaker, 18 sentences, each recorded in 8 prosodic states and annotated for the intent the voice carries, not only its emotion.',
      headline: [
        { value: '144', label: 'recordings, 3 to 6 seconds each' },
        { value: '18', label: 'sentences, each in 8 prosodic states' },
        { value: '5', label: 'functional tonal intents, plus ambivalence' },
        { value: '48 kHz', label: 'mono WAV, 16-bit PCM' },
      ],
      keywords: ['Real capture', 'Audio', 'American English', 'One speaker', 'Expert annotation', 'Parallel prosody', 'Custom recording to order'],
      overview: {
        title: 'The same words, spoken eight ways, each labelled for what the voice is doing.',
        body: 'Ronda Polhill recorded every utterance herself, with no other voices and no AI. Each of 18 sentences is spoken in a neutral baseline, in each of five functional tonal intents, and in modified and ambivalent variants, so the words stay fixed while the prosody changes. Every recording is annotated by an expert practitioner, with a codebook and methodology documented in the public release.',
      },
      glance: {
        columns: ['Component', 'Size or rate', 'Format'],
        rows: [
          ['Audio', '144 files, about 11 min 5 s', 'WAV, 48 kHz, 16-bit PCM, mono'],
          ['Annotations', '144 JSON and 145 CSV files', '23 CSV columns, described in the codebook'],
          ['Design', '18 sentences × 8 states', 'Fixed words, changing prosody'],
          ['Documentation', '13 files', 'README, codebook, methodology, citation'],
        ],
      },
      intendedUses: [
        { title: 'Style-conditioned speech synthesis', detail: 'with control over prosody and intent.' },
        { title: 'Prosodic alignment for voice models,', detail: 'matching what a model says to how it sounds.' },
        { title: 'Ambivalence-aware systems', detail: 'that detect mixed vocal signals.' },
        { title: 'Contrastive learning with fixed words,', detail: 'separating prosody from meaning.' },
      ],
      specification: [
        { label: 'Speaker', value: 'Ronda Polhill, the only voice' },
        { label: 'Language', value: 'American English' },
        { label: 'Recordings', value: '144 WAV, 3 to 6 seconds each', note: 'About 11 minutes 5 seconds in total' },
        { label: 'Recording', value: 'Captured at 48 kHz, 32-bit float', note: 'Delivered as 16-bit PCM WAV, mono' },
        { label: 'Annotation', value: 'Expert practitioner, perceptual assessment', note: 'Stated as 100% complete' },
        { label: 'Quality control', value: 'About 18% re-recorded after an audit', note: 'As described in the public release' },
        { label: 'Version', value: 'v1.0.0, released January 24, 2026' },
      ],
      metadata: {
        title: 'Tonal intents',
        columns: ['Intent', 'What it does'],
        rows: [
          ['Trust', 'Establishes credibility, reliability'],
          ['Attention', 'Directs focus, maintains engagement'],
          ['Reciprocity', 'Invites response, balances exchange'],
          ['Empathy resonance', 'Attunes to listener state'],
          ['Cognitive energy', 'Signals mental activation'],
          ['Ambivalence', 'Competing tonal cues at once'],
        ],
        note: 'Definitions from the owner’s published codebook.',
      },
      provenance: [
        { label: 'Speaker', value: 'Recorded by Ronda Polhill alone. No other voices and no AI.', status: 'confirmed' },
        { label: 'Ownership', value: 'The owner keeps the IP and every decision on access and licensing', status: 'confirmed' },
        {
          label: 'Public release',
          value: 'Documentation public on Hugging Face; audio restricted on Zenodo',
          note: 'Access to v1.0 is vetted by the owner',
          status: 'confirmed',
        },
        { label: 'Voice', value: 'A real person’s voice', note: 'Voice cloning and deepfakes are not allowed under any license', status: 'confirmed' },
      ],
      delivery: [
        { label: 'Evaluation', value: 'A small selection the owner chooses, under terms she approves' },
        { label: 'Public docs', value: 'huggingface.co/datasets/tonalityprint/tonalityprint-v1' },
        { label: 'DOI', value: '10.5281/zenodo.17913895' },
      ],
      license: [
        { label: 'Terms', value: 'Agreed directly with the owner, license by license' },
        { label: 'Custom', value: 'Commissioned custom voice datasets, quoted separately' },
        { label: 'Not allowed', value: 'Cloning the speaker’s voice; deepfakes or any deceptive use' },
        { label: 'Signed by', value: 'Ronda Polhill and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: ['A small set: about eleven minutes of audio.', 'One speaker and one accent.', 'A v2.0 may follow in 2027, not confirmed.'],
    },
  },
  {
    slug: 'wrongtools-torus-gongs',
    title: 'TORUS: Feng Gongs and Giant Cymbals',
    owner: 'Wrongtools',
    modality: 'Audio',
    subject: 'Percussion samples',
    version: 'v0.1',
    updated: '2026-10-26',
    summary:
      '1,287 edited samples of Feng gongs and giant cymbals, recorded in a dry room, a concert hall and with contact microphones.',
    media: 'One gong, recorded three ways',
    art: 'gong',
    stats: [
      { value: '1,287', label: 'samples' },
      { value: '2.39 GB', label: 'of WAV files' },
      { value: '3', label: 'recording settings' },
    ],
    tags: ['Real capture', 'Percussion', 'Multi-mic', 'Edited and cleaned'],
    profile: {
      uses: 'Music and sound AI',
      lede: '1,287 edited samples of Feng gongs and giant cymbals, recorded in a dry room, a concert hall and with contact microphones.',
      headline: [
        { value: '1,287', label: 'samples' },
        { value: '2.39 GB', label: 'of WAV files' },
        { value: '48 kHz', label: '24-bit WAV' },
        { value: '3', label: 'recording settings' },
      ],
      keywords: ['Real capture', 'Audio', 'Percussion', 'Multi-mic', 'Edited and cleaned', 'One studio', 'Part of a 46-library catalogue'],
      overview: {
        title: 'Gongs that sustain for up to a minute, captured three different ways.',
        body: 'Wrongtools recorded Feng gongs and giant cymbals in three settings: a dry room with three stereo microphone pairs, a concert hall, and cinematic experiments with contact microphones and a subwoofer mounted directly on large gongs. Every sample was then denoised, cleaned, trimmed, edited and often run through high-end analog hardware.',
      },
      glance: {
        columns: ['Component', 'Size or rate', 'Format'],
        rows: [
          ['Samples', '1,287', 'WAV, 48 kHz, 24-bit'],
          ['Total size', '2.39 GB', 'WAV files'],
          ['Settings', '3', 'Dry room, concert hall, contact mics and subwoofer'],
          ['Longest sustain', 'Up to about 1 minute', 'Long, complex metallic decays'],
        ],
      },
      intendedUses: [
        { title: 'Sound and music generation', detail: 'with long, complex metallic tones.' },
        { title: 'Audio effects and timbre modelling', detail: 'from the same instruments recorded several ways.' },
        { title: 'Evaluation sets', detail: 'for how models handle long decays and dense harmonics.' },
      ],
      specification: [
        { label: 'Instruments', value: 'Feng gongs and giant cymbals' },
        { label: 'Dry room', value: 'Three stereo pairs', note: 'Sennheiser MKH800 Twin, Neumann KM184, Coles 4038' },
        { label: 'Hall', value: 'Concert hall session' },
        { label: 'Cinematic', value: 'Contact microphones and a subwoofer mounted on the gongs' },
        { label: 'Format', value: 'WAV, 48 kHz, 24-bit' },
        { label: 'Organisation', value: 'Varies by library; some sorting may be needed before delivery' },
      ],
      notes: [
        {
          id: 'method',
          title: 'Method',
          body: [
            'Record → Edit → Process',
            'Each library takes about a week to record, then goes into post-production: denoising, cleaning, trimming, editing, mixing down microphone positions and analog processing.',
          ],
        },
        {
          id: 'more',
          title: 'More on request',
          body: ['TORUS is one library in a catalogue of 46 released libraries, about 113,580 edited WAV samples in all, with more on the way.'],
        },
      ],
      provenance: [
        { label: 'Recorded by', value: 'Wrongtools, in its own sessions', status: 'confirmed' },
        {
          label: 'Rights',
          value: 'Musicians join sessions; Wrongtools controls the rights to the recordings',
          note: 'As stated by the owner',
          status: 'confirmed',
        },
        { label: 'Source', value: 'Own recordings. Not scraped, not synthetic.', status: 'confirmed' },
        { label: 'Raw sessions', value: 'Not offered; licensed as edited, categorised WAV files', status: 'confirmed' },
      ],
      delivery: [
        { label: 'Delivery', value: 'Edited WAV files, by library' },
        { label: 'Preparation', value: 'Sorting and naming scoped to the agreement' },
      ],
      license: [
        { label: 'Terms', value: 'Agreed directly with Wrongtools' },
        { label: 'Not allowed', value: 'Redistributing the samples as a sample library' },
        { label: 'Signed by', value: 'Wrongtools and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: ['One library; other libraries are profiled separately.', 'Raw session recordings are not included.'],
    },
  },
  {
    slug: 'geoff-bremner-multimodal-music',
    title: 'Geoff Bremner Multimodal Music Corpus',
    owner: 'Geoff Bremner, GB Audio',
    modality: 'Music',
    subject: 'Original compositions',
    version: 'v0.1',
    updated: '2026-10-26',
    summary: 'Original music by one creator, delivered track by track as master, stems, MIDI, Guitar Pro and PDF notation.',
    media: 'One track beside its stems and notation',
    art: 'music',
    stats: [
      { value: '~2 h', label: 'original progressive rock' },
      { value: '~20 min', label: 'original meditation music' },
      { value: '6', label: 'aligned parts per track' },
    ],
    tags: ['Original music', 'Stems', 'MIDI', 'Notation'],
    profile: {
      uses: 'Music generation and transcription',
      lede: 'Original music by one creator, delivered track by track as master, stems, MIDI, Guitar Pro and PDF notation.',
      headline: [
        { value: '~2 h', label: 'original progressive rock' },
        { value: '~20 min', label: 'original meditation music' },
        { value: '6', label: 'aligned parts per track' },
        { value: '1', label: 'writer, performer and rights holder' },
      ],
      keywords: ['Original music', 'Audio', 'Stems', 'MIDI', 'Notation', 'One creator', 'Aligned per track'],
      overview: {
        title: 'Every track comes with the parts behind it, all lined up.',
        body: 'Geoff Bremner wrote, performed, recorded, edited and produced every track. Each one is delivered as a master with its stems, MIDI, a Guitar Pro file, PDF notation and metadata for tempo, key, time signature, genre and instrumentation, so audio, symbols and score line up for the same piece.',
      },
      glance: {
        columns: ['Component', 'Per track', 'Format'],
        rows: [
          ['Master', '1', 'Audio'],
          ['Stems', 'Per instrument', 'Audio'],
          ['MIDI', '1', 'MIDI file'],
          ['Guitar Pro', '1', 'Guitar Pro file'],
          ['Notation', '1', 'PDF'],
          ['Metadata', '1', 'Tempo, key, time signature, genre, instrumentation'],
        ],
      },
      intendedUses: [
        { title: 'Music generation', detail: 'from aligned audio, stems and symbolic parts.' },
        { title: 'Transcription and source separation', detail: 'with ground truth for every instrument.' },
        { title: 'Score and tablature modelling', detail: 'from Guitar Pro and notation.' },
      ],
      specification: [
        { label: 'Genres', value: 'Progressive rock and meditation' },
        { label: 'Volume', value: 'About 2 hours of rock and 20 minutes of meditation', note: 'Track count to be confirmed' },
        { label: 'Parts', value: 'Master, stems, MIDI, Guitar Pro, PDF, metadata' },
        { label: 'Public sample', value: 'One track on Hugging Face, CC BY-NC 4.0', note: '342 MB' },
      ],
      provenance: [
        { label: 'Creator', value: 'Geoff Bremner wrote, performed, edited and produced every track', status: 'confirmed' },
        { label: 'Ownership', value: 'Single creator and single rights holder', status: 'confirmed' },
        { label: 'Covers', value: 'Not included', status: 'confirmed' },
      ],
      delivery: [
        { label: 'Delivery', value: 'Per track, all parts together' },
        { label: 'Public sample', value: 'huggingface.co/datasets/geoffbremneraudio' },
      ],
      license: [
        { label: 'Terms', value: 'Agreed directly with Geoff Bremner' },
        { label: 'Not allowed', value: 'Redistributing the tracks or stems' },
        { label: 'Signed by', value: 'Geoff Bremner and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'A small, single-artist corpus.',
        'Assembling the full set takes the owner some time.',
        'Drum sample license to be confirmed before any AI-training license.',
      ],
    },
  },
  {
    slug: 'hindi-english-books-catalogue',
    title: 'Contemporary Hindi and English Books',
    owner: 'Prakhar Goonj Publications, Delhi',
    ownerLogo: { src: '/images/owners/prakhar-goonj-publications.png', width: 334, height: 64 },
    modality: 'Text',
    subject: 'Books in Hindi and English',
    version: 'v0.3',
    updated: '2026-10-28',
    summary: 'A publisher’s catalogue of 756 recent titles, mostly Hindi and English, about 60 million words of human-written text.',
    media: 'Titles from the publisher’s catalogue',
    art: 'books',
    stats: [
      { value: '756', label: 'titles' },
      { value: '~60M', label: 'words' },
      { value: '483 / 262', label: 'titles in Hindi / English' },
    ],
    tags: ['Human-written', 'Hindi', 'English', 'Non-exclusive'],
    profile: {
      uses: 'Language models',
      lede: 'A publisher’s catalogue of 756 recent titles, mostly Hindi and English, about 60 million words of human-written text.',
      headline: [
        { value: '756', label: 'titles' },
        { value: '~121,000', label: 'pages' },
        { value: '~60M', label: 'words' },
        { value: '483 / 262', label: 'titles in Hindi / English' },
      ],
      headlineNote: 'Counts from the publisher’s catalogue, October 2026. New titles are added every day.',
      keywords: ['Human-written', 'Text', 'Hindi', 'English', 'Published with ISBNs', '2019 to 2026', 'Non-exclusive', 'No raw files shared', 'Growing daily'],
      overview: {
        title: 'Recent, human-written books in Hindi and English, from one publisher.',
        body: 'Prakhar Goonj Publications is a well-established Indian publishing house, publishing across fiction, non-fiction, academic, children’s, self-help, business, spirituality, coffee table, astrology, legal and medical books, with distribution worldwide and to government organisations. The catalogue is fully digitised and grows every day. Alongside it the publisher runs a monthly literary magazine, launched in 2018 and registered with the Registrar of Newspapers for India, and has new human translations in progress.',
      },
      glance: {
        columns: ['Component', 'Size', 'Detail'],
        rows: [
          ['Titles', '756', '483 Hindi, 262 English, a few in other Indian languages; growing daily'],
          ['Pages', 'About 121,000', 'Fully digitised'],
          ['Words', 'About 60 million', 'Human-written'],
          ['Years', '2019 to 2026', 'Mostly the last three years'],
        ],
      },
      intendedUses: [
        { title: 'Hindi language models', detail: 'trained on recent, edited literary and non-fiction text.' },
        { title: 'Hindi and English evaluation sets', detail: 'across poetry, fiction and non-fiction.' },
        { title: 'Translation', detail: 'from human translations as they are completed.' },
      ],
      specification: [
        { label: 'Languages', value: 'Hindi and English, plus a few other Indian languages' },
        { label: 'Volume', value: '756 titles, about 121,000 pages, about 60 million words' },
        { label: 'Years', value: '2019 to 2026' },
        { label: 'State', value: 'Fully digitised; new titles added every day' },
      ],
      metadata: {
        title: 'Largest groups',
        columns: ['Group', 'Titles'],
        rows: [
          ['Hindi poetry', '221'],
          ['Hindi fiction', '123'],
          ['History, Hindi and English', '48'],
          ['Religion and astrology', '47'],
          ['English fiction', '46'],
          ['Self-help', '34'],
          ['Medical and nursing', '29'],
          ['Law', '17'],
        ],
        note: 'Title counts from the publisher’s catalogue.',
      },
      notes: [
        {
          id: 'more',
          title: 'More on request',
          body: [
            'A monthly literary magazine, launched in 2018 and registered with the Registrar of Newspapers for India (RNI No. DELHIN/2020/79598), and human translation work in progress can be added as they become available.',
          ],
        },
      ],
      provenance: [
        {
          label: 'Owner',
          value: 'Prakhar Goonj Publications, Rohini, Delhi',
          note: 'Founder and Chief Editor: Neelu Sinha',
          status: 'confirmed',
        },
        {
          label: 'Memberships',
          value: 'Federation of Indian Publishers (affiliated member, 2026 to 2027); Delhi State Booksellers’ and Publishers’ Association (member, valid to March 2027)',
          note: 'Verified by Aseryx against membership certificates, October 2026',
          status: 'confirmed',
        },
        {
          label: 'Registrations',
          value: 'Importer-Exporter Code from the Directorate General of Foreign Trade; publisher registration with India’s national ISBN agency; GST and Udyam (MSME) registration',
          note: 'Verified by Aseryx against registration documents, October 2026',
          status: 'confirmed',
        },
        {
          label: 'Recognition',
          value: 'Registered book supplier to the Delhi University Library System (to March 2027) and NHPC Limited',
          note: 'Verified by Aseryx against vendor registration certificates, October 2026',
          status: 'confirmed',
        },
        {
          label: 'Government supply',
          value: 'Purchase orders from more than ten government bodies, 2021 to 2026, including libraries, institutes and public broadcasters; several cite the Ministry of Home Affairs’ official-language book list',
          note: 'Verified by Aseryx against purchase orders, October 2026',
          status: 'confirmed',
        },
        {
          label: 'Identifiers',
          value: 'Every published book has a unique ISBN; select titles are also assigned a DOI through Crossref',
          status: 'confirmed',
        },
        {
          label: 'Security',
          value: 'Raw files are never handed over; teams see the profile and approved sample pages first',
          status: 'confirmed',
        },
      ],
      delivery: [
        { label: 'Evaluation', value: 'Sample pages approved by the publisher, under confidentiality' },
        { label: 'Delivery', value: 'Agreed per license' },
      ],
      license: [
        { label: 'Terms', value: 'Non-exclusive. No sub-licensing. Copyright stays with the publisher.' },
        { label: 'Not allowed', value: 'Sub-licensing or redistributing the text' },
        { label: 'Signed by', value: 'Prakhar Goonj Publications and your team, directly' },
        { label: 'Price', value: 'On request; the publisher invites proposals' },
      ],
      limits: ['Recent catalogue: few titles before 2019.', 'Hindi poetry is the largest single group.'],
    },
  },
  {
    slug: 'european-architecture-and-heritage-photos',
    title: 'European Architecture and Heritage Photos',
    owner: 'Costantino Anikin',
    modality: 'Image',
    subject: 'Architecture and objects',
    version: 'v0.3',
    updated: '2026-10-22',
    summary: 'Photographs of doors, windows, facades, churches and more, shot by one photographer and richly captioned.',
    media: 'Doors, windows and facades from one themed set',
    art: 'facades',
    stats: [
      { value: '~1,000', label: 'photos' },
      { value: '22', label: 'themed sets of about 50 photos' },
      { value: '40+', label: 'keywords per photo' },
    ],
    tags: ['Real capture', 'Captioned', 'One author', 'Non-exclusive'],
    profile: {
      uses: 'Image generation and recognition',
      lede: 'Photographs of doors, windows, facades, churches and more, shot by one photographer and richly captioned.',
      headline: [
        { value: '~1,000', label: 'photos' },
        { value: '22', label: 'themed sets of about 50 photos' },
        { value: '40+', label: 'keywords per photo' },
        { value: '13 to 15', label: 'metadata fields per photo' },
      ],
      keywords: ['Real capture', 'Images', 'Architecture', 'Captioned', 'Keyworded', 'One author', 'No people', 'Non-exclusive'],
      overview: {
        title: 'Carefully captioned photography of European buildings and details.',
        body: 'Costantino Anikin shot every image and wrote the metadata: a title, description, category, style, era, location and more than forty keywords for each photo. Sets are themed, from Italian doors and old windows to temples, coastlines, flowers and classic cars. There are no people in the photos.',
      },
      glance: {
        columns: ['Component', 'Size or rate', 'Format'],
        rows: [
          ['Images', '~1,000', 'JPEG, about 2K to 4K wide'],
          ['Metadata', 'Per photo', 'CSV, 13 to 15 fields: title, description, keywords, category, style, era, location'],
          ['Locations', '', 'Mostly Italy, Greece and wider Europe'],
        ],
      },
      intendedUses: [{ title: 'Image generation with rich captions.' }, { title: 'Architecture and object recognition.' }],
      specification: [
        { label: 'Format', value: 'JPEG, about 2K to 4K wide' },
        { label: 'Sets', value: '22 themed sets of about 50 photos' },
        { label: 'Metadata', value: 'CSV with 13 to 15 fields per photo', note: 'Title, description, keywords, category, style, era, location' },
        { label: 'Locations', value: 'Mostly Italy, Greece and wider Europe' },
        { label: 'People', value: 'None in the photos' },
      ],
      metadata: {
        title: 'Themes',
        columns: ['Theme', 'What it covers'],
        rows: [
          ['Doors', 'Italian and European doorways'],
          ['Windows', 'Old windows and facades'],
          ['Sacred', 'Temples and churches'],
          ['Nature', 'Flowers, sea and coast'],
          ['Objects', 'Engineering parts, classic cars'],
        ],
      },
      provenance: [
        { label: 'Author', value: 'Costantino Anikin took every photo and wrote every caption', status: 'confirmed' },
        { label: 'Ownership', value: 'Own work, as stated by the owner', status: 'confirmed' },
        {
          label: 'Stock agreements',
          value: 'Non-exclusive, confirmed by the owner',
          note: 'Some images are also sold through stock agencies.',
          status: 'confirmed',
        },
        { label: 'People', value: 'None. There are no people in the photos, confirmed by the owner.', status: 'confirmed' },
      ],
      delivery: [{ label: 'Format', value: 'JPEG plus one CSV of metadata' }],
      license: [
        { label: 'Terms', value: 'Non-exclusive commercial license' },
        { label: 'Allowed', value: 'AI training, research, commercial products. What you build stays yours.' },
        { label: 'Not allowed', value: 'Redistributing or reselling the photos, under any license' },
        { label: 'Signed by', value: 'Costantino Anikin and your team, directly' },
        { label: 'Price', value: 'On request' },
      ],
      limits: [
        'A small set: about a thousand photos.',
        'Exclusive licenses are not offered while images sit with stock agencies.',
        'Themes are uneven in size.',
      ],
    },
  },
];

// The four cards Home and For AI companies show, one each of video, text,
// images and 3D. They lead the catalogue too; the rest keep the cards' order.
const FEATURED_SLUGS = [
  'synchronized-multi-angle-driving-footage',
  'ohada-business-law',
  'european-architecture-and-heritage-photos',
  'studio-3d-models-and-materials',
];
const rank = (dataset) => {
  const i = FEATURED_SLUGS.indexOf(dataset.slug);
  return i === -1 ? FEATURED_SLUGS.length : i;
};
const DATASETS = [...ENTRIES].sort((a, b) => rank(a) - rank(b));

export const FEATURED = DATASETS.slice(0, FEATURED_SLUGS.length);

export const findDataset = (slug) => DATASETS.find((d) => d.slug === slug);

/** The profile For AI companies opens to show each part of a profile: the first one's. */
export const SAMPLE_PROFILE = DATASETS.find((d) => d.profile);

export const MODALITIES = [...new Set(DATASETS.map((d) => d.modality))];

export default DATASETS;
