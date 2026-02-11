
/**
 * @fileoverview Survicate Widget Wrapper Type Definitions
 *
 * This file contains TypeScript definitions for the Survicate Widget Wrapper,
 * which provides a simplified interface for initializing and managing Survicate
 * surveys in web applications. The wrapper handles script loading, initialization,
 * and provides access to the main Survicate SDK functionality.
 *
 * @see https://developers.survicate.com/javascript/methods/
 */

/**
 * Valid attribute value types that can be set for visitor traits
 * Please note that Date is serialized to ISO string
 */
type AttributeValue = string | number | boolean | Date;

/**
 * Callback function type for general survey events
 * @param surveyId - The unique identifier of the survey
 * @param answer - Optional answer data (for completion events)
 */
type CallbackType = (surveyId: string, answer?: unknown) => void;

/**
 * Callback function type for question answered events
 * @param surveyId - The unique identifier of the survey
 * @param questionId - The unique identifier of the question that was answered
 * @param answer - The answer data provided by the user
 */
type QuestionAnsweredCallback = (surveyId: string, questionId: number, answer: unknown) => void;

/**
 * Union type for all possible callback types
 */
export type CallbackTypes = CallbackType | QuestionAnsweredCallback;

/**
 * Enumeration of available survey types in Survicate
 */
export enum SurveyType {
  /** Website or in-product surveys */
  WidgetSurvey = 'WidgetSurvey',
  /** Email or shareable link surveys */
  PageSurvey = 'PageSurvey',
  /** Mobile app surveys */
  MobileSurvey = 'MobileSurvey',
  /** Feedback button survey */
  FeedbackButton = 'FeedbackButton',
  /** Intercom integrated surveys */
  IntercomSurvey = 'IntercomSurvey',
}

/**
 * Available methods for survey appearance
 */
export enum AppearMethod {
  /** Show survey immediately */
  immediately = 'immediately',
  /** Show survey after a delay */
  delayed = 'delayed',
  /** Show survey on exit intent (when user tries to leave) */
  exitIntent = 'exitIntent',
  /** Show survey when user scrolls to a certain point */
  scroll = 'onScroll',
}

/**
 * Available API events that can be listened to
 */
export enum ApiEvent {
  /** Fired when a user answers a question */
  questionAnswered = 'question_answered',
  /** Fired when a survey is displayed to the user */
  surveyDisplayed = 'survey_displayed',
  /** Fired when a survey is completed */
  surveyCompleted = 'survey_completed',
  /** Fired when a survey is closed without completion */
  surveyClosed = 'survey_closed',
}

/**
 * Available answer types for survey questions
 */
export enum SurveyQuestionAnswerType {
  /** Single choice question with radio buttons */
  single = 'single',
  /** Multiple choice question with checkboxes */
  multiple = 'multiple',
  /** Text input question for free-form responses */
  text = 'text',
  /** Smiley scale question for emotional feedback */
  smileyScale = 'smiley_scale',
  /** Date picker question */
  date = 'date',
  /** Rating question (stars, thumbs up/down, etc.) */
  rating = 'rating',
  /** Dropdown list question */
  dropdown = 'dropdown_list',
  /** Matrix question for multiple related questions */
  matrix = 'matrix',
  /** Ranking question for ordering preferences */
  ranking = 'ranking',
  /** Numerical scale question (1-10, etc.) */
  numericalScale = 'numerical_scale',
  /** Customer satisfaction question */
  customerSatisfaction = 'csat',
}

/**
 * NPS (Net Promoter Score) answer type
 */
export enum SurveyNpsAnswerType {
  /** Net Promoter Score question */
  nps = 'nps',
}

/**
 * CTA (Call to Action) answer types
 */
export enum SurveyCtaAnswerType {
  /** Next button */
  button = 'button_next',
  /** Thank you message */
  thankYouMessage = 'empty',
  /** Link button */
  buttonLink = 'button_link',
  /** Close button */
  buttonClose = 'button_close',
  /** Redirect with timeout */
  redirect = 'redirect_timeout',
  /** Social media CTA */
  social = 'social_cta',
}

/**
 * Interface for visitor attributes/traits
 * Allows setting custom properties for visitor identification and targeting
 */
export interface VisitorAttributes {
  [key: string]: AttributeValue;
}

