import { Container } from '@/components/ui/Container/Container';
import { BIO } from '@/data/profile';
import { Lead, Name, StyledHero } from '@/sections/Hero/Hero.styles';

export function Hero() {
  return (
    <StyledHero aria-labelledby="hero-title">
      <Container>
        <Name id="hero-title">Hi, I’m Michael!</Name>
        <Lead>{BIO.join(' ')}</Lead>
      </Container>
    </StyledHero>
  );
}
