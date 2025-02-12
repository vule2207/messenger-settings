import CardSection from '@/components/CardSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { timeOptions, typograhyClass } from '@/constants';
import { TimeSettingsResponseType } from '@/types';
import clsx from 'clsx';
import { Megaphone, Save } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

interface OptionSelectProps {
  note: string;
  data: TimeSettingsResponseType;
  isUpdating: boolean;
  onSave: () => void;
  onChange: Dispatch<SetStateAction<TimeSettingsResponseType>>;
}

const OptionSelect = ({ data, onSave, note, onChange, isUpdating }: OptionSelectProps) => {
  const { t } = useTranslation();
  return (
    <>
      <CardSection
        content={
          <div className='mt-5 flex flex-col gap-4'>
            <div className='flex gap-1.5 items-center p-2 border border-slate-200 rounded-md bg-slate-50'>
              <Megaphone className={typograhyClass.secondaryText} />
              <span
                className={typograhyClass.secondaryText}
                dangerouslySetInnerHTML={{ __html: note }}
              ></span>
            </div>

            <RadioGroup className='' value={data.checktype}>
              {timeOptions.map((time) => (
                <div className='grid grid-cols-1 sm:grid-cols-12 items-center' key={time.value}>
                  <div
                    className={clsx('sm:col-span-3 flex gap-2 items-center', {
                      'h-10': time.isTime && data.checktype,
                    })}
                  >
                    <RadioGroupItem
                      value={time.value}
                      id={time.value}
                      onClick={() => onChange({ value: data.value, checktype: time.value })}
                    />
                    <Label className='cursor-pointer' htmlFor={time.value}>
                      {t(time.label)}
                    </Label>
                  </div>

                  {time.isTime && data.checktype === '1' && (
                    <Input
                      className='sm:col-span-3 w-auto'
                      value={data.value}
                      type='number'
                      onChange={(e) => {
                        onChange({ ...data, value: e.target.value });
                      }}
                    />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        }
        footer={
          <Button onClick={onSave} disabled={isUpdating}>
            <Save /> {t('admin_save_msg')}
          </Button>
        }
      />
    </>
  );
};

export default OptionSelect;
