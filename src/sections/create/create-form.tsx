import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  Alert,
  Button,
  Container,
  Typography,
  IconButton,
  AlertColor,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  nomor: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(100, 'Maximum 100 characters')
    .required('Required'),
  nama: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(1000, 'Maximum 1000 characters')
    .required('Required'),
  email: Yup.string().email().required('Required'),
  info: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(1000, 'Maximum 1000 characters')
    .required('Required'),
  file: Yup.string().required('Required'),
});

type Props = {
  onClose: VoidFunction;
};

// ----------------------------------------------------------------------

export default function CreateForm({ onClose }: Props) {
  const [file, setFile] = useState<File | string | null>(null);

  const [fileName, setFileName] = useState('');
  const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

  const handleDropSingleFile = useCallback(async (acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];

    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
      methods.setValue('file', newFile.name);
      setFileName(newFile.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      nomor: '',
      nama: '',
      email: '',
      info: '',
      file: '',
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', file as File); // Assuming 'file' is a File object
      formData.append('no', data.nomor);
      formData.append('name', data.nama);
      formData.append('email', data.email);
      formData.append('info', data.info);

      const response = await fetch(`${process.env.NEXT_PUBLIC_CERTIFY_API}/encrypt`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const result_api = await response.json();
        const getImageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_CERTIFY_API}/get_image/${result_api.filename}`
        );
        if (getImageResponse.ok) {
          // Convert the image response to blob
          const imageBlob = await getImageResponse.blob();

          // Create a temporary anchor element to trigger download
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(imageBlob);
          downloadLink.setAttribute('download', result_api.filename); // Set the filename for download
          downloadLink.click();

          // Cleanup
          URL.revokeObjectURL(downloadLink.href);
        } else {
          console.error('Failed to fetch the encrypted image');
        }
        reset();
        setFile(null);
        setFileName('');
        setAlert({ show: true, severity: 'success', message: 'Proses Stegano Sertifikat Success' });
      } else {
        console.error('Gagal melakukan pengecekan sertifikat');
        setAlert({ show: true, severity: 'error', message: 'Proses Stegano Sertifikat Gagal' });
      }
    } catch (error) {
      console.log(error);
    }
  });

  const onDeleteFile = () => {
    setFile(null);
    setFileName('');
    methods.setValue('file', '');
  };
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
          <Grid container spacing={3} sx={{ p: 3 }} alignItems="center">
            <Grid item xs={12}>
              {alert.show && <Alert severity={alert.severity as AlertColor}>{alert.message}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ borderRadius: '10px' }}>
                <Grid container spacing={3}>
                  <Grid item sx={{ textAlign: 'left' }}>
                    <UploadBox
                      file={file}
                      onDrop={handleDropSingleFile}
                      onDelete={() => {
                        onDeleteFile();
                      }}
                      accept={{ 'image/*': [] }}
                      placeholder={
                        <Button variant="contained" startIcon={<Iconify icon="ph:upload-light" />}>
                          Pilih File
                        </Button>
                      }
                    />
                  </Grid>
                  <Grid item xs>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="grey" sx={{ py: '6px' }}>
                        {fileName || 'Belum ada file yang dipilih'}
                      </Typography>
                      {fileName && (
                        <IconButton
                          onClick={() => {
                            onDeleteFile();
                          }}
                          color="error"
                          sx={{ textAlign: 'right' }}
                        >
                          <Iconify icon="octicon:x-16" />
                        </IconButton>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              {Boolean(errors.file) && !fileName && (
                <Typography variant="subtitle1" color="error">
                  {errors?.file?.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Nomor Sertifikat
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField name="nomor" placeholder="Masukkan nomor sertifikat" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Nama Pemilik
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField name="nama" placeholder="Masukkan nama pemilik" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Email Pemilik
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField name="email" placeholder="Masukkan email pemilik" />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 400 }}>
                Informasi Tambahan
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <RHFTextField
                name="info"
                placeholder="Masukkan informasi tambahan"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => {
                    onDeleteFile();
                    reset();
                  }}
                >
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
