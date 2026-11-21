import styled from 'styled-components';

export const StyledPicture = styled.picture`
  display: block;
`;

export const StyledImg = styled.img<{ readonly $fit: 'cover' | 'contain' }>`
  width: 100%;
  height: auto;
  object-fit: ${({ $fit }) => $fit};
  background-color: ${({ theme }) => theme.colors.surface};
`;
