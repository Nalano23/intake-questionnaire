import React, { ChangeEvent } from 'react';

interface Props {
    question: {
        id: number;
        question: string;
    };
    inputValue: string;
    onInputChange: (value: string) => void;
}

const QuestionCardInput: React.FC<Props> = ({ question, inputValue, onInputChange }) => {
    return (
        <div className="border p-4 rounded-md shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2">{question.question}</h2>
            <input
                type="text"
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Type your answer here"
            />
        </div>
    );
};

export default QuestionCardInput;
