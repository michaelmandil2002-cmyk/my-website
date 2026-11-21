import styled from 'styled-components';

export const StyledSkipLink = styled.a`
  position: absolute;
  top: ${({ theme }) => theme.space.sm};
  left: ${({ theme }) => theme.space.sm};
  z-index: ${({ theme }) => theme.zIndices.skipLink};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  color: ${({ theme }) => theme.colors.onPrimary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  transform: translateY(-200%);

  &:focus {
    transform: translateY(0);
  }
`;
