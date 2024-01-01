import { Box, Grid, Stack, Container, Typography } from '@mui/material';

export default function HomeAbout() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Stack gap={2} alignItems="center" sx={{ px: { sm: 'inherit', lg: 5 } }}>
            <Box component="img" src="assets/illustrations/illustration-about1.svg" width="300px" />
            <Typography variant="h4" sx={{ color: 'primary.dark', textAlign: 'center' }}>
              Cerdas dan Efisien
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 300, textAlign: 'center' }}>
              Certify menggunakan teknologi canggih untuk memastikan verifikasi yang cepat dan
              akurat. Dengan algoritma pintar, prosesnya menjadi lebih efisien tanpa mengorbankan
              keamanan.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack gap={2} alignItems="center" sx={{ px: { sm: 'inherit', lg: 5 } }}>
            <Box component="img" src="assets/illustrations/illustration-about2.svg" width="300px" />
            <Typography variant="h4" sx={{ color: 'primary.dark', textAlign: 'center' }}>
              Sederhana dan Simple
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 300, textAlign: 'center' }}>
              Desain antarmuka Certify didesain agar ramah pengguna, memastikan bahwa siapa pun,
              dari pengguna ahli hingga yang tidak terbiasa dengan teknologi, dapat dengan mudah
              memeriksa keaslian sertifikat.
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack gap={2} alignItems="center" sx={{ px: { sm: 'inherit', lg: 5 } }}>
            <Box component="img" src="assets/illustrations/illustration-about3.svg" width="300px" />
            <Typography variant="h4" sx={{ color: 'primary.dark', textAlign: 'center' }}>
              Keamanan Maksimal
            </Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 300, textAlign: 'center' }}>
              Certify memberikan prioritas tertinggi pada keamanan data dan informasi pengguna.
              Setiap transaksi dijamin aman dan terenkripsi, memberikan ketenangan pikiran kepada
              pengguna.
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
