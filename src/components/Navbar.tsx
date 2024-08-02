import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/auth';
import UserAccountnav from './ui/UserAccountnav';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  
  return (
    <>
      <div className='bg-gray-200 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0'>
        <div className='container mx-auto flex items-center justify-between px-4'>
          <div className='flex items-center space-x-4'>
            <Link href='/'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqm3Jvgu8Ezx9afkct9-9str9sYEFgwCuWC6l30tyF24bvp8yY3mIs2etNhbqfYL3XGYI&usqp=CAU' alt='Logo' className='h-8 w-auto' />
            </Link>
            <Link href='/admin'>
              Home
            </Link>
            <Link href='/buyer'>
              Buyer
            </Link>
            <Link href='/seller'>
              Seller
            </Link>
            <Link href='/checkout'>
              Checkout
            </Link>
            <Link href='/profile'>
              Profile
            </Link>
          </div>
          {session?.user ? (
            <UserAccountnav />
          ) : (
            <Link className={buttonVariants()} href='/sign-in'>
              Sign in
            </Link>
          )}
        </div>
      </div>
      {/* This div acts as a spacer for content below the fixed Navbar */}
      <div className='pt-[heightOfNavbar]'></div>
    </>
  );
};

export default Navbar;