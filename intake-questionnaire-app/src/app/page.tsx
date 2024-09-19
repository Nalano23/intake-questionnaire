"use client";

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
              <h2 className="text-2xl font-bold mb-4 text-center">Intake Questionnaire</h2>
              <p className="text-gray-600 mb-4 text-center">
                  Please log in to continue.
              </p>
              <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                  Login
              </button>
          </div>
      </div>   
  );
}