/**
 * Configuration model for initializing the Survicate SDK
 *
 * @example
 * ```javascript
 * const config = {
 *   workspaceKey: 'your-workspace-key',
 *   traits: { user_id: '123', plan: 'premium' },
 *   disableTargeting: false,
 *   hiddenSurveys: ['survey-1', 'survey-2'],
 *   nonce: 'your-csp-nonce'
 * };
 * ```
 */
export interface ConfigModel {
  /** Disable targeting rules and show surveys to all visitors */
  disableTargeting?: true;
  /** Disable persistence of sensitive visitor data */
  disableSensitiveDataPersistence?: boolean;
  /** Force surveys to display in a specific language (IETF language tag, e.g., "en", "fr", "pt-BR") */
  forcedLanguage?: string;
  /** Force initial theme mode: "light", "dark", or "auto" (follow system). Same as setThemeMode() but applied on init */
  themeMode?: string;
  /** Array of survey IDs to hide from targeting */
  hiddenSurveys?: string[];
  /** Content Security Policy nonce for script injection */
  nonce?: string;
  /** Initial visitor traits/attributes to set */
  traits?: VisitorAttributes;
  /** Your Survicate workspace key that can be found here https://panel.survicate.com/o/0/w/0/settings/access-keys*/
  workspaceKey: string;
}

/**
 * Options for controlling how a survey is displayed
 */
export interface ShowSurveyOptions {
  /** Force display the survey regardless of targeting rules */
  forceDisplay?: true;
  /** Method used to display the survey */
  displayMethod?: AppearMethod;
  /** Additional display configuration options */
  displayOptions?: {
    /** Delay in seconds before showing the survey */
    delay?: number;
    /** Percentage of page scrolled before showing the survey */
    scrolledPercentage?: number;
  };
}

/**
 * Information about a survey point (question)
 *
 * This interface provides metadata about individual questions
 * within a survey.
 */
export interface SurveyPointInfo {
  /** Unique identifier of the survey point */
  pointId: number;
  /** Type of answer expected for this point */
  answerType: SurveyQuestionAnswerType | SurveyNpsAnswerType | SurveyCtaAnswerType;
  /** Available answer options (for choice-based questions) */
  answers?: Array<{ id: number }>;
}

/**
 * Main API interface for interacting with Survicate surveys
 */
export interface SurveyApi {
  /**
   * Add an event listener for survey events
   * @param event - The event type to listen for
   * @param callback - Function to call when the event occurs
   * @returns Event listener ID for removal
   */
  addEventListener: (event: ApiEvent, callback: CallbackTypes) => number | void;

  /**
   * Destroy the current visitor session and reset all data
   * @param callback - Optional callback to execute after destruction
   */
  destroyVisitor: (callback?: () => void) =>  Promise<void>;

  /** Disable targeting set in the Survicate panel */
  disableTargeting?: boolean;

  /** Whether sensitive data persistence is disabled */
  disableSensitiveDataPersistence?: boolean;

  /** Array of survey IDs to hide from targeting */
  hiddenSurveys?: string[];

  /**
   * Get the unique visitor ID for the specified survey type
   * @param surveyType - Optional survey type to get visitor ID for
   * @returns Unique visitor identifier
   */
  getVisitorId: (surveyType?: SurveyType) => string;

  /**
   * Get the response UUID for the current survey session
   *
   * This method returns the unique identifier for the current survey response.
   * When connectResponse is true:
   * - If an active survey exists with answers being collected, returns the survey's existing response UUID
   * - If no active survey exists, generates a new UUID (not stored)
   * When connectResponse is false or undefined, generates a new UUID each time.
   *
   * Note: The survey state response UUID is only available when there's already an active survey
   * with answers being collected. For programmatic submissions without an active survey,
   * you should generate a UUID once and reuse it across multiple submitAnswer calls.
   *
   * @example
   * ```javascript
   * // Safest way: Get response UUID after a question is answered (ensures active survey)
   * window._sva?.addEventListener('question_answered', function(surveyId, questionId) {
   *   if (surveyId === 'ab1791b79cacc6ba' && questionId === 1332422) {
   *     const responseUuid = window._sva?.getResponseUuid('WidgetSurvey', true);
   *
   *     window._sva?.submitAnswer(
   *       { surveyId: 'ab1791b79cacc6ba', pointId: 1332423, answer: 'this was submitted by API' },
   *       responseUuid
   *     );
   *   }
   * });
   * ```
   *
   * @param surveyType - The survey type (WidgetSurvey or FeedbackButton) to get the response UUID for
   * @param connectResponse - If true, returns existing response UUID from active survey, otherwise generates new UUID
   * @returns Response UUID string
   */
  getResponseUuid: (surveyType: SurveyType, connectResponse?: boolean) => string;

