'use client';

import Box from '@mui/material/Box';

import HomeHero from '../home-hero';
import HomeAbout from '../home-about';

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <>
      <HomeHero />

      <Box component="div" id="about" sx={{ mb: 20 }} />
      <HomeAbout />
    </>
  );
}
