import styled from 'styled-components';

export const Dialog = styled.dialog`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: ${({ theme }) => theme.space.md};
  color: ${({ theme }) => theme.colors.onPrimary};
  background: transparent;
  border: 0;

  &::backdrop {
    background: rgb(17 17 17 / 0.92);
  }

  &[open] {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Figure = styled.figure`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`;

export const Close = styled.button`
  position: fixed;
  top: ${({ theme }) => theme.space.md};
  right: ${({ theme }) => theme.space.md};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  color: inherit;
  background: rgb(255 255 255 / 0.12);
  border: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;

  &:hover {
    background: rgb(255 255 255 / 0.24);
  }
`;
