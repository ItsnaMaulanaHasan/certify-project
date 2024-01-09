import { useState, useCallback } from 'react';

import { Box, Grid, Card, Stack, Button, Divider, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import AuthView from 'src/layouts/main/auth-view';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import { ConfirmDialog } from 'src/components/custom-dialog';

export default function UploadCek() {
  const [authView, setAuthView] = useState(false);
  const { user } = useAuthContext();
  const [file, setFile] = useState<File | string | null>(null);

  const [isChecked, setIsChecked] = useState(false);
  const [result, setResult] = useState<any>(null);

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

  const handleCheck = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file as File); // Assuming 'file' is a File object

      const response = await fetch(`${process.env.NEXT_PUBLIC_CERTIFY_API}/decrypt`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const result_api = await response.json();
        setResult(JSON.parse(result_api));
        setIsChecked(true);
      } else {
        console.error('Gagal melakukan pengecekan sertifikat');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <Container>
      <Stack gap={5} alignItems="center" textAlign="center">
        <Typography variant="h1" sx={{ fontSize: '56px', fontWeight: 400 }}>
          Cek Sertifikat Anda
        </Typography>
        <Typography sx={{ fontSize: '23px', fontWeight: 300 }}>
          Unggah file Sertifikat Anda yang telah diamankan dengan aman menggunakan steganografi
          untuk mendapatkan kembali informasi rahasia yang disimpan di dalamnya.
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
            onClick={user && user.username ? handleCheck : () => setAuthView(true)}
            variant="contained"
            sx={{
              backgroundColor: 'success.main',
              px: '50px',
            }}
          >
            Cek
          </Button>
          <Button
            onClick={() => !user?.username && setAuthView(true)}
            variant="contained"
            sx={{
              backgroundColor: 'primary.main',
              px: '50px',
            }}
            component={RouterLink}
            href={user && user.username ? paths.upload.create : '#'}
          >
            Buat
          </Button>
        </Stack>
      </Stack>
      {file && isChecked && result && (
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
              <Typography sx={{ fontSize: '20px' }}>{result.no}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Nama</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '20px' }}>{result.nama}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Email</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography sx={{ fontSize: '20px' }}>{result.email}</Typography>
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
              <Typography sx={{ fontSize: '20px' }}>{result.info}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem />
            </Grid>
          </Grid>
        </Card>
      )}
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
