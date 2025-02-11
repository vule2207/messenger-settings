import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export interface AlertDialogProps {
  open: boolean;
  title: string;
  content: string;
  description?: string;
  setOpen: (val: boolean) => void;
}

const AlertDialog = (props: AlertDialogProps) => {
  const { content, title, description = '', open, setOpen } = props;

  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px] top-[15%]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <span className='text-slate-700'>{content}</span>
        <DialogFooter>
          <Button className='w-[80px]' size={'sm'} onClick={() => setOpen(false)}>
            {t('common_close_msg')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
