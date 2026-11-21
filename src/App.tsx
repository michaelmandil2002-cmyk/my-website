import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { MainLayout } from '@/components/layout';
import { SITE } from '@/constants/site';
import { useHashRoute } from '@/hooks/useHashRoute';
import { ProjectPage } from '@/pages/ProjectPage/ProjectPage';
import { Career, Contact, Hero, SuperPlay, Work } from '@/sections';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

export function App() {
  const route = useHashRoute();

  useEffect(() => {
    if (route.page === 'project') {
      // A new page starts at the top immediately, not with a smooth scroll through the old one.
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    document.title = `${SITE.name} — ${SITE.role}`;
    // Coming back from a project page: jump to the requested section once it has rendered.
    if (route.anchor) document.getElementById(route.anchor)?.scrollIntoView();
  }, [route]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainLayout>
        {route.page === 'project' ? (
          <ProjectPage key={route.slug} slug={route.slug} />
        ) : (
          <>
            <Hero />
            <SuperPlay />
            <Work />
            <Career />
            <Contact />
          </>
        )}
      </MainLayout>
    </ThemeProvider>
  );
}
