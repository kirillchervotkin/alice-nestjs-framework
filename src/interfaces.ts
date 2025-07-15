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

export interface SessionState {
    nextHandler?: string,
    data?: unknown
}

/**
 * Пользовательский ввод (реплика) и его интерпретация
 * @see [Документация](https://yandex.ru/dev/dialogs/alice/doc/request.html#request__user-utterance-desc)
 */
export interface UserUtterance {
    /**
     * Полный текст пользовательского запроса
     @See [Документация](https://yandex.ru/dev/dialogs/alice/doc/ru/request-simpleutterance#request-desc)
     */
    originalUtterance: string;

    /**
     * Нормализованный текст запроса. 
     * В ходе нормализации текст очищается от знаков препинания, приводится к нижнему регистру, а числительные преобразуются в числа.
     * @See [Документация](https://yandex.ru/dev/dialogs/alice/doc/ru/request-simpleutterance#request-desc)
     */
    command: string;
}

/**
 * Интерфейс тела ответа навыка для Яндекс Диалогов
 * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response|Документация}
 */
export interface SkillResponseBody {
    /** Тип ответа (по умолчанию 'text') */
    response_type: string;
    /** Текст ответа, который увидит/услышит пользователь (макс. 1024 символа) */
    text: string;
    /** Флаг завершения сессии */
    end_session: boolean;
    /** Массив кнопок для отображения в интерфейсе */
    buttons?: Button[];
}

/**
 * Интерфейс кнопки для ответа навыка
 * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/buttons|Документация}
 */
export interface Button {
    /** Текст на кнопке (макс. 64 символа) */
    title: string;
    /** Флаг скрытия кнопки после нажатия */
    hide: boolean;
}

/**
 * Класс для формирования ответа навыка Яндекс Диалогов
 * @see [Формат ответа](https://yandex.ru/dev/dialogs/alice/doc/ru/response)
 * @see [Хранение состояния](https://yandex.ru/dev/dialogs/alice/doc/ru/session-persistence)
 */