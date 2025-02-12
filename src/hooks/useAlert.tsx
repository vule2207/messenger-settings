import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useAlert = (defaultContent: string | ReactNode) => {
  const [promise, setPromise] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { t } = useTranslation();

  const alert = (mesageConfig?: { title: string; body: string }) => {
    if (mesageConfig) {
      setTitle(mesageConfig?.title);
      setContent(mesageConfig?.body);
    }
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  let body = defaultContent;
  if (typeof defaultContent === 'string') {
    body = <div dangerouslySetInnerHTML={{ __html: defaultContent }} />;
  }

  if (content) {
    if (typeof content === 'string') {
      body = <div dangerouslySetInnerHTML={{ __html: content }} />;
    } else {
      body = content;
    }
  }

  const AlertModal: any = () => (
    <Dialog open={promise !== null}>
      <DialogContent className='sm:max-w-[425px] top-[15%]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <span className='text-slate-700'>{body}</span>
        </DialogBody>
        <DialogFooter>
          <Button variant='default' className='w-[80px]' size={'sm'} onClick={handleConfirm}>
            {t('approval_form_ok')}
          </Button>
          <Button variant='secondary' className='w-[80px]' size={'sm'} onClick={handleCancel}>
            {t('common_close_msg')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [AlertModal, alert];
};

export default useAlert;
