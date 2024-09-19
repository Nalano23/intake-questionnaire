export interface QuestionWithAnswers {
    id: number;
    answers: string[] | string;
    options: string[] | string;
    question: string;
    type: string;
    priority: number;
}