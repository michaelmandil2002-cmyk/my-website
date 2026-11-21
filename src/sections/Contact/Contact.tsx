import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { SITE, SOCIAL_LINKS } from '@/constants/site';
import { Email, Eyebrow, Links, StyledContact, Title } from '@/sections/Contact/Contact.styles';

export function Contact() {
  return (
    <StyledContact id="contact" aria-labelledby="contact-title">
      <Container>
        <Eyebrow>Contact</Eyebrow>
        <Title id="contact-title">Let’s make something together.</Title>
        <Email href={`mailto:${SITE.email}`}>{SITE.email}</Email>
        <Links>
          {SOCIAL_LINKS.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              variant="secondary"
              target="_blank"
              rel="noreferrer"
            >
              {link.label} ↗
            </Button>
          ))}
        </Links>
      </Container>
    </StyledContact>
  );
}
