import { FooterInner, FooterLinks, StyledFooter } from '@/components/layout/Footer/Footer.styles';
import { Container } from '@/components/ui/Container/Container';
import { SITE, SOCIAL_LINKS } from '@/constants/site';

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <StyledFooter>
      <Container>
        <FooterInner>
          <p>
            © {YEAR} {SITE.name}
          </p>
          <FooterLinks>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#top">Back to top ↑</a>
            </li>
          </FooterLinks>
        </FooterInner>
      </Container>
    </StyledFooter>
  );
}
