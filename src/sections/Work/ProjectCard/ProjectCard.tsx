import { memo } from 'react';

import { ResponsiveImage } from '@/components/ui/ResponsiveImage/ResponsiveImage';
import type { Project } from '@/data/types';
import { projectHref } from '@/hooks/useHashRoute';
import {
  Blurb,
  CardLink,
  CardMedia,
  CardTitle,
  Frame,
  Panel,
  TextCover,
} from '@/sections/Work/ProjectCard/ProjectCard.styles';
import { imageProps } from '@/utils/media';

interface ProjectCardProps {
  readonly project: Project;
}

function ProjectCardComponent({ project }: ProjectCardProps) {
  return (
    <CardLink href={projectHref(project.slug)}>
      <Frame>
        <CardMedia>
          {project.cover ? (
            <ResponsiveImage
              {...imageProps(project.cover)}
              alt=""
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <TextCover aria-hidden="true">{project.title}</TextCover>
          )}
        </CardMedia>
        <Panel>
          <CardTitle>{project.title}</CardTitle>
          {project.blurb && <Blurb>{project.blurb}</Blurb>}
        </Panel>
      </Frame>
    </CardLink>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
