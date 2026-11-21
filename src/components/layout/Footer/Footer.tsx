import { FooterInner, FooterLink, StyledFooter } from '@/components/layout/Footer/Footer.styles';
import { Container } from '@/components/ui/Container/Container';
import { SITE } from '@/constants/site';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <StyledFooter id="contact">
      <Container>
        <FooterInner>
          <p>
            © {YEAR} {SITE.name}. All rights reserved.
          </p>
          <FooterLink href="mailto:hello@example.com">hello@example.com</FooterLink>
        </FooterInner>
      </Container>
    </StyledFooter>
  );
}
