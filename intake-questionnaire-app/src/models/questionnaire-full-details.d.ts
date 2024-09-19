export interface QuestionDetail {
    question: string;
    answers: string[] | string;
  }
  
export interface Questionnaires {
    [key: string]: {
        [questionId: number]: QuestionDetail;
    };
  }