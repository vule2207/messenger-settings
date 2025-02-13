import BaseModal from '@/components/BaseModal';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { apiURL } from '@/constants';
import { useGetSettings } from '@/hooks/useGetSettings';
import { useUpdateSettings } from '@/hooks/useUpdateSettings';
import {
  AccessHistoryExportCheckResponse,
  AccessHistoryExportParamsType,
  AccessHistoryExportResponse,
} from '@/types';
import { getGroupwareUrl } from '@/utils';
import { FileDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ExportModalProps {
  open: boolean;
  keyword?: string;
  onClose: () => void;
}

const ExportModal = ({ open, keyword, onClose }: ExportModalProps) => {
  const { t } = useTranslation();
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [paramsExportCheck, setParamsExportCheck] = useState<Omit<
    AccessHistoryExportResponse,
    'success'
  > | null>(null);

  const { mutate: exportExcel } = useUpdateSettings<
    AccessHistoryExportResponse,
    AccessHistoryExportParamsType
  >(apiURL.history.export, {
    onSuccess: (exportData) => {
      if (exportData && exportData.success) {
        const params = {
          time: exportData.time,
          count: exportData.count,
          page: exportData.page,
          lang: exportData.lang,
          cn: exportData.cn,
          total: exportData.total,
          keyword: exportData.keyword,
          from: exportData.from || '',
          to: exportData.to || '',
        };
        setParamsExportCheck(params);
        setTimeout(() => {
          exportCheck(params);
        }, 2000);
      }
    },
  });

  const { mutate: exportCheck } = useUpdateSettings<
    AccessHistoryExportCheckResponse,
    Omit<AccessHistoryExportResponse, 'success'> | null
  >(apiURL.history.exportCheck, {
    onSuccess: (exportCheck) => {
      if (exportCheck && exportCheck.success) {
        const params = {
          time: exportCheck.time,
          count: exportCheck.count,
          page: exportCheck.page,
          lang: exportCheck.lang,
          cn: exportCheck.cn,
          total: exportCheck.total,
          keyword: exportCheck.keyword,
          from: exportCheck.from || '',
          to: exportCheck.to || '',
        };
        setParamsExportCheck(params);

        const nPercent = Number(exportCheck.percent);
        setExportProgress((prev) => (prev >= nPercent ? prev + 1 : nPercent));
      }
    },
  });

  useEffect(() => {
    exportExcel({
      page: 1,
      limit: 5000,
      total: false,
      count: 0,
      keyword: keyword ? keyword : undefined,
    });
  }, []);

  useEffect(() => {
    let checkTimeout = null;
    if (exportProgress > 0 && exportProgress < 100) {
      checkTimeout = setTimeout(() => {
        exportCheck(paramsExportCheck);
      }, 3000);
    }

    return () => checkTimeout! && clearTimeout(checkTimeout);
  }, [exportProgress]);

  const handleExportDownload = () => {
    var url = [
      getGroupwareUrl(),
      'admin',
      'messenger',
      'history_export_file?count=' + paramsExportCheck!.count + '&time=' + paramsExportCheck!.time,
    ].join('/');
    console.log('url:', url);
    window.open(url, '_blank');
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      header={<>{t('sms_fax_default_process_msg')}</>}
      body={
        <div className='py-2'>
          <Progress value={exportProgress} />
        </div>
      }
      footer={
        <div className='w-full flex justify-between items-center'>
          <Button
            size={'sm'}
            variant={'primary'}
            className='px-3 '
            onClick={handleExportDownload}
            disabled={exportProgress < 100}
          >
            <FileDown /> {t('approval_org2_btnExport')}
          </Button>
          <Button size={'sm'} variant={'outline'} className='w-20 px-3 ' onClick={onClose}>
            {t('common_close_msg')}
          </Button>
        </div>
      }
    />
  );
};

export default ExportModal;
