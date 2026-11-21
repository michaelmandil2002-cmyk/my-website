import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { Main, Shell } from '@/components/layout/MainLayout/MainLayout.styles';
import { SkipLink } from '@/components/ui/SkipLink/SkipLink';

const MAIN_ID = 'main-content';

interface MainLayoutProps {
  readonly children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Shell id="top">
      <SkipLink targetId={MAIN_ID} />
      <Header />
      <Main id={MAIN_ID} tabIndex={-1}>
        {children}
      </Main>
      <Footer />
    </Shell>
  );
}
