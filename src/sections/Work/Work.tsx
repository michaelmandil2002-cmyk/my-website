import { useState } from 'react';

import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { PROJECTS } from '@/data/projects';
import type { ProjectCategory } from '@/data/types';
import { ProjectCard } from '@/sections/Work/ProjectCard/ProjectCard';
import { Filter, Filters, Grid, StyledWork } from '@/sections/Work/Work.styles';

const CATEGORIES: readonly ProjectCategory[] = [...new Set(PROJECTS.map((p) => p.category))];

export function Work() {
  const [category, setCategory] = useState<ProjectCategory | null>(null);
  const visible = category ? PROJECTS.filter((p) => p.category === category) : PROJECTS;

  return (
    <StyledWork id="work" aria-labelledby="work-title">
      <Container>
        <SectionHeading
          id="work-title"
          eyebrow={`${String(PROJECTS.length)} projects`}
          title="Selected"
          highlight="Work"
          aside={
            <p>Branding, UX / UI, illustration and social media, from studio to client work.</p>
          }
        />

        <Filters role="group" aria-label="Filter projects by category">
          <Filter
            type="button"
            aria-pressed={category === null}
            onClick={() => {
              setCategory(null);
            }}
          >
            All
          </Filter>
          {CATEGORIES.map((c) => (
            <Filter
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => {
                setCategory(c);
              }}
            >
              {c}
            </Filter>
          ))}
        </Filters>

        <Grid>
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </Grid>
      </Container>
    </StyledWork>
  );
}
