import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Button, Container, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters')
    .required('Required'),
  desc: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(1000, 'Maximum 1000 characters')
    .required('Required'),
  icon: Yup.string().required('Required'),
});

type Props = {
  onClose: VoidFunction;
};

// ----------------------------------------------------------------------

export default function CreateForm({ onClose }: Props) {
  const [file, setFile] = useState<File | string | null>(null);

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: '',
      desc: '',
      icon: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });
  return (
    <Container>
      <Stack gap={5} alignItems="center" sx={{ mb: '50px' }}>
        <Typography
          sx={{ fontSize: '40px', fontWeight: 600, color: 'primary.main', textAlign: 'center' }}
        >
          Buat Stego Sertifikat
        </Typography>
      </Stack>
      <Stack>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Card sx={{ borderRadius: '10px', height: '40px' }}>
            <Grid container spacing={3}>
              <Grid item>
                <Upload
                  file={file}
                  onDelete={() => setFile(null)}
                  accept={{ 'image/*': [] }}
                  customPlaceholder={
                    <Card
                      sx={{
                        borderRadius: '10px',
                        backgroundColor: 'grey.300',
                        py: '6px',
                        px: '20px',
                        height: '40px',
                      }}
                    >
                      <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                        <Iconify icon="ph:upload-light" />
                        <Typography>Pilih File</Typography>
                      </Stack>
                    </Card>
                  }
                />
              </Grid>
              <Grid item>
                <Typography color="grey" sx={{ py: '6px' }}>
                  Belum ada file yang dipilih
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <Grid container spacing={3} sx={{ p: 3 }} alignItems="center">
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Nomor Sertifikat
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField name="name" placeholder="Masukkan nomor sertifikat" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Nama Pemilik
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField name="name" placeholder="Masukkan nama pemilik" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Email Pemilik
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField name="name" placeholder="Masukkan email pemilik" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Informasi Tambahan
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField
                name="desc"
                placeholder="Masukkan informasi tambahan"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                  Batalkan
                </Button>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  loading={isSubmitting}
                >
                  Sisipkan Pesan
                </LoadingButton>
              </Stack>
            </Grid>
          </Grid>
        </FormProvider>
      </Stack>
    </Container>
  );
}
