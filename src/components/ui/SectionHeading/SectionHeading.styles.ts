import styled from 'styled-components';

export const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.space['2xl']};
  font-size: ${({ theme }) => theme.fontSizes.section};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.none};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
`;

export const Small = styled.span`
  display: block;
  font-size: 0.62em;
  letter-spacing: ${({ theme }) => theme.letterSpacings.tighter};
`;

export const Large = styled.span`
  display: block;
`;
