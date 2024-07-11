import { Button } from '@radix-ui/themes';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='h-screen flex flex-col justify-center items-center'>
      <div className='relative z-10 text-center p-6 bg-white bg-opacity-20 rounded-lg shadow-lg'>
        <h1 className='text-5xl font-bold text-white mb-6'>Welcome to Our Issue Tracker</h1>
        <p className='text-xl text-white mb-12'>Track and manage all your project issues in one place</p>
        <Button asChild>
          <Link href='/issues/new'>New Issues</Link>
        </Button>
      </div>
    </main>
  );
}
