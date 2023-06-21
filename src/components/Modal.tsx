import React, { ReactNode } from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';


interface ModalProps {
  title: string;
  children: ReactNode;
  openPopup: boolean;
  setOpenPopup?: any;
}

export default function Modal(props: ModalProps) {
  const { title, children, openPopup, setOpenPopup } = props;

  return (
    <Dialog open={openPopup} maxWidth="md">
      <DialogTitle >
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            onClick={() => { setOpenPopup(false) }}>
            <Close />
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  )
}
