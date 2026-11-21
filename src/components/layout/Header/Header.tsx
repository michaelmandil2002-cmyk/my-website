import { useCallback, useEffect, useId, useState } from 'react';

import {
  Bar,
  Brand,
  MenuToggle,
  Nav,
  NavItemLink,
  NavList,
  StyledHeader,
} from '@/components/layout/Header/Header.styles';
import { Container } from '@/components/ui/Container/Container';
import { NAV_LINKS, SITE } from '@/constants/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const navId = useId();

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <StyledHeader>
      <Container>
        <Bar>
          <Brand href="#top">{SITE.name}</Brand>

          <MenuToggle
            type="button"
            aria-expanded={open}
            aria-controls={navId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={toggle}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              {open ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </MenuToggle>

          <Nav id={navId} aria-label="Main" $open={open}>
            <NavList>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavItemLink href={link.href} onClick={close}>
                    {link.label}
                  </NavItemLink>
                </li>
              ))}
            </NavList>
          </Nav>
        </Bar>
      </Container>
    </StyledHeader>
  );
}
