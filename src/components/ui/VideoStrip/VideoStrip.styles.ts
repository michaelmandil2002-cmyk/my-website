import styled, { keyframes } from 'styled-components';

const scroll = keyframes`
  to {
    transform: translateX(-50%);
  }
`;

export const Strip = styled.div`
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
`;

export const Track = styled.ul<{ readonly $paused: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
  width: max-content;
  /* Trailing gap so -50% lands exactly on the start of the repeated half (seamless loop). */
  padding: 0 ${({ theme }) => theme.space.md} 0 0;
  list-style: none;
  animation: ${scroll} 90s linear infinite;
  animation-play-state: ${({ $paused }) => ($paused ? 'paused' : 'running')};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  li {
    flex: none;
    width: clamp(15rem, 60vw, 24rem);
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

export const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const PauseButton = styled.button`
  min-height: 2.75rem;
  padding: 0 ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  background: none;
  border: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
