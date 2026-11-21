import { StyledSkipLink } from '@/components/ui/SkipLink/SkipLink.styles';

interface SkipLinkProps {
  readonly targetId: string;
}

/** Lets keyboard users jump past the navigation straight to the main content. */
export function SkipLink({ targetId }: SkipLinkProps) {
  return <StyledSkipLink href={`#${targetId}`}>Skip to main content</StyledSkipLink>;
}
