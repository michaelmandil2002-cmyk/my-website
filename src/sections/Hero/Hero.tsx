import { Container } from '@/components/ui/Container/Container';
import { asset } from '@/constants/site';
import { BIO } from '@/data/profile';
import { Art, Layout, Lead, Name, StyledHero, Text } from '@/sections/Hero/Hero.styles';

const CAT = { src: 'art/cat.png', small: 'art/cat-500.png', width: 1000, height: 716 } as const;

export function Hero() {
  return (
    <StyledHero aria-labelledby="hero-title">
      <Container>
        <Layout>
          <Text>
            <Name id="hero-title">Hi, I’m Michael!</Name>
            <Lead>{BIO.join(' ')}</Lead>
          </Text>
          <Art
            src={asset(CAT.src)}
            srcSet={`${asset(CAT.small)} 500w, ${asset(CAT.src)} 1000w`}
            sizes="(min-width: 1024px) 34vw, 80vw"
            width={CAT.width}
            height={CAT.height}
          />
        </Layout>
      </Container>
    </StyledHero>
  );
}
