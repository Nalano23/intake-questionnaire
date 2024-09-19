import { Questionnaires } from "./questionnaire-full-details";

export interface UserAnswers {
    user_id: number;
    questionnaires: Questionnaires
}