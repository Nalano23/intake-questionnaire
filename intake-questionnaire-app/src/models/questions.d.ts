export interface Question {
    id: number;
    type: string;
    question: string;
    options: string[];
    priority: number;
}