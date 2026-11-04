/** Absolute http(s) links leave the site, so they open in a new tab. */
export const isExternal = (href) => /^https?:\/\//.test(href);

export const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' };
