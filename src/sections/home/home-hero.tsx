import { useState } from 'react';

import { Box, Grid, Stack, Button, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import AuthView from 'src/layouts/main/auth-view';

import { ConfirmDialog } from 'src/components/custom-dialog';

export default function HomeHero() {
  const [authView, setAuthView] = useState(false);
  const { user } = useAuthContext();
  return (
    <Container maxWidth="xl" sx={{ height: { xs: 'inherit', lg: '50vh' } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack gap={5} alignItems="start" sx={{ maxWidth: { sm: '100%', md: '80%' }, px: 3 }}>
            <Typography variant="h2">
              Cek{' '}
              <Typography variant="h2" component="span" sx={{ color: 'primary.dark' }}>
                Sertifikat
              </Typography>{' '}
              Anda <br /> dengan{' '}
              <Typography variant="h2" component="span" sx={{ color: 'primary.dark' }}>
                Certify
              </Typography>{' '}
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 300 }}>
              Certify adalah portal inovatif untuk memeriksa keaslian e-sertifikat dengan cepat dan
              mudah. Dengan misi untuk memberikan jaminan keamanan tingkat tinggi kepada
              penggunanya, Certify hadir sebagai solusi terdepan dalam verifikasi sertifikat secara
              online.
            </Typography>
            <Button
              onClick={() => !user?.username && setAuthView(true)}
              component={RouterLink}
              href={user && user.username ? paths.dashboard.upload : '#'}
              variant="contained"
              sx={{
                background: 'linear-gradient(90deg, #514FFF 0%, #3535DD 94.8%)',
                boxShadow: '0px 0px 16px 6px rgba(3, 0, 255, 0.25)',
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box
            component="img"
            src="assets/illustrations/illustration-hero.svg"
            sx={{ width: '90%' }}
          />
        </Grid>
      </Grid>
      <ConfirmDialog
        maxWidth="md"
        fullWidth
        open={authView}
        onClose={() => setAuthView(false)}
        content={<AuthView onClose={() => setAuthView(false)} />}
      />
    </Container>
  );
}
