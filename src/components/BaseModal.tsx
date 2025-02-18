import React from 'react';
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  header: React.ReactElement;
  body: React.ReactElement;
  footer?: React.ReactElement;
  modalClass?: string;
}

const BaseModal = ({ open, onClose, body, footer, header, modalClass = 'sm:max-w-[600px]' }: BaseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose()}>
      <DialogContent className={modalClass}>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <DialogBody className={!footer ? 'pb-4' : ''}>{body}</DialogBody>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
