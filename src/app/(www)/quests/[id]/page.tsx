'use client';

import { useEffect, useState } from 'react';
import { getData } from '@/actions/requests';
import Image from 'next/image';
import { Quest } from '@/interfaces/quest.type';
import Modal from '@/components/Modal/Modal';

export default function AllQuests({ params: { id } }: { params: { id: string } }) {
  const [data, setData] = useState<Quest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(+id);
        setData(data);
      } catch (error) {
        console.error('Error fetching quest data:', error);
      }
    };
    fetchData();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {data && (
        <section
          style={{ backgroundImage: `url("/${data.coverImg}")`, height: '100vh', width: '100%' }}
          className={`bg-no-repeat bg-center bg-cover relative text-white`}
        >
          <div className='absolute top-10 right-10 bg-transparent'>
            <p className='text-orange-500 bg-transparent'>{data.type}</p>
            <p className='font-black text-4xl bg-transparent mt-2'>{data.title}</p>
            <div className='flex justify-start items-center bg-transparent mt-8'>
              <div className='flex justify-center items-center gap-1 bg-transparent'>
                <Image
                  src='/assets/img/icon-clock.svg'
                  width={24}
                  height={24}
                  alt='icon-clock'
                  className='bg-transparent'
                />
                <p className='bg-transparent'>{data.duration} мин</p>
              </div>
              <div className='h-7 w-[1px] bg-slate-200 ml-6 mr-6'></div>
              <div className='flex justify-center items-center gap-1 bg-transparent'>
                <Image
                  src='/assets/img/icon-person.svg'
                  width={19}
                  height={24}
                  alt='icon-person'
                  className='bg-transparent'
                />
                <p className='bg-transparent'>
                  {data.peopleCount.toString().replace(',', '-')} чел
                </p>
              </div>
              <div className='h-7 w-[1px] bg-slate-200 ml-6 mr-6'></div>
              <div className='flex justify-center items-center gap-1 bg-transparent'>
                <Image
                  src='/assets/img/icon-puzzle.svg'
                  width={24}
                  height={24}
                  alt='icon-puzzle'
                  className='bg-transparent'
                />
                <p className='bg-transparent'>{data.level}</p>
              </div>
            </div>
            <p className='max-w-[520px] bg-transparent mt-5'>{data.description}</p>
            <button
              onClick={openModal}
              className='bg-orange-500 py-[22px] px-[48px] font-extrabold text-lg cursor-pointer border-none outline-none rounded-3xl mt-10'
            >
              ЗАБРОНИРОВАТЬ
            </button>
          </div>
        </section>
      )}
      {isModalOpen && <Modal />}
    </>
  );
}
