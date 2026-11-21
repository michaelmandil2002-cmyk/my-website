import { Container } from '@/components/ui/Container/Container';
import { SectionHeading } from '@/components/ui/SectionHeading/SectionHeading';
import { PROJECTS } from '@/data/projects';
import { ProjectCard } from '@/sections/Work/ProjectCard/ProjectCard';
import { Grid, StyledWork } from '@/sections/Work/Work.styles';

export function Work() {
  return (
    <StyledWork id="work" aria-labelledby="work-title">
      <Container>
        <SectionHeading id="work-title" title="Selected" highlight="Work" />
        <Grid>
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </Grid>
      </Container>
    </StyledWork>
  );
}