  /**
   * Get metadata about survey points (questions)
   *
   * This method returns information about all questions in a survey,
   * including their types and available answer options.
   *
   * @param surveyId - ID of the survey to get metadata for
   * @returns Array of survey point information or null if survey not found
   */
  getSurveyPointsMetadata: (surveyId: string) => SurveyPointInfo[] | null;

  /**
   * Invoke a custom event that can be used for targeting
   * @param eventName - Name of the custom event
   * @param eventProperties - Optional properties to attach to the event
   */
  invokeEvent: (eventName: string, eventProperties?: Record<string, string>) => void;

  /**
   * Remove an event listener
   * @param eventId - Event listener ID or event type to remove
   */
  removeEventListener: (eventId: number | ApiEvent) => void;

  /**
   * Re-evaluate targeting rules and show surveys if conditions are met
   */
  retarget: () => void;

  /**
   * Force the survey language to a specific IETF language tag
   *
   * This method overrides all automatic language detection methods (URL parameters,
   * path segments, TLD, and browser language). The language will be applied to all
   * surveys until explicitly changed or cleared.
   *
   * The argument must be a valid IETF language tag such as:
   * - A two-letter ISO 639 code (e.g., "en", "fr")
   * - A three-letter code for languages without the two-letter equivalent (e.g., "haw", "yue")
   * - A language tag with region (e.g., "en-US", "pt-BR")
   *
   * @param languageTag - IETF language tag to force for all surveys
   *
   * @example
   * ```javascript
   * // Force surveys to display in French
   * window._sva?.setSurveyLanguage('fr');
   *
   * // Force surveys to display in Brazilian Portuguese
   * window._sva?.setSurveyLanguage('pt-BR');
   * ```
   */
  setSurveyLanguage: (languageTag: string) => void;

  /**
   * Set the theme mode for displaying surveys
   *
   * This method allows you to control whether surveys use light or dark theme.
   * The mode can be set to "light" or "dark" (case-insensitive).
   * Note: "auto" mode is not available via API and is the default behavior.
   *
   * @param mode - Theme mode: "light" or "dark" (case-insensitive)
   *
   * @example
   * ```javascript
   * // Force surveys to use light theme
   * window._sva?.setThemeMode('light');
   *
   * // Force surveys to use dark theme
   * window._sva?.setThemeMode('dark');
   * ```
   */
  setThemeMode: (mode: string) => void;

  /**
   * Set visitor traits/attributes for targeting and identification
   * @param attributes - Object containing visitor attributes
   */
  setVisitorTraits: (attributes: VisitorAttributes) => void;

  /**
   * Manually trigger a survey to be displayed
   * @param id - Survey ID to display
   * @param options - Display options for the survey
   * @returns Whether the survey was successfully triggered
   */
  showSurvey: (id: string, options: ShowSurveyOptions) => boolean;

  /**
   * Submit an answer to a survey question programmatically
   *
   * This method allows you to submit answers to the following survey questions:
   * Text, Single, Rating, Numerical, CSAT and NPS.
   * without user interaction, useful for integrations or testing.
   *
   * @param params - Object containing survey, point, and answer information
   * @param responseUuid - Optional response UUID to use for this answer submission.
   * If provided and valid, reuses the existing response UUID, otherwise generates a new one.
   * Useful when a survey is partially shown with some questions hidden, or when you want to
   * connect all answers into a single record in the analysis tab.
   */
  submitAnswer: (params: {
    /** Survey ID */
    surveyId: string;
    /** Question/point ID */
    pointId: number;
    /** Answer option ID (for single choice questions) */
    answerId?: number;
    /** Answer value (for text or numeric questions) */
    answer?: string | number;
  }, responseUuid?: string) => void;

  /** Current visitor traits/attributes */
  traits?: VisitorAttributes;
}

