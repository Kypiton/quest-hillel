import React, { useState, ChangeEvent, FormEvent } from 'react';
import { postData } from '@/actions/requests';
import { z } from 'zod';

interface FormData {
  name: string;
  phone: string;
  peopleCount: number;
  isLegal: boolean;
}

const BookingSchema = z.object({
  name: z
    .string({ required_error: 'Обязательное поле' })
    .min(4, { message: 'Должно быть больше 3 символов' })
    .max(16, { message: 'Должно быть не больше 16 символов' }),
  phone: z.string({ required_error: 'Обязательное поле' }),
  peopleCount: z.number(),
  isLegal: z.boolean().optional(),
});

const Modal: React.FC = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    peopleCount: +'',
    isLegal: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleToggle = () => {
    setToggle(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      const newValue = name === 'peopleCount' ? Number(value) : value;
      setFormData({ ...formData, [name]: newValue });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await BookingSchema.parseAsync(formData);
      await postData(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    !toggle && (
      <div className='fixed z-50 top-0 flex justify-center items-center min-w-full min-h-full bg-black bg-opacity-80 text-white'>
        <div className='relative'>
          <span onClick={handleToggle} className='absolute top-0 right-4 cursor-pointer'>
            &times;
          </span>
          <h2 className='p-4'>Форма бронирования</h2>
          <form onSubmit={handleSubmit}>
            <div className='p-4'>
              <label htmlFor='name'>Ваше Имя:</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={`border-red-700 rounded ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <div className='text-red-500'>{errors.name}</div>}
            </div>
            <div className='p-4'>
              <label htmlFor='phone'>Контактный телефон:</label>
              <input
                type='text'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleChange}
                className={`border-red-700 rounded ${errors.phone ? 'border-red-500' : ''}`}
              />
              {errors.phone && <div className='text-red-500'>{errors.phone}</div>}
            </div>
            <div className='p-4'>
              <label htmlFor='peopleCount'>Количество участников:</label>
              <input
                type='number'
                id='peopleCount'
                name='peopleCount'
                value={formData.peopleCount}
                onChange={handleChange}
                className={`border-red-700 rounded ${errors.peopleCount ? 'border-red-500' : ''}`}
              />
              {errors.peopleCount && <div className='text-red-500'>{errors.peopleCount}</div>}
            </div>
            <div className='p-4'>
              <label htmlFor='isLegal'>Подтвердить </label>
              <input
                type='checkbox'
                id='isLegal'
                name='isLegal'
                checked={formData.isLegal}
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='p-4 bg-slate-300 rounded ml-24'>
              Отправить заявку
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default Modal;
