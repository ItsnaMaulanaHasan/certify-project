'use client';

import Box from '@mui/material/Box';

import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 1,
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 10, md: 20 },
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
