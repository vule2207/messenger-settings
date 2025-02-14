import { orgConfig } from '@/constants';
import { DepartmentType } from '@/types';
import { BaseResponse } from '@/types/api';
import { Users } from 'lucide-react';
import { Tree, TreeEventNodeEvent } from 'primereact/tree';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Loader from '../Loader';
import SearchInput from '../SearchInput';
import './styles.css';
import { useGetOrgExpandData } from '@/hooks/useGetOrgData';
import { isEmpty } from 'lodash';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import 'primeicons/primeicons.css';

interface OrgTreeProps {}

const OrgTree = () => {
  const { t } = useTranslation();
  const [orgList, setOrgList] = useState<DepartmentType[]>([]);
  const [keyword, setKeyword] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { data, isLoading, refetch } = orgConfig.init.api<BaseResponse<DepartmentType[]>>(orgConfig.init.getParams({ keyword }), { enabled: false });

  const { mutate } = useGetOrgExpandData();

  useEffect(() => {
    if (data && data.success && data.rows) {
      setOrgList(orgConfig.init.getValues(data.rows));
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [keyword]);

  const loadOnExpand = (event: TreeEventNodeEvent) => {
    if (!isEmpty(event.node.children)) return;
    mutate(orgConfig.expand.getParams({ idURL: event.node.key }), {
      onSuccess: (data) => {
        const updateNodeChildren = (nodes: any, nodeKey: string, children: DepartmentType[]) => {
          return nodes.map((node: any) => {
            if (node.key === nodeKey) {
              return { ...node, children };
            } else if (node.children) {
              return { ...node, children: updateNodeChildren(node.children as DepartmentType[], nodeKey, children) };
            }
            return node;
          });
        };
        setOrgList((prevNodes) => updateNodeChildren(prevNodes, event.node.key as string, orgConfig.expand.getValues(data.rows)));
      },
    });
  };

  const Row = ({ index, style }: ListChildComponentProps) => <div style={style}></div>;

  return (
    <div className='w-full h-full bg-white border rounded-2xl overflow-hidden flex flex-col !text-sm'>
      <div className='px-4 h-[50px] bg-slate-700 text-white items-center flex gap-2 font-semibold'>
        <Users />
        {t('hr_org_tree')}
      </div>
      <div className='p-4 flex flex-col gap-3 h-[calc(100%-50px)] max-h-[705px]'>
        <SearchInput fullWidth isSearchByEnter onChange={(val) => setKeyword(val)} />
        <div className='h-full overflow-y-auto'>
          {isLoading ? (
            <Loader />
          ) : (
            <Tree
              className='w-full h-full p-0'
              value={orgList}
              expandedKeys={{ '0_0': true }}
              onExpand={loadOnExpand}
              selectionMode='checkbox'
              selectionKeys={selectedItem}
              onSelectionChange={(e) => {
                console.log('e:', e);
                setSelectedItem(e.value);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgTree;
