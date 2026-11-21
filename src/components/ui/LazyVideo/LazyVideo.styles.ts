import styled from 'styled-components';

export const StyledVideo = styled.video<{ readonly $ratio: string }>`
  width: 100%;
  height: auto;
  aspect-ratio: ${({ $ratio }) => $ratio};
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.surface};
`;
