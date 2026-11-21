import styled from 'styled-components';

export const StyledVideo = styled.video<{ readonly $ratio: string; readonly $ambient: boolean }>`
  width: 100%;
  height: auto;
  aspect-ratio: ${({ $ratio }) => $ratio};
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.surface};

  /* Decorative loops: never show Safari's big play icon over the poster. */
  ${({ $ambient }) =>
    $ambient &&
    `
      &::-webkit-media-controls-start-playback-button,
      &::-webkit-media-controls-overlay-play-button,
      &::-webkit-media-controls {
        display: none !important;
        -webkit-appearance: none;
      }
    `}
`;
