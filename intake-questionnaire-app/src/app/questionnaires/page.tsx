"use client";

import { useEffect, useState } from 'react';
import { Questionnaire } from '../../models/questionnaire';
import { useRouter } from 'next/navigation';

const Questionnaires = () => {
  const router = useRouter();
  const [questionnaires, setQuestionaires] = useState<Questionnaire[]>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = user ? JSON.parse(user) : null;
    const isAuthed = !!parsedUser;

    if (!isAuthed) {
      alert("You are not logged in.");
      router.push('/login');
    }

    const questionnairesPull = async () => {
      try {
         const response = await fetch(`/api/questionnaires?userId=${parsedUser.id}`);
        if (response.status != 200) {
          throw new Error('Bad network response');
        }
        const data : Questionnaire[] = await response.json();
        setQuestionaires(data);
      } catch (error) {
        setError('Error fetching data');
      }
    };
    questionnairesPull();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pt-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Select a Questionnaire</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {questionnaires ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionnaires.map((questionnaire) => (
              <div
                key={questionnaire.id}
                className={`bg-white shadow-lg rounded-lg p-6 border ${!questionnaire.completed ? 'hover:shadow-xl' : 'opacity-50 cursor-not-allowed'}`}
              >
                <h2 className="text-xl font-semibold mb-2">
                  {questionnaire.name}
                </h2>
                <p className={`text-gray-700 mb-4 ${!questionnaire.completed ? '' : 'line-through text-gray-500'}`}>
                  {questionnaire.completed ? 'Completed' : 'Not Completed'}
                </p>
                <a
                  href={!questionnaire.completed ? `/questionnaires/${questionnaire.id}` : '#'}
                  className={`block text-blue-500 font-medium ${!questionnaire.completed ? 'underline hover:text-blue-600' : 'text-gray-500'}`}
                  style={{
                    pointerEvents: !questionnaire.completed ? 'auto' : 'none',
                  }}
                >
                  {!questionnaire.completed && 'Start Questionnaire'}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Questionnaires
