import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Footer() {
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#4240C1',
      }}
    >
      <Divider />

      <Container
        sx={{
          py: '56px',
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={8} md={3}>
            <Box
              component="img"
              src="/logo/logo-white.png"
              sx={{ width: 'auto', height: '40px' }}
            />
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ textAlign: { xs: 'center', md: 'unset' }, py: 2.5 }}>
        <Divider sx={{ backgroundColor: 'grey.A100', height: '3px', mb: '33px' }} />
        <Stack direction="row" alignItems="center" justifyContent="center" gap="47px">
          <Typography sx={{ color: (theme) => theme.palette.common.white }}>
            © Copyright
          </Typography>
          <Box component="img" src="/logo/logo-white.png" sx={{ width: 'auto', height: '30px' }} />
          <Typography sx={{ color: (theme) => theme.palette.common.white }}>
            All Right Reserved
          </Typography>
        </Stack>
      </Container>
    </Box>
  );

  return mainFooter;
}