/**
 * Main Survicate class for interacting with surveys
 *
 * This class provides the core functionality for managing Survicate surveys,
 * including initialization, survey display, visitor management, and event handling.
 *
 * @example
 * ```javascript
 * const survicate = new Survicate({
 *   workspaceKey: 'your-workspace-key',
 *   traits: { user_id: '123' }
 * });
 *
 * await survicate.ready();
 * survicate.showSurvey('survey-123');
 * ```
 */
export declare class Survicate {
  /**
   * Create a new Survicate instance
   *
   * @param config - Configuration object for the SDK
   */
  constructor(config: ConfigModel);

  /** @internal */
  private initScript;
  /** @internal */
  private loadScript;

  /**
   * Wait for the Survicate SDK to be ready
   *
   * This method returns a promise that resolves when the Survicate
   * script has been loaded and initialized.
   *
   * @returns Promise that resolves when the SDK is ready
   */
  ready(): Promise<void>;

  /**
   * Manually trigger a survey to be displayed
   *
   * @param id - Survey ID to display
   * @param options - Display options for the survey
   * @returns Whether the survey was successfully triggered
   */
  showSurvey(id: string, options?: ShowSurveyOptions): boolean;

  /**
   * Re-evaluate targeting rules and show surveys if conditions are met
   *
   * This method rechecks all targeting rules for available surveys
   * and displays them if the current visitor meets the criteria.
   */
  retarget(): void;

  /**
   * Get the unique visitor ID for the specified survey type
   *
   * @param surveyType - Optional survey type to get visitor ID for
   * @returns Unique visitor identifier
   */
  getVisitorId: (surveyType?: SurveyType) => string;

  /**
   * Get the response UUID for the current survey session
   *
   * This method returns the unique identifier for the current survey response.
   * When connectResponse is true:
   * - If an active survey exists with answers being collected, returns the survey's existing response UUID
   * - If no active survey exists, generates a new UUID (not stored)
   * When connectResponse is false or undefined, generates a new UUID each time.
   *
   * Note: The survey state response UUID is only available when there's already an active survey
   * with answers being collected. For programmatic submissions without an active survey,
   * you should generate a UUID once and reuse it across multiple submitAnswer calls.
   *
   * @example
   * ```javascript
   * // Safest way: Get response UUID after a question is answered (ensures active survey)
   * survicate.addEventListener('question_answered', function(surveyId, questionId) {
   *   if (surveyId === 'ab1791b79cacc6ba' && questionId === 1332422) {
   *     const responseUuid = survicate.getResponseUuid(Survicate.SurveyType.WidgetSurvey, true);
   *
   *     survicate.submitAnswer(
   *       { surveyId: 'ab1791b79cacc6ba', pointId: 1332423, answer: 'this was submitted by API' },
   *       responseUuid
   *     );
   *   }
   * });
   *
   * // Alternative: Get a new response UUID (generates new UUID each time)
   * const responseUuid = survicate.getResponseUuid(Survicate.SurveyType.WidgetSurvey);
   *
   * // For programmatic submissions without active survey, generate UUID once and reuse it
   * const responseUuid = survicate.getResponseUuid(Survicate.SurveyType.WidgetSurvey);
   * survicate.submitAnswer({ surveyId: 'survey-1', pointId: 1, answerId: 5 }, responseUuid);
   * survicate.submitAnswer({ surveyId: 'survey-1', pointId: 2, answerId: 3 }, responseUuid);
   * ```
   *
   * @param surveyType - The survey type (WidgetSurvey or FeedbackButton) to get the response UUID for
   * @param connectResponse - If true, returns existing response UUID from active survey, otherwise generates new UUID
   * @returns Response UUID string
   */
  getResponseUuid: (surveyType: SurveyType, connectResponse?: boolean) => string;

  /**
   * Set visitor traits/attributes for targeting and identification
   *
   * @param attributes - Object containing visitor attributes
   */
  setVisitorTraits(attributes: VisitorAttributes): void;

  /**
   * Destroy the current visitor session and reset all data
   *
   * @param callback - Optional callback to execute after destruction
   */
  destroyVisitor(callback?: () => void): void;

  /**
   * Add an event listener for survey events
   *
   * @param event - The event type to listen for
   * @param callback - Function to call when the event occurs
   * @returns Event listener ID for removal
   */
  addEventListener(event: ApiEvent, callback: CallbackTypes): number | void;

  /**
   * Remove an event listener
   *
   * @param eventId - Event listener ID or event type to remove
   */
  removeEventListener(eventId: number | ApiEvent): void;

