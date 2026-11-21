import { memo } from 'react';

import { ResponsiveImage } from '@/components/ui/ResponsiveImage/ResponsiveImage';
import type { Project } from '@/data/types';
import { projectHref } from '@/hooks/useHashRoute';
import {
  CardLink,
  CardMedia,
  CardTitle,
  TextCover,
} from '@/sections/Work/ProjectCard/ProjectCard.styles';
import { imageProps } from '@/utils/media';

interface ProjectCardProps {
  readonly project: Project;
}

function ProjectCardComponent({ project }: ProjectCardProps) {
  return (
    <CardLink href={projectHref(project.slug)}>
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
      <CardTitle>{project.title}</CardTitle>
    </CardLink>
  );
}

export const ProjectCard = memo(ProjectCardComponent);
