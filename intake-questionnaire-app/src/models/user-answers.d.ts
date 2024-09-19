import { Questionnaires } from "./questionnaire-full-details";
import { QuestionnaireQuestions } from "./questionnaire-questions";

export interface UserAnswers {
    user_id: number;
    questionnaires: Questionnaires
}