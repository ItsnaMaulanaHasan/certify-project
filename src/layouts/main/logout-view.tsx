'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/auth/hooks';

export default function LogoutView({ onClose }: { onClose: VoidFunction }) {
  const { logout } = useAuthContext();

  const handleLogoutClick = () => {
    logout();
    onClose();
    // Tambahan: tambahkan logika jika diperlukan setelah logout berhasil
  };

  const handleCancelClick = () => {
    onClose(); // Memanggil onClose() untuk menutup modal
  };

  const renderHead = (
    <Box component="img" src="/logo/logo-full.png" sx={{ width: 'auto', height: '40px' }} />
  );
  return (
    <Box sx={{ px: { xs: 4, md: 10 }, py: 2 }}>
      <Stack gap={5} alignItems="center">
        {renderHead}
        <Typography variant="body1" color="initial">
          Apakah anda yakin ingin logout?
        </Typography>
        <Stack direction="row" gap={2}>
          <Button
            onClick={handleLogoutClick}
            variant="contained"
            sx={{ backgroundColor: 'primary.main' }}
          >
            Yakin
          </Button>
          <Button
            onClick={handleCancelClick}
            variant="contained"
            sx={{ backgroundColor: 'error.main' }}
          >
            Tidak
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
