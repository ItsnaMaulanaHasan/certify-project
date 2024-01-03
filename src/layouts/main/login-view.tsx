'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function LoginView() {
  // const [auth, setAuth] = useState(false);
  const xlDown = useResponsive('down', 'xl');

  const password = useBoolean();
  const forgotPassword = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  const renderHead = (
    <Box component="img" src="/logo/logo-full.png" sx={{ width: 'auto', height: '40px' }} />
  );

  const renderForm = (
    <Stack spacing={2}>
      <Stack spacing="32px" sx={{ my: xlDown ? '20px' : '48px' }}>
        <Stack gap="8px">
          <Typography variant="body2">Username</Typography>
          <RHFTextField name="email" placeholder="Enter your username" />
        </Stack>
        <Stack gap="8px">
          <Typography variant="body2">Password</Typography>
          <RHFTextField
            name="password"
            type={password.value ? 'text' : 'password'}
            placeholder="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'eva:eye-outline' : 'eva:eye-off-2-outline'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Typography
          variant="body2"
          color="primary"
          sx={{ alignSelf: 'flex-end', cursor: 'pointer' }}
          onClick={forgotPassword.onTrue}
        >
          Forgot password?
        </Typography>
      </Stack>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
      <Typography sx={{ textAlign: 'center' }}>
        Belum mempunyai akun?{' '}
        <Link color="primary" underline="hover" sx={{ cursor: 'pointer' }}>
          Daftar
        </Link>
      </Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box sx={{ px: { xs: 4, md: 10 }, py: 2 }}>
        {renderHead}

        {renderForm}
      </Box>
    </FormProvider>
  );
}
