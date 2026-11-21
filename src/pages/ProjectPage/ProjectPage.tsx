import { useEffect, useRef } from 'react';

import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage/ResponsiveImage';
import { SITE } from '@/constants/site';
import { PROJECTS } from '@/data/projects';
import { projectHref } from '@/hooks/useHashRoute';
import {
  Back,
  Body,
  Category,
  Figure,
  Head,
  Next,
  NotFound,
  StyledProject,
} from '@/pages/ProjectPage/ProjectPage.styles';
import { imageProps } from '@/utils/media';

interface ProjectPageProps {
  readonly slug: string;
}

export function ProjectPage({ slug }: ProjectPageProps) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    document.title = project ? `${project.title} — ${SITE.name}` : `Not found — ${SITE.name}`;
    // Move focus to the new page's heading so screen readers announce the change.
    titleRef.current?.focus({ preventScroll: true });
  }, [project]);

  if (!project || !next) {
    return (
      <Container>
        <NotFound>
          <h1 ref={titleRef} tabIndex={-1}>
            Project not found
          </h1>
          <Button href="#work">See all work</Button>
        </NotFound>
      </Container>
    );
  }

  let imageCount = 0;

  return (
    <StyledProject aria-labelledby="project-title">
      <Container>
        <Back href="#work">← All work</Back>

        <Head>
          <Category>{project.category}</Category>
          <h1 id="project-title" ref={titleRef} tabIndex={-1}>
            {project.title}
          </h1>
          {project.summary && <p>{project.summary}</p>}
          {project.link && (
            <div>
              <Button href={project.link.href} variant="secondary" target="_blank" rel="noreferrer">
                {project.link.label} ↗
              </Button>
            </div>
          )}
        </Head>

        <Body>
          {project.blocks.map((block, i) => {
            const key = `${block.kind}-${String(i)}`;
            if (block.kind === 'heading') return <h2 key={key}>{block.text}</h2>;
            if (block.kind === 'text') return <p key={key}>{block.text}</p>;
            imageCount += 1;
            return (
              <Figure key={key}>
                <ResponsiveImage
                  {...imageProps(block.image)}
                  alt={`${project.title}, image ${String(imageCount)}`}
                  sizes="(min-width: 1344px) 1280px, 100vw"
                  priority={imageCount === 1}
                />
              </Figure>
            );
          })}
        </Body>

        <Next href={projectHref(next.slug)}>
          <span>Next project →</span>
          <strong>{next.title}</strong>
        </Next>
      </Container>
    </StyledProject>
  );
}
