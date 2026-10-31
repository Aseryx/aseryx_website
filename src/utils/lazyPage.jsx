import { lazy } from 'react';

/**
 * A page that loads as its own chunk, so a visitor downloads only the page
 * they open. preload() fetches it ahead of time, and once it has loaded the
 * page renders directly instead of suspending. The prerender loads every page
 * before rendering and the browser loads the current one before hydrating, so
 * both render the same tree; a page opened later suspends only until its
 * chunk arrives. A failed load can be retried.
 */
export default function lazyPage(load) {
  let Page = null;
  let pending = null;
  const preload = () => {
    pending ??= load()
      .then((module) => {
        Page = module.default;
        return module;
      })
      .catch((error) => {
        pending = null;
        throw error;
      });
    return pending;
  };
  const Lazy = lazy(preload);
  const LazyPage = (props) => (Page ? <Page {...props} /> : <Lazy {...props} />);
  LazyPage.preload = preload;
  return LazyPage;
}
