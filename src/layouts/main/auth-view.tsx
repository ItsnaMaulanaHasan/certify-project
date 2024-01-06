'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AuthView({ onClose }: { onClose: VoidFunction }) {
  // const [auth, setAuth] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const { login, register } = useAuthContext();
  const xlDown = useResponsive('down', 'xl');

  const [auth, setAuth] = useState('login');
  const [msgError, setMsgError] = useState('');

  const handleSwitchToRegister = () => {
    setAuth('register');
  };

  const handleSwitchToLogin = () => {
    setAuth('login');
  };

  const password = useBoolean();
  const passwordRegister = useBoolean();
  const confPassword = useBoolean();
  const forgotPassword = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const RegisterSchema = Yup.object().shape({
    emailRegister: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    username: Yup.string().required('Email is required'),
    passwordRegister: Yup.string().required('Password is required'),
    confPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('passwordRegister')], 'Passwords must match'),
  });

  const methodsLogin = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const methodsRegister = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      emailRegister: '',
      username: '',
      passwordRegister: '',
      confPassword: '',
    },
  });

  // const {
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methodsLogin;

  const {
    handleSubmit: handleSubmitLogin,
    formState: { isSubmitting: isSubmittingLogin },
  } = methodsLogin;

  const {
    handleSubmit: handleSubmitRegister,
    formState: { isSubmitting: isSubmittingRegister },
  } = methodsRegister;

  const onSubmitLogin = handleSubmitLogin(async (data) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch (error) {
      setMsgError(error.msg);
    }
  });

  const onSubmitRegister = handleSubmitRegister(async (data) => {
    try {
      await register(data.emailRegister, data.username, data.passwordRegister, data.confPassword);
      setIsRegisterSuccess(true);
      methodsRegister.reset();
    } catch (error) {
      setIsRegisterSuccess(false);
      setMsgError(error.msg);
    }
  });

  const renderHead = (
    <Box component="img" src="/logo/logo-full.png" sx={{ width: 'auto', height: '40px' }} />
  );

  const renderForm =
    auth === 'login' ? (
      // Form Login
      <Stack spacing={2}>
        <Stack spacing="32px" sx={{ my: xlDown ? '20px' : '48px' }}>
          {!!msgError && <Alert severity="error">{msgError}</Alert>}
          <Stack gap="8px">
            <Typography variant="body2">Email</Typography>
            <RHFTextField name="email" placeholder="Masukkan Username" />
          </Stack>
          <Stack gap="8px">
            <Typography variant="body2">Password</Typography>
            <RHFTextField
              name="password"
              type={password.value ? 'text' : 'password'}
              placeholder="Masukkan Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify
                        icon={password.value ? 'eva:eye-outline' : 'eva:eye-off-2-outline'}
                      />
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
            Lupa password?
          </Typography>
        </Stack>

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmittingLogin}
        >
          Login
        </LoadingButton>
        <Typography sx={{ textAlign: 'center' }}>
          Belum mempunyai akun?{' '}
          <Link
            color="primary"
            underline="hover"
            sx={{ cursor: 'pointer' }}
            onClick={handleSwitchToRegister}
          >
            Register
          </Link>
        </Typography>
      </Stack>
    ) : (
      // Form Register
      <Stack spacing={2}>
        <Stack spacing="32px" sx={{ my: xlDown ? '20px' : '48px' }}>
          {!!msgError && <Alert severity="error">{msgError}</Alert>}
          {isRegisterSuccess && (
            <Alert severity="success">
              Register berhasil, silahkan{' '}
              <Box
                component="span"
                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => setAuth('login')}
              >
                login
              </Box>{' '}
            </Alert>
          )}
          <Stack gap="8px">
            <Typography variant="body2">Email</Typography>
            <RHFTextField name="emailRegister" placeholder="Masukkan email" />
          </Stack>
          <Stack gap="8px">
            <Typography variant="body2">Username</Typography>
            <RHFTextField name="username" placeholder="Masukkan Username" />
          </Stack>
          <Stack gap="8px">
            <Typography variant="body2">Password</Typography>
            <RHFTextField
              name="passwordRegister"
              type={passwordRegister.value ? 'text' : 'password'}
              placeholder="Masukkan Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={passwordRegister.onToggle} edge="end">
                      <Iconify
                        icon={passwordRegister.value ? 'eva:eye-outline' : 'eva:eye-off-2-outline'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack gap="8px">
            <Typography variant="body2">Confirm Password</Typography>
            <RHFTextField
              name="confPassword"
              type={confPassword.value ? 'text' : 'password'}
              placeholder="Konfirmasi Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={confPassword.onToggle} edge="end">
                      <Iconify
                        icon={confPassword.value ? 'eva:eye-outline' : 'eva:eye-off-2-outline'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmittingRegister}
        >
          Register
        </LoadingButton>
        <Typography sx={{ textAlign: 'center' }}>
          Sudah mempunyai akun?{' '}
          <Link
            color="primary"
            underline="hover"
            sx={{ cursor: 'pointer' }}
            onClick={handleSwitchToLogin}
          >
            Login
          </Link>
        </Typography>
      </Stack>
    );

  return (
    <Box>
      {auth === 'login' && (
        <FormProvider methods={methodsLogin} onSubmit={onSubmitLogin}>
          <Box sx={{ px: { xs: 4, md: 10 }, py: 2 }}>
            {renderHead}

            {renderForm}
          </Box>
        </FormProvider>
      )}
      {auth === 'register' && (
        <FormProvider methods={methodsRegister} onSubmit={onSubmitRegister}>
          <Box sx={{ px: { xs: 4, md: 10 }, py: 2 }}>
            {renderHead}

            {renderForm}
          </Box>
        </FormProvider>
      )}
    </Box>
  );
}
