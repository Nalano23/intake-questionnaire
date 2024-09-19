import React from 'react';

interface Props {
    question: {
        id: number;
        question: string;
        options: string[];
    };
    selectedOptions: string[];
    onOptionChange: (option: string) => void;
}

const QuestionCardMCQ: React.FC<Props> = ({question, selectedOptions, onOptionChange}:Props) => {
    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3">{question.question}</h2>
            <div className="space-y-2">
                {question.options.map(option => (
                    <div
                        key={option}
                        onClick={() => onOptionChange(option)}
                        className={`cursor-pointer p-3 rounded-lg border 
                            ${selectedOptions.includes(option) ? 
                                'bg-blue-100 border-blue-500 text-blue-600' : 
                                'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionCardMCQ;
