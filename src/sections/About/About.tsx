import { Container } from '@/components/ui/Container/Container';
import { BIO, EDUCATION, EXPERIENCE, LANGUAGES, SKILLS, type TimelineItem } from '@/data/profile';
import {
  Details,
  Group,
  Intro,
  Layout,
  StyledAbout,
  Tags,
  Timeline,
} from '@/sections/About/About.styles';

function TimelineList({ items }: { readonly items: readonly TimelineItem[] }) {
  return (
    <Timeline>
      {items.map((item) => (
        <li key={`${item.title}-${item.place}`}>
          <strong>{item.title}</strong>
          <span>{item.place}</span>
          <time>{item.period}</time>
        </li>
      ))}
    </Timeline>
  );
}

export function About() {
  return (
    <StyledAbout id="about" aria-labelledby="about-title">
      <Container>
        <Layout>
          <Intro>
            <h2 id="about-title">Hi, I’m Michael!</h2>
            {BIO.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Intro>

          <Details>
            <Group>
              <h3>Experience</h3>
              <TimelineList items={EXPERIENCE} />
            </Group>
            <Group>
              <h3>Education</h3>
              <TimelineList items={EDUCATION} />
            </Group>
            <Group>
              <h3>Skills</h3>
              <Tags>
                {SKILLS.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </Tags>
            </Group>
            <Group>
              <h3>Languages</h3>
              <Tags>
                {LANGUAGES.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </Tags>
            </Group>
          </Details>
        </Layout>
      </Container>
    </StyledAbout>
  );
}
