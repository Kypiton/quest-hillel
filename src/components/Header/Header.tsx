import { navs } from '@/mock/data';
import Image from 'next/image';
import Link from 'next/link';
import Login from '../Login/Login';

export default function Header() {
  return (
    <header className='py-[24px] px-[32px] text-slate-100 flex items-center justify-between'>
      <Link href='/quests'>
        <Image src='/assets/img/logo.svg' width={134} height={50} alt='Logo' />
      </Link>
      <ul className='flex items-center gap-[47px]'>
        {navs.map(nav => (
          <li key={nav.id} className='hover:text-orange-500'>
            <Link href={`/${nav.nameEn}`}>{nav.nameRu}</Link>
          </li>
        ))}
      </ul>
      <Login />
    </header>
  );
}
