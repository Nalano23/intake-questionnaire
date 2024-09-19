"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('admin');
    setIsAdmin(!!adminStatus);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAdmin(false); // Update the state to reflect the logout
    router.push('/');
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/questionnaires" className="text-white hover:underline">
            Questionnaires
          </Link>
        </li>
      </ul>
      <div className="flex space-x-4">
        {isAdmin && (
          <Link href="/admin" className="text-white hover:underline">
            Admin
          </Link>
        )}
        <button
          className="text-white hover:underline"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
        <button
          className="text-white hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
