'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getData } from '@/actions/requests';
import { tabs } from '@/mock/data';
import { Quest } from '@/interfaces/quest.type';

export default function Quests() {
  const [selectedType, setSelectedType] = useState<string>('allquests');
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setQuests(data);
      } catch (error) {
        console.error('Error fetching quest data:', error);
      }
    };
    fetchData();
  }, []);

  const handleTabClick = (type: string) => {
    setSelectedType(type);
  };

  const filteredQuests =
    selectedType !== 'allquests' ? quests.filter(quest => quest.type === selectedType) : quests;

  return (
    <>
      <p className='text-orange-500'>квесты в Санкт-Петербурге</p>
      <h1 className='font-extrabold text-6xl text-white pt-[5px]'>Выберите тематику</h1>
      <ul className='flex items-center justify-between font-bold text-sm text-white pt-[48px]'>
        {tabs.map((tab, index) => (
          <li key={tab.id} className='flex items-center justify-center gap-3'>
            <Image src={tab.path} alt='icons' width={tab.width} height={tab.height} />
            <button
              onClick={() => handleTabClick(tab.nameEn)}
              style={{
                color: selectedType === tab.nameEn ? 'orange' : '',
              }}
              className='hover:decoration-orange-500 hover:underline hover:decoration-4 hover:underline-offset-4'
            >
              {tab.nameRu}
            </button>
            {index !== tabs.length - 1 && <span className='w-[1px] h-10 bg-slate-50 ml-9'></span>}
          </li>
        ))}
      </ul>
      <div className='grid grid-cols-3 gap-5 mt-10'>
        {filteredQuests?.map((item: Quest) => (
          <Link href={`/quests/${item.id}`} key={item.id} className='relative cursor-pointer'>
            <Image src={`/${item.previewImg}`} width={344} height={232} alt={item.title} />
            <div className='absolute bottom-0 left-0 bg-transparent p-5'>
              <p className='text-white font-bold text-2xl bg-transparent'>{item.title}</p>
              <div className='flex items-center justify-start gap-[23px] mt-4 bg-transparent'>
                <div className='flex items-center justify-start gap-2 bg-transparent'>
                  <Image
                    src='/assets/img/icon-person.svg'
                    width={13}
                    height={16}
                    alt='Icon person'
                    className='bg-transparent'
                  />
                  <p className='text-white bg-transparent'>
                    {item.peopleCount.toString().replace(',', '-')} чел
                  </p>
                </div>
                <div className='flex items-center justify-start gap-2 bg-transparent'>
                  <Image
                    src='/assets/img/icon-puzzle.svg'
                    width={16}
                    height={16}
                    alt='Icon puzzle'
                    className='bg-transparent'
                  />
                  <p className='text-white bg-transparent'>{item.level}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}