  /**
   * Invoke a custom event that can be used for targeting
   *
   * @param eventName - Name of the custom event
   * @param eventProperties - Optional properties to attach to the event
   */
  invokeEvent: (eventName: string, eventProperties?: Record<string, string>) => void;

  /**
   * Submit an answer to a survey question programmatically
   *
   * This method allows you to submit answers to the following survey questions:
   * Text, Single, Rating, Numerical, CSAT and NPS.
   * without user interaction, useful for integrations or testing.
   * Rate limited to 10 submissions per 10 seconds.
   *
   * @example
   * ```javascript
   * // Submit a single choice answer
   * survicate.submitAnswer({
   *   surveyId: 'survey-123',
   *   pointId: 1,
   *   answerId: 5,
   *   answer: 'Very satisfied'
   * });
   *
   * // Submit a text answer
   * survicate.submitAnswer({
   *   surveyId: 'survey-123',
   *   pointId: 2,
   *   answer: 'Great product!'
   * });
   *
   * // Submit an NPS score
   * survicate.submitAnswer({
   *   surveyId: 'survey-123',
   *   pointId: 3,
   *   answer: 9 // Score from 0-10
   * });
   *
   * // Submit an answer with a specific response UUID
   * survicate.submitAnswer({
   *   surveyId: 'survey-123',
   *   pointId: 4,
   *   answerId: 2
   * }, '550e8400-e29b-41d4-a716-446655440000');
   * ```
   *
   * @param params - Object containing survey, point, and answer information
   * @param responseUuid - Optional response UUID to use for this answer submission.
   * If provided and valid, reuses the existing response UUID, otherwise generates a new one.
   * Useful when a survey is partially shown with some questions hidden, or when you want to
   * connect all answers into a single record in the analysis tab.
   * @throws Will log warnings for invalid parameters or rate limit exceeded
   */
  submitAnswer: (params: {
    /** Survey ID */
    surveyId: string;
    /** Question/point ID */
    pointId: number;
    /** Answer option ID (for single choice questions) */
    answerId?: number;
    /** Answer value (for text or numeric questions) */
    answer?: string | number;
  }, responseUuid?: string) => void;

  /**
   * Get metadata about survey points (questions)
   *
   * This method returns information about all questions in a survey,
   * including their types and available answer options.
   *
   * @example
   * ```javascript
   * const metadata = survicate.getSurveyPointsMetadata('survey-123');
   * if (metadata) {
   *   metadata.forEach(point => {
   *     console.log(`Point ${point.pointId}: ${point.answerType}`);
   *     if (point.answers) {
   *       console.log('Available answers:', point.answers);
   *     }
   *   });
   * }
   * ```
   *
   * @param surveyId - ID of the survey to get metadata for
   * @returns Array of survey point information or null if survey not found
   */
  getSurveyPointsMetadata: (surveyId: string) => SurveyPointInfo[] | null;
}

/**
 * Get the current Survicate instance
 *
 * Returns the initialized Survicate instance if available, or null if
 * the SDK hasn't been initialized yet. Use this to access the main
 * Survicate API methods.
 *
 * @example
 * ```javascript
 * const survicate = getSurvicateInstance();
 * if (survicate) {
 *   survicate.showSurvey('12345678910');
 * } else {
 *   console.log('Survicate not initialized yet');
 * }
 * ```
 *
 * @returns The Survicate instance or null if not initialized
 */
declare const getSurvicateInstance: () => Survicate | null;

/**
 * Initialize the Survicate SDK with configuration
 *
 * This function loads the Survicate script and initializes the SDK
 * with the provided configuration. It must be called before using
 * any other Survicate functionality.
 *
 * @example
 * ```javascript
 * try {
 *   await initSurvicate({
 *     workspaceKey: 'your-workspace-key',
 *     traits: { user_id: '123', plan: 'premium' },
 *   });
 *   console.log('Survicate initialized successfully');
 * } catch (error) {
 *   console.error('Failed to initialize Survicate:', error);
 * }
 * ```
 *
 * @param config - Configuration object for the SDK
 * @returns Promise that resolves when initialization is complete
 * @throws Error if initialization fails
 */
declare const initSurvicate: (config: ConfigModel) => Promise<void>;

export { getSurvicateInstance, initSurvicate };
