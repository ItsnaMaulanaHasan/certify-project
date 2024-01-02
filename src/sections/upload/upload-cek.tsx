import { useState, useCallback } from 'react';

import { Box, Grid, Card, Stack, Button, Divider, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

export default function UploadCek() {
  const [file, setFile] = useState<File | string | null>(null);

  const [isChecked, setIsChecked] = useState(false);

  const handleDropSingleFile = useCallback(async (acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];

    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Stack gap={5} alignItems="center" textAlign="center">
        <Typography variant="h1" sx={{ fontSize: '56px', fontWeight: 400 }}>
          Cek Sertifikat Anda
        </Typography>
        <Typography sx={{ fontSize: '23px', fontWeight: 300 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non rhoncus quam, ac
          aliquet nisl. Praesent id metus malesuada, pulvinar mi eget, lobortis urna. Proin dictum
          leo eu tincidunt efficitur. Aliquam ullamcorper ut mi et dignissim.
        </Typography>
        <Upload
          file={file}
          onDrop={handleDropSingleFile}
          onDelete={() => setFile(null)}
          accept={{ 'image/*': [] }}
          customPlaceholder={
            <Card
              sx={{
                border: '1px dashed #000',
                borderRadius: '10px',
                background: 'rgba(249, 249, 249, 0.60)',
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                py: '117px',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                <Iconify icon="ph:upload-light" />
                <Typography>Letakkan File Sertifikat Anda di Sini</Typography>
              </Stack>
            </Card>
          }
        />
        <Stack direction="row" gap={2}>
          <Button
            onClick={() => setIsChecked(true)}
            variant="contained"
            sx={{
              backgroundColor: 'success.main',
              px: '50px',
            }}
          >
            Cek
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              px: '50px',
            }}
            component={RouterLink}
            href={paths.upload.create}
          >
            Buat
          </Button>
        </Stack>
      </Stack>
      {file && isChecked && (
        <Card sx={{ border: '1px', borderRadius: '10px', mt: '50px' }}>
          <Box sx={{ backgroundColor: 'grey.300', py: '18px', pl: '45px' }}>
            <Typography sx={{ fontSize: '20px', fontWeight: 500, color: 'grey.700' }}>
              Hasil Pengecekan
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ px: '45px', py: '30px' }}>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Nomor Sertifikat</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '20px' }}>CERT/ANIES/PRES-2024-RI01</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Nama</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '20px' }}>Anies Baswedan</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Email</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '20px' }}>aniesalumiugm@mhs.ugm.ac.id</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
                Informasi Tambahan
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '20px' }}>
                Sertifikat pelatihan kepemimpinan presiden dengan judul “Menuju Indonesia Maju 2035
                Bersama Pemimpin yang tidak Memalukan Almamater Kampus”
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
          </Grid>
        </Card>
      )}
    </Container>
  );
}
