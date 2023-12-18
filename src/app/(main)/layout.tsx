import MainLayout from 'src/layouts/main';

import SnackbarProvider from 'src/components/snackbar/snackbar-provider';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <SnackbarProvider>
      <MainLayout>{children}</MainLayout>
    </SnackbarProvider>
  );
}
