import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/Button/Button';
import { Container } from '@/components/ui/Container/Container';
import { LazyVideo } from '@/components/ui/LazyVideo/LazyVideo';
import { Lightbox, type LightboxImage } from '@/components/ui/Lightbox/Lightbox';
import { asset, SITE } from '@/constants/site';
import { PROJECTS } from '@/data/projects';
import { projectHref } from '@/hooks/useHashRoute';
import { ImageRow } from '@/pages/ProjectPage/ImageRow/ImageRow';
import {
  Back,
  Body,
  Head,
  Next,
  NotFound,
  StyledProject,
  VideoFrame,
} from '@/pages/ProjectPage/ProjectPage.styles';
import { videoPreview } from '@/utils/media';

interface ProjectPageProps {
  readonly slug: string;
}

export function ProjectPage({ slug }: ProjectPageProps) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [zoomed, setZoomed] = useState<LightboxImage | null>(null);

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
          <h1 id="project-title" ref={titleRef} tabIndex={-1}>
            {project.title}
          </h1>
          {project.summary && <p>{project.summary}</p>}
        </Head>

        <Body>
          {project.blocks.map((block, i) => {
            const key = `${block.kind}-${String(i)}`;
            if (block.kind === 'heading') return <h2 key={key}>{block.text}</h2>;
            if (block.kind === 'text') return <p key={key}>{block.text}</p>;
            if (block.kind === 'video') {
              return (
                <VideoFrame
                  key={key}
                  type="button"
                  aria-label={`Enlarge ${project.title} video`}
                  onClick={() => {
                    setZoomed(videoPreview(block.video, `${project.title} video`));
                  }}
                >
                  <LazyVideo
                    src={asset(block.video.src)}
                    poster={asset(block.video.poster)}
                    width={block.video.width}
                    height={block.video.height}
                    ambient
                  />
                </VideoFrame>
              );
            }
            const first = imageCount;
            imageCount += block.images.length;
            return (
              <ImageRow
                key={key}
                images={block.images}
                widths={block.widths}
                wide={block.wide}
                alts={block.images.map(
                  (_, n) => `${project.title}, image ${String(first + n + 1)}`,
                )}
                priority={first === 0}
                onOpen={setZoomed}
              />
            );
          })}
        </Body>

        <Next href={projectHref(next.slug)}>
          <span>Next project →</span>
          <strong>{next.title}</strong>
        </Next>
      </Container>

      <Lightbox
        image={zoomed}
        onClose={() => {
          setZoomed(null);
        }}
      />
    </StyledProject>
  );
}
