/**
 * Интерфейс входящего запроса от Яндекс Диалогов
 * @see https://yandex.ru/dev/dialogs/alice/doc/ru/request [Официальная документация]
 */
export interface AliceRequest<T = unknown, U = unknown, A = unknown> {
    meta: {
        locale: string;
        timezone: string;
        client_id: string;
        interfaces: {
            screen?: object;
            payments?: object;
            account_linking?: object;
            audio_player?: object;
        };
    };
    request: {
        type: 'SimpleUtterance' | 'ButtonPressed' | 'Purchase.Confirmation' | 'Show.Pull';
        command: string;
        original_utterance: string;
        markup?: {
            dangerous_context?: boolean;
        };
        payload?: Record<string, unknown>;
        nlu?: {
            tokens: string[];
            entities: Array<{
                type: 'YANDEX.FIO' | 'YANDEX.GEO' | 'YANDEX.DATETIME' | 'YANDEX.NUMBER' | string;
                tokens: {
                    start: number;
                    end: number;
                };
                value: string | number | boolean | Record<string, unknown>;
            }>;
            intents?: Record<string, {
                slots: Record<string, {
                    type: string;
                    value: string | number | boolean | Record<string, unknown>;
                }>;
            }>;
        };
    };
    session: {
        new: boolean;
        message_id: number;
        session_id: string;
        skill_id: string;
        user?: {
            user_id: string;
            access_token?: string;
        };
        application: {
            application_id: string;
        };
        user_id?: string; // Устаревшее поле, оставлено для обратной совместимости
    };
    state?: {
        session?: T;
        user?: U;
        application?: A;
    };
    version: string;
}