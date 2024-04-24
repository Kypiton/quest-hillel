import { redirect } from 'next/navigation';
import { getSession, login, logout } from '../../../lib';

export default async function Login() {
  const session = await getSession();
  return (
    <section className='flex items-center gap-2 text-white'>
      <form
        action={async formData => {
          'use server';
          await login(formData);
          redirect('/quests');
        }}
      >
        <input type='email' placeholder='Email' />
        <br />
        <button type='submit'>Login</button>
      </form>
      <form
        action={async () => {
          'use server';
          await logout();
          redirect('/login');
        }}
      >
        <button type='submit'>Logout</button>
      </form>
    </section>
  );
}
