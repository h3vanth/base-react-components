import * as React from 'react';
import Stack from '@mui/material/Stack';
import MuiSnackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export enum ALERT_SEVERITY {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface SnackbarData {
  message: string;
  severity: ALERT_SEVERITY;
}

export interface SnackbarProps extends SnackbarData {
  open: boolean;
  handleClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props: AlertProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  )
);

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  handleClose,
}) => {
  const onClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    handleClose();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <MuiSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </MuiSnackbar>
    </Stack>
  );
};

export default Snackbar;
