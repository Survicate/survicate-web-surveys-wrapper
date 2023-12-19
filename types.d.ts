import type { ApiEvent, AppearMethod } from './widget_wrapper';

export interface ConfigModel {
	workspaceKey: string;
	traits?: {
	[key: string]: string;
	};
	disableTargeting?: true;
}

export interface ShowSurveyOptions {
	forceDisplay?: true;
	displayMethod?: AppearMethod;
	displayOptions?: {
	delay?: number;
	scrolledPercentage?: number;
	};
}

export interface VisitorAttributes {
	[key: string]: string | number | boolean | Date;
}

export type CallbackType = (surveyId: string, answer?: unknown) => void;
export type QuestionAnsweredCallback = (surveyId: string, questionId: number, answer: unknown) => void;

export type CallbackTypes = CallbackType | QuestionAnsweredCallback;
export declare class Survicate {
	constructor(config: ConfigModel);
	private initScript;
	private loadScript;
	ready(): Promise<void>;
	showSurvey(id: string, options?: ShowSurveyOptions): boolean;
	getSurvey(): {
			id: string | null;
			name: string | null;
	};
	retarget(): void;
	getVisitorId(): string;
	setVisitorTraits(attributes: VisitorAttributes): void;
	destroyVisitor(callback?: () => void): void;
	addEventListener(event: ApiEvent, callback: CallbackTypes): number | void;
	removeEventListener(eventId: number | ApiEvent): void;
	invokeEvent: (eventName: string, eventProperties?: Record<string, any>) => void;
}
