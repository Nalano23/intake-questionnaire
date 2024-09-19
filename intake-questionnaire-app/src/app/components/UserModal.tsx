import React from 'react';
import { UserData } from '@/models/user-data';
import { Questionnaires } from '@/models/questionnaire-full-details';

interface Props {
  user: UserData | null;
  questionnaires: Questionnaires;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ user, questionnaires, onClose }) => {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 max-h-[80vh] overflow-auto my-8">
        <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold">User Details</h2>
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <div>
            <p className="text-lg font-bold">ID: {user.id}</p>
          </div>
          <div>
            <p className="text-lg font-bold">Username: {user.username}</p>
          </div>
        </div>
        {Object.keys(questionnaires).length > 0 ? (
          <div>
            {Object.entries(questionnaires).map(([questionnaireName, questions]) => (
              <div key={questionnaireName} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">{questionnaireName}</h3>
                <ul>
                  {Object.entries(questions).map(([questionId, { question, answers }]) => (
                    <li key={questionId} className="mb-2 p-4 border-b last:border-b-0">
                      <p><strong>Question:</strong> {question}</p>
                      <p><strong>Answers:</strong> {JSON.stringify(answers)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div>User has no questionnaires completed.</div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
