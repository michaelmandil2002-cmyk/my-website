import { ThemeProvider } from 'styled-components';

import { MainLayout } from '@/components/layout';
import { Features, Hero } from '@/sections';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainLayout>
        <Hero />
        <Features />
      </MainLayout>
    </ThemeProvider>
  );
}
