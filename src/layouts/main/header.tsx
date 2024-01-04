import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { useResponsive } from 'src/hooks/use-responsive';

import Logo from 'src/components/logo';
import { ConfirmDialog } from 'src/components/custom-dialog';

import AuthView from './auth-view';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import { navConfig } from './config-navigation';
import HeaderShadowLanding from '../common/header-shadow-landing';

// ----------------------------------------------------------------------

export default function Header() {
  const [auth, setAuth] = useState(false);

  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          py: 0,
          boxShadow: '0px 4px 12.6px 4px rgba(0, 0, 0, 0.25)',
          bgcolor: theme.palette.common.white,
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo sx={{ width: '120px', height: 'auto' }} />

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {/* login button  */}
            <Button variant="contained" color="primary" onClick={() => setAuth(true)}>
              Login
            </Button>
            {!mdUp && <NavMobile data={navConfig} />}
          </Stack>
          <ConfirmDialog
            maxWidth="md"
            fullWidth
            open={auth}
            onClose={() => setAuth(false)}
            content={<AuthView />}
          />
        </Container>
      </Toolbar>

      <HeaderShadowLanding />
    </AppBar>
  );
}
