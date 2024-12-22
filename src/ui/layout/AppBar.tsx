import { useState, useCallback, MouseEvent } from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { AppBarLogo } from '@/ui/layout/AppBarLogo';
import { XSScreenMenu } from '@/ui/layout/XSScreenMenu';
import { MDScreenMenu } from '@/ui/layout/MDScreenMenu';
import { AppBarDate } from '@/ui/layout/AppBarDate';
import { useMediaQuery, useTheme } from '@mui/material';

export function AppBar() {
  const [navAnchorElement, setNavAnchorElement] = useState<null | HTMLElement>(
    null,
  );

  const handleNavMenuOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setNavAnchorElement(event.currentTarget);
  }, []);

  const handleNavMenuClose = useCallback(() => {
    setNavAnchorElement(null);
  }, []);

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <MuiAppBar position="static">
      <Container>
        <Toolbar disableGutters>
          {isMdUp && <AppBarLogo />}

          <XSScreenMenu
            navAnchorElement={navAnchorElement}
            onNavMenuOpen={handleNavMenuOpen}
            onNavMenuClose={handleNavMenuClose}
          />

          <MDScreenMenu onNavMenuClose={handleNavMenuClose} />

          <AppBarDate />
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}
