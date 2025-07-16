import { Button } from "../ui/button";
import { Card } from "../ui/cards/card";

export interface AliceResponse {
    /** Версия протокола */
    version: string;
    /** Тело ответа */
    response: {
        /** Тип ответа (по умолчанию 'text') */
        response_type?: string; // Сделано опциональным
        /** Текст ответа (макс. 1024 символа) */
        text: string;
        /** Озвучка текста (SSML) */
        tts?: string;
        /** Визуальная карточка */
        card?: Card;
        /** Флаг завершения сессии */
        end_session: boolean;
        /** Массив кнопок */
        buttons?: Button[];
        /** Специальные инструкции */
        directives?: unknown;
    };
    /** Объект для запуска авторизации */
    start_account_linking?: {};
    /** Состояние сессии */
    session_state?: {
        nextHandler?: string;
        data?: unknown;
    };
    /** Обновление состояния пользователя */
    user_state_update?: unknown;
    /** Состояние приложения */
    application_state?: unknown;
    /** Аналитические события */
    analytics?: Analytics;
}

export interface Analytics {
    /** События для аналитики */
    events: Array<{
        /** Название события */
        name: string;
        /** Дополнительные данные */
        value?: unknown;
    }>;
}