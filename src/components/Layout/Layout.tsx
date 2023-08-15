import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

import AppBar, { AppBarProps } from '../AppBar';
import Snackbar, { SnackbarProps } from '../Snackbar';

interface LayoutProps {
  children: React.ReactNode;
  loading: boolean;
  appBarProps: AppBarProps;
  snackbarProps: SnackbarProps;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  loading,
  appBarProps,
  snackbarProps,
}) => {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar {...appBarProps} />
      <Snackbar {...snackbarProps} />
      <Container sx={{ mt: 2 }}>{children}</Container>
    </>
  );
};

export default Layout;
