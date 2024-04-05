import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='py-[24px] px-[32px] flex items-center justify-start gap-2'>
      <Image src={'/assets/img/icon-vk-default.svg'} width={28} height={28} alt='vk-icon' />
      <Image
        src={'/assets/img/icon-instagram-default.svg'}
        width={28}
        height={28}
        alt='instagram-icon'
      />
    </footer>
  );
}
