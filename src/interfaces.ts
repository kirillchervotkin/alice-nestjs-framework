import { Button } from "./types/ui/button";

/**
 * @deprecated Этот интерфейс устарел. Используйте {@link AliceResponse}
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
