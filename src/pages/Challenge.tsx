import {useState} from 'react';
import {redirect} from 'react-router-dom';

import Button from '../components/Button';
import TabItem from '../components/TabItem';
import Tabs from '../components/Tabs';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

import {TAB_ITEMS} from '../util/viewData';
import {limitCheckLogin} from '../util/login';

type CahllengeTabsProps = {
  tabIndex: string;
  onSelect: (index: string) => void;
};

const CahllengeTabs = ({tabIndex, onSelect}: CahllengeTabsProps) => {
  return (
    <Tabs className='flex w-full max-w-[90rem] mx-auto mt-3'>
      {TAB_ITEMS.map((item) => (
        <TabItem
          key={item.id}
          onSelect={() => onSelect(item.id)}
          selectCounter={0}
          isSelectTabs={item.id === tabIndex}
        >
          {item.label}
        </TabItem>
      ))}
      <Button
        className='min-w-20 mx-1 h-11 bg-red-500 hover:bg-red-600'
        type='button'
        mode='fill'
      >
        생성
      </Button>
    </Tabs>
  );
};

type ChallengeModalProps = {
  type: 'create' | 'edit';
  onClose: () => void;
};

const ChallengeModal = ({type, onClose}: ChallengeModalProps) => {
  return (
    <Modal
      title={`${type === 'create' ? 'Create Challenge' : 'Edit Challenge'}`}
      onClose={onClose}
      className='bg-rose-100'
    >
      <h2 className='m-2'>
        {type === 'create'
          ? '도전할 내용을 작성해 주세요.'
          : '수정하실 내용이 있나요?'}
      </h2>
      <form>
        <Input className='mb-2' type='text' id='title' content='제목' />
        <Textarea className='mb-2' id='description' content='설명' />
        <Input
          className='mb-2'
          type='datetime-local'
          id='startDate'
          content='시작일자'
        />
        <Input
          className='mb-2'
          type='datetime-local'
          id='endDate'
          content='종료일자'
        />
        <div className='flex gap-2 justify-end'>
          <Button
            className='bg-rose-400 hover:bg-rose-500'
            type='submit'
            mode='fill'
          >
            {type === 'create' ? '생성' : '수정'}
          </Button>
          <Button
            className='bg-indigo-400 hover:bg-indigo-500'
            type='button'
            mode='fill'
            onClick={onClose}
          >
            닫기
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const Challenge = () => {
  const [tabIndex, setTabIndex] = useState<string>('challenge');
  const [modalOpen, setModalOpen] = useState(false);

  const handleTabsClick = (index: string) => {
    setTabIndex(index);
  };
  const handleModalClose = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <main className='pt-12'>
      {modalOpen && (
        <ChallengeModal type={`create`} onClose={handleModalClose} />
      )}
      <CahllengeTabs tabIndex={tabIndex} onSelect={handleTabsClick} />
      <div className='w-[40rem] my-2 h-10 bg-black mx-auto'></div>
    </main>
  );
};

export default Challenge;

// eslint-disable-next-line react-refresh/only-export-components
export const loader = () => {
  const path = limitCheckLogin('challenge');
  if (path) return redirect(path);
  return path;
};
