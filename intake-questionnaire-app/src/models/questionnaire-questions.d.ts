export interface QuestionnaireQuestions {
    question_id: number;
    question: string;
    answers: string[] | string;
}

export interface QuestionnaireAnswers {
    questionId: number;
    answers: string[] | string;
}