/**
 * Интерфейс входящего запроса от Яндекс Диалогов
 * @see https://yandex.ru/dev/dialogs/alice/doc/ru/request [Официальная документация]
 */
export interface AliceRequest<T> {
    /**
     * Мета-информация об устройстве и окружении пользователя
     */
    meta: {
        /** Локаль устройства (например, ru-RU) */
        locale: string;
        /** Часовой пояс (например, Europe/Moscow) */
        timezone: string;
        /** Идентификатор клиентского приложения */
        client_id: string;
        /** 
         * Доступные интерфейсы устройства
         * @property {object} [screen] - Наличие экрана
         * @property {object} [account_linking] - Возможность связки аккаунтов
         * @property {object} [audio_player] - Возможность воспроизведения аудио
         */
        interfaces: {
            screen?: Record<string, never>;
            account_linking?: Record<string, never>;
            audio_player?: Record<string, never>;
        };
    };

    /**
     * Информация о запросе пользователя
     */
    request?: {
        /** Тип входящего запроса */
        type: 'SimpleUtterance' | 'ButtonPressed' | 'Purchase.Confirmation' | 'Show.Pull';
        /** Текст команды после активации навыка */
        command: string;
        /** Полный оригинальный текст запроса */
        original_utterance: string;
        /** 
         * Информация о потенциально опасном содержании
         * @property {boolean} [dangerous_context] - Флаг опасного контекста
         */
        markup?: {
            dangerous_context?: boolean;
        };
        /** 
         * Результаты обработки естественного языка (NLU)
         * @see https://yandex.ru/dev/dialogs/alice/doc/nlu.html [Документация NLU]
         */
        nlu: {
            /** Токенизированный текст запроса */
            tokens: string[];
            /** Распознанные сущности */
            entities: Array<{
                /** Тип сущности (YANDEX.DATETIME, YANDEX.FIO и т.д.) */
                type: string;
                /** Позиции сущности в токенах */
                tokens: {
                    start: number;
                    end: number;
                };
                /** Значение сущности (зависит от типа) */
                value: string | number | boolean | Record<string, unknown>;
            }>;
            /** 
             * Распознанные интенты (намерения)
             * @example { "YANDEX.CONFIRM": { slots: {} } }
             */
            intents?: Record<string, {
                /** Слоты интента */
                slots: Record<string, {
                    /** Тип значения слота */
                    type: string;
                    /** Значение слота */
                    value: string | number | boolean;
                }>;
            }>;
        };
    };

    /**
     * Информация о сессии
     */
    session: {
        /** Счетчик сообщений в сессии */
        message_id: number;
        /** Уникальный идентификатор сессии */
        session_id: string;
        /** Идентификатор навыка */
        skill_id: string;
        /** 
         * Информация о пользователе
         * @property {string} user_id - Уникальный идентификатор пользователя
         * @property {string} [access_token] - OAuth-токен для авторизации
         */
        user?: {
            user_id: string;
            access_token?: string;
        };
        /** 
         * Информация о приложении
         * @property {string} application_id - Идентификатор экземпляра приложения
         */
        application: {
            application_id: string;
        };
        /** Флаг новой сессии */
        new: boolean;
    };

    /**
     * Состояние навыка
     */
    state: {
        /** Состояние сессии */
        session?: T;
        /** Состояние пользователя */
        user?: Record<string, unknown>;
        /** Состояние приложения */
        application?: Record<string, unknown>;
    };

    /** Версия протокола (текущая: 1.0) */
    version: string;
}

export interface Session {
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