/**
 * Marketing product-demo data mirrored from
 * aseryx_demo@demo/screenshot-ready-seed seed + quick Discovery Scan output.
 */

export const DEMO_USER = {
  initials: 'JP',
  name: 'James',
  organization: 'Denver University',
};

/** Mirrors aseryx_demo NAV_ITEMS (provider defaults: Data open, Catalog/Tools closed). */
export const DEMO_NAV = {
  top: [{ id: 'overview', label: 'Overview' }],
  data: [
    { id: 'workspace', label: 'Workspace' },
    { id: 'appraisal', label: 'Appraisal' },
    { id: 'vault', label: 'Vault' },
  ],
  catalog: [
    { id: 'exchange', label: 'Exchange' },
    { id: 'access', label: 'Access' },
    { id: 'queries', label: 'Queries' },
  ],
  tools: [
    { id: 'connectors', label: 'Connectors' },
    { id: 'runtime', label: 'Runtime' },
    { id: 'api-keys', label: 'API Keys' },
  ],
};

/** seedExternalConnections: Credit Risk Warehouse (primary). */
export const WORKSPACE_CONNECTION = {
  name: 'Credit Risk Warehouse',
  hostLabel: 'credit-risk.us-east-1.rds.amazonaws.com:5432',
};

/**
 * Quick-scan Suggested slices from scanDatabaseForSlices('quick') on HELIX_SCHEMA
 * (tradelines / transactions / consumers). Strength from demoSliceComposite;
 * sizes from demoSliceExportEstimate.
 */
export const WORKSPACE_SLICES = [
  {
    id: 'scan-tradelines-consumers',
    title: 'Tradelines with linked consumer risk',
    fileSize: '77.8 MB',
    variables: 14,
    score: 68,
  },
  {
    id: 'scan-consumers-path',
    title: 'Transactions path',
    fileSize: '72.2 MB',
    variables: 13,
    score: 68,
  },
  {
    id: 'scan-consumers-only',
    title: 'Consumers only',
    fileSize: '33.3 MB',
    variables: 6,
    score: 46,
  },
];

/** seedDatasets + formatFileSize + appraisal score map from seedAppraisalProofs. */
export const VAULT_DATASETS = [
  {
    id: 312,
    name: 'consumer_credit_attributes',
    type: 'JSON',
    source: 'upload',
    size: '100.0 MB',
    quality: 47,
  },
  {
    id: 315,
    name: 'default_risk_underwriting',
    type: 'CSV',
    source: 'upload',
    size: '50.0 MB',
    quality: 52,
  },
  {
    id: 318,
    name: 'tradelines_with_consumer_context',
    type: 'POSTGRES',
    source: 'connected',
    size: '50.0 MB',
    quality: 33,
  },
];

/**
 * seedAppraisalProofs (ids 184–186). Titles via getCertificateTitle(circuit_name).
 * Refs via formatAppraisalRef. Bars are live L2 fields from the seed.
 */
export const APPRAISAL_CERTIFICATES = [
  {
    id: 185,
    title: 'Default Risk Underwriting',
    ref: 'APR-2026-0185',
    sourceLabel: 'File upload',
    updatedLabel: 'Aug 11, 2026',
    score: 52,
    bars: [
      { label: 'Composite (pre-confidence)', value: 58 },
      { label: 'Schema Richness', value: 28 },
      { label: 'Statistical Efficiency', value: 81 },
      { label: 'Distinctive Information', value: 45 },
      { label: 'Distribution Balance', value: 70 },
      { label: 'Size Confidence', value: 78 },
    ],
    gates: [
      {
        label: 'Completeness',
        description: 'Null rates within threshold on mapped fields.',
        pass: true,
      },
      {
        label: 'Accuracy',
        description: 'Outlier rate on numeric fields within gate.',
        pass: true,
      },
      {
        label: 'Uniqueness',
        description: 'Duplicate row rate under 5%.',
        pass: true,
      },
      {
        label: 'Credibility',
        description: 'Concentration / last-digit / round probes.',
        pass: true,
      },
    ],
  },
  {
    id: 184,
    title: 'Consumer Credit Attributes',
    ref: 'APR-2026-0184',
    sourceLabel: 'File upload',
    updatedLabel: 'Aug 11, 2026',
    score: 47,
    bars: [
      { label: 'Composite (pre-confidence)', value: 56 },
      { label: 'Schema Richness', value: 23 },
      { label: 'Statistical Efficiency', value: 88 },
      { label: 'Distinctive Information', value: 38 },
      { label: 'Distribution Balance', value: 75 },
      { label: 'Size Confidence', value: 85 },
    ],
    gates: [
      {
        label: 'Completeness',
        description: 'Null rates within threshold on mapped fields.',
        pass: true,
      },
      {
        label: 'Accuracy',
        description: 'Outlier rate on numeric fields within gate.',
        pass: true,
      },
      {
        label: 'Uniqueness',
        description: 'Duplicate row rate under 5%.',
        pass: true,
      },
      {
        label: 'Credibility',
        description: 'Concentration / last-digit / round probes.',
        pass: true,
      },
    ],
  },
  {
    id: 186,
    title: 'Tradelines With Consumer Context',
    ref: 'APR-2026-0186',
    sourceLabel: 'Connected DB',
    updatedLabel: 'Aug 10, 2026',
    score: 33,
    bars: [
      { label: 'Composite (pre-confidence)', value: 48 },
      { label: 'Schema Richness', value: 16 },
      { label: 'Statistical Efficiency', value: 77 },
      { label: 'Distinctive Information', value: 89 },
      { label: 'Distribution Balance', value: 10 },
      { label: 'Size Confidence', value: 70 },
    ],
    gates: [
      {
        label: 'Completeness',
        description: 'Null rates within threshold on mapped fields.',
        pass: true,
      },
      {
        label: 'Accuracy',
        description: 'Outlier rate on numeric fields within gate.',
        pass: true,
      },
      {
        label: 'Uniqueness',
        description: 'Duplicate row rate under 5%.',
        pass: true,
      },
      {
        label: 'Credibility',
        description: 'Concentration / last-digit / round probes.',
        pass: true,
      },
    ],
  },
];
