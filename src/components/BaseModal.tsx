import React from 'react';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  header: React.ReactElement;
  body: React.ReactElement;
  footer: React.ReactElement;
}

const BaseModal = ({ open, onClose, body, footer, header }: BaseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className='sm:max-w-[600px] top-[15%]'>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <DialogBody>{body}</DialogBody>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
