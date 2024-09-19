"use client";

import { UserData } from '@/models/user-data';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UserModal from '../components/UserModal';
import { UserAnswers } from '@/models/user-answers';


const Admin = () => {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<UserAnswers | null>(null);
  
  useEffect(() => {
    const user = localStorage.getItem('admin');
    const parsedUser = user ? JSON.parse(user) : null;
    const isAuthed = !!parsedUser;

    if (!isAuthed) {
      alert("You are not logged in or you are not an admin.");
      router.push('/login');
    }

    handleRefresh();
  }, [router]);

  const handleRefresh = async () => {
    try {
      const response = await fetch(`/api/admin?role=user`, { cache: 'no-store' });
      if (response.status !== 200) {
        throw new Error('Network response not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Failed to fetch users');
    }
  }
  // Handle modal for specified user
  const handleUserClick = async (user: UserData) => {
    setSelectedUser(user);
    try {
      const response = await fetch(`/api/admin/${user.id}`);
      if (response.ok) {
        const data: UserAnswers = await response.json();
        setModalData(data);
      } else {
        console.error('Failed to fetch user details');
      }
    } catch (error) {
      console.error('Failed to fetch questionnaires', error);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setModalData(null);
  };

  return (
    <>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button 
              onClick={handleRefresh} 
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Refresh
            </button>
          </div>
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Questionnaires Completed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleUserClick(user)}> 
                          {user.username}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.questionnaires_completed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h1 className="text-center text-gray-500">Loading...</h1>
          )}
        </div>
      </div>
  
      {isModalOpen && selectedUser && modalData && (
        <UserModal user={selectedUser} questionnaires={modalData.questionnaires} onClose={handleCloseModal} />
      )}
    </>
  );
  
};

export default Admin;
