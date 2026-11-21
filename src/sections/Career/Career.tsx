import { Container } from '@/components/ui/Container/Container';
import { CAREER } from '@/data/profile';
import { Item, List, StyledCareer, Title } from '@/sections/Career/Career.styles';

export function Career() {
  return (
    <StyledCareer id="career" aria-labelledby="career-title">
      <Container>
        <Title id="career-title">Career</Title>
        <List>
          {CAREER.map((item) => (
            <Item key={`${item.role}-${item.place}`}>
              <h3>{item.role}</h3>
              <time>{item.period}</time>
              <p>{item.place}</p>
              {item.details && (
                <ul>
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </Item>
          ))}
        </List>
      </Container>
    </StyledCareer>
  );
}
