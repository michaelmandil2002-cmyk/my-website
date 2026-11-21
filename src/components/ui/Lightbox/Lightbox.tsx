import { useEffect, useRef, type MouseEvent } from 'react';

import { Close, Dialog, Figure } from '@/components/ui/Lightbox/Lightbox.styles';

export interface LightboxImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Show a video instead of an image (plays muted on loop, with controls). */
  readonly kind?: 'image' | 'video';
  readonly poster?: string;
}

interface LightboxProps {
  readonly image: LightboxImage | null;
  readonly onClose: () => void;
}

/** Full-screen image or video viewer on the native <dialog>: Escape, focus trap and backdrop come built in. */
export function Lightbox({ image, onClose }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (image && !dialog.open) dialog.showModal();
    if (!image && dialog.open) dialog.close();
  }, [image]);

  /** Clicks on the dark area around the image (not on the image itself) close the viewer. */
  const onBackdropClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <Dialog ref={ref} aria-label={image?.alt} onClose={onClose} onClick={onBackdropClick}>
      <Close type="button" aria-label="Close preview" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
        </svg>
      </Close>
      {image && (
        <Figure onClick={onBackdropClick}>
          {image.kind === 'video' ? (
            <video
              ref={(video) => {
                // Muted so it can start on its own (sound can be turned on with the controls).
                if (video) video.muted = true;
              }}
              src={image.src}
              poster={image.poster}
              width={image.width}
              height={image.height}
              aria-label={image.alt}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          ) : (
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
          )}
        </Figure>
      )}
    </Dialog>
  );
}
