import { useEffect, useState } from 'react';

export type Route =
  | { readonly page: 'home'; readonly anchor: string }
  | { readonly page: 'project'; readonly slug: string };

const PROJECT_PREFIX = '#/work/';

export const projectHref = (slug: string) => `${PROJECT_PREFIX}${slug}`;

function parse(hash: string): Route {
  if (hash.startsWith(PROJECT_PREFIX)) {
    return { page: 'project', slug: decodeURIComponent(hash.slice(PROJECT_PREFIX.length)) };
  }
  return { page: 'home', anchor: hash.slice(1) };
}

/**
 * Hash-based routing: works on GitHub Pages with no server rewrites.
 * `#/work/<slug>` opens a project; any other hash is an anchor on the home page.
 */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
    };
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  return route;
}
