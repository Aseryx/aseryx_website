/**
 * One page's structured data, for search engines and AI answer engines. It
 * renders in the body, so the prerendered HTML carries it; `<` is escaped so
 * the JSON can never close its own script tag.
 */
const JsonLd = ({ data }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
);

export default JsonLd;
