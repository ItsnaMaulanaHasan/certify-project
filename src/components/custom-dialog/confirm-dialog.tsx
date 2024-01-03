import { forwardRef } from 'react';

import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TransitionProps } from '@mui/material/transitions';

import Iconify from '../iconify';
import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>
  ) => <Slide direction="up" ref={ref} {...props} />
);

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  isForm,
  customAction,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
      TransitionComponent={Transition}
    >
      {title && (
        <DialogTitle
          sx={{
            fontSize: '20px',
            py: '20px',
            fontWeight: 500,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {title}

            <IconButton onClick={onClose} sx={{ p: 0 }}>
              <Iconify
                icon="eva:close-outline"
                width={24}
                color={(theme) => theme.palette.common.white}
              />
            </IconButton>
          </Stack>
        </DialogTitle>
      )}

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}
    </Dialog>
  );
}
