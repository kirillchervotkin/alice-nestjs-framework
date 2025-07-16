import { SkillResponseBody } from "./interfaces";
import { AliceResponse } from "./types/api/response";
import { Button } from "./types/ui/button";
import { Card } from "./types/ui/cards/card";

export class SkillResponse {

    /**
    * @deprecated Этот класс устарел. Используйте {@link SkillResponseBuilder} для формирования ответа.
    * @param {string} message - Основной текст ответа для пользователя
    * @see [Текст ответа](https://yandex.ru/dev/dialogs/alice/doc/ru/response#response__response-desc)
    * @see [Формат ответа](https://yandex.ru/dev/dialogs/alice/doc/ru/response)
    */
    constructor(message: string) {
        this.response = {
            response_type: 'text',
            text: message,
            end_session: false,
        };
        this.version = "1.0";
    }

    /** 
     * Тело ответа
     * @see [Структура ответа](https://yandex.ru/dev/dialogs/alice/doc/ru/response#response)
     */
    public response: SkillResponseBody;

    /** 
     * Версия протокола 
     * @see [Версия протокола](https://yandex.ru/dev/dialogs/alice/doc/ru/response#version)
     */
    public version: string;

    /** 
     * Объект для запуска процесса авторизации
     * @see [OAuth-авторизация](https://yandex.ru/dev/dialogs/alice/doc/ru/auth/how-it-works)
     */
    public start_account_linking?: {};

    /** 
     * Состояние сессии (сохраняется между запросами)
     * @see [Хранение состояния](https://yandex.ru/dev/dialogs/alice/doc/ru/session-persistence)
     */
    public session_state?: any;


}

/**
 * Строитель для создания сложных ответов навыка
 * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/session-persistence|Хранение состояния}
 */


