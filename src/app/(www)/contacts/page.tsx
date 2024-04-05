export default function Contacts() {
  return (
    <div>
      <div className='flex flex-col mb-12 pb-8 border-b'>
        <h1 className='text-orange-500'>квесты в Санкт-Петербурге</h1>
        <p className='font-extrabold text-6xl text-white pt-[5px]'>Контакты</p>
      </div>
      <div className='flex justify-between text-white'>
        <div>
          <p className='mb-2 font-bold'>Адрес</p>
          <p className='mb-9 max-w-[240px]'>Санкт-Петербург, Набережная реки Карповка, д 5П</p>
          <p className='mb-2 font-bold'>Режим работы</p>
          <p className='mb-9'>Ежедневно, с 9:00 до 20:00</p>
          <p className='mb-2 font-bold'>Телефон</p>
          <p className='mb-9'>8 (800) 333-55-99</p>
          <p className='mb-2 font-bold'>E-mail</p>
          <p>info@escape-room.ru</p>
        </div>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1996.8149404454682!2d30.31413916921211!3d59.968393173316784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696315364b82ea1%3A0x243abeee009a2286!2zUHNoYXZlbGkg0KXQuNC90LrQsNC70Lgt0LHQsNGA!5e0!3m2!1sru!2sua!4v1711283262218!5m2!1sru!2sua'
          width='649'
          height='336'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  );
}
