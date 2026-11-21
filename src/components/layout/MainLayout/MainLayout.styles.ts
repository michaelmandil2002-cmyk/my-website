import styled from 'styled-components';

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

export const Main = styled.main`
  flex: 1;

  &:focus {
    outline: none;
  }
`;
