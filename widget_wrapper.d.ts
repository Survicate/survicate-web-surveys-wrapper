import type { ConfigModel, Survicate } from './types';

declare enum AppearMethod {
  immediately = 'immediately',
  delayed = 'delayed',
  exitIntent = 'exitIntent',
  scroll = 'onScroll'
}
declare enum ApiEvent {
  questionAnswered = 'question_answered',
  surveyDisplayed = 'survey_displayed',
  surveyCompleted = 'survey_completed',
  surveyClosed = 'survey_closed'
}
declare const getSurvicateInstance: () => Survicate | null;
declare const initSurvicate: (config: ConfigModel) => Promise<void>;
export { ApiEvent, AppearMethod, getSurvicateInstance, initSurvicate };
