import styled from 'styled-components';

export const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  height: 100%;
  padding: ${({ theme }) => theme.space.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const CardBody = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;
