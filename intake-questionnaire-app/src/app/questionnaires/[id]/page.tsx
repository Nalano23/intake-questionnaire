"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/models/questions';
import QuestionCardInput from '@/app/components/QuestionCardInput';
import QuestionCardMCQ from '@/app/components/QuestionCardMCQ';

interface Props {
    params: { id: string };
}

const QuestionnaireDetails = ({ params }: Props) => {
    const router = useRouter();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: number]: string[] | string }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        const parsedUser = user ? JSON.parse(user) : null;
        const isAuthed = !!parsedUser;

        if (!isAuthed) {
            alert("You are not logged in.");
            router.push('/login');
        }

        const fetchQuestions = async () => {
            try {
                const response = await fetch(`/api/questionnaires/${params.id}?userId=${parsedUser.id}`);
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Populate the questions and answers (if present)
                setQuestions(data.questions);

                const answersData: { [key: number]: string[] | string } = {};
                data.questions.forEach((question: any) => {
                    if (question.answers) {
                        answersData[question.id] = question.answers;
                    }
                });

                setAnswers(answersData);

            } catch (error) {
                setError('Failed to fetch questionnaire details');
                console.error('Fetch error:', error);
            }
        };
        fetchQuestions();
    }, []); 

    // Handle MCQ Question Changes
    const handleOptionChange = (questionId: number, option: string) => {
        setAnswers((prevAnswers) => {
            const currentAnswer = prevAnswers[questionId];
            if (Array.isArray(currentAnswer)) {

                // "Deselect option" by removing
                if (currentAnswer.includes(option)) {
                    const updatedOptions = currentAnswer.filter((o) => o !== option);
                    return {
                        ...prevAnswers,
                        [questionId]: updatedOptions,
                    };
                }
    
                // "Select option" by adding
                const updatedOptions = [...currentAnswer, option];
                return {
                    ...prevAnswers,
                    [questionId]: updatedOptions,
                };
            }

            return {
                ...prevAnswers,
                [questionId]: [option],
            };
        });
    };
    

    // Handle Input Questions Changes
    const handleInputChange = (questionId: number, inputVal: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: inputVal
        }));
    };

    // Handle POST for submitting questionnaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let hasError = false;
        const formattedAnswers = questions.map((question) => {
            const answer = answers[question.id];
    
            // Input Validation: Input cannot be empty or whitespace
            if (question.type === 'input' && (!answer || (typeof answer === 'string' && answer.trim() === ''))) {
                setError(`Answer for question "${question.question}" cannot be empty or just whitespace.`);
                hasError = true;
            }
    
            // Input Validation: One option must be seleted
            if (question.type === 'mcq' && (!answer || (Array.isArray(answer) && answer.length === 0))) {
                setError(`Please select at least one option for question "${question.question}".`);
                hasError = true;
            }
    
            // Return questionId and either answer as empty (not previously answered) or pre-populated
            return {
                questionId: question.id,
                answers: answer || (question.type === 'mcq' ? [] : '')
            };
        });

        // Validation before attempting submission
        if (hasError) {
            return;
        }
    
        const storedUser = localStorage.getItem('user');
        const user = JSON.parse(storedUser);
    
        try {
            const response = await fetch(`/api/questionnaires/${params.id}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id, // Send user ID from localStorage
                    answers: formattedAnswers
                }),
            });
            router.push('/questionnaires');
        } catch (error) {
            setError('Failed to submit answers');
            console.error('Submit error:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                {questions.length > 0 ? (
                    <div>
                        {questions.map((question) => {
                            if (question.type === 'mcq') {
                                return (
                                    <QuestionCardMCQ
                                        key={question.id}
                                        question={question}
                                        selectedOptions={Array.isArray(answers[question.id])
                                            ? answers[question.id] as string[] // Ensure it's an array
                                            : []}
                                        onOptionChange={(option) => handleOptionChange(question.id, option)}
                                    />
                                );
                            }
            
                            if (question.type === 'input') {
                                return (
                                    <QuestionCardInput
                                        key={question.id}
                                        question={question}
                                        inputValue={typeof answers[question.id] === 'string'
                                            ? answers[question.id] as string  // Ensure it's a string
                                            : ''}
                                        onInputChange={(value) => handleInputChange(question.id, value)}
                                    />
                                );
                            }
                        })}
                        <button
                            type="submit"
                            className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Loading...</div>
                )}
            </form>
        </div>
    );
};

export default QuestionnaireDetails;