import { Button, SkillResponseBody } from "./interfaces";
import { Card } from "./types/cards";

export class SkillResponse {

    /**
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

export class SkillResponseBuilder {
    private response: AliceResponse;

    constructor(message: string) {
        this.response = {
            version: "1.0",
            response: {
                response_type: 'text',
                text: message,
                end_session: false,
            }
        };
    }

    public setButton(title: string, hide: boolean): SkillResponseBuilder;

    public setButton(button: Button): SkillResponseBuilder;
    public setButton(arg1: string | Button, arg2?: boolean): SkillResponseBuilder {
        if (arg2 !== undefined) {
            // Вызов с двумя параметрами
            const title = arg1 as string;
            (this.response.response.buttons ??= []).push({ title, hide: arg2 });
        } else {
            // Вызов с одним параметром
            const button = arg1 as Button;
            (this.response.response.buttons ??= []).push(button);
        }
        return this;
    }

    public setPrependButton(title: string, hide: boolean): SkillResponseBuilder {
        this.removeExistingButton(title);
        (this.response.response.buttons ??= []).unshift({ title, hide });
        return this;
    }

    public setButtons(buttons: Button[]): SkillResponseBuilder {
        (this.response.response.buttons ??= []).push(...buttons);
        return this;
    }

    public setEndSesstion(): SkillResponseBuilder {
        return this.setEndSession();
    }

    public setEndSession(): SkillResponseBuilder {
        this.response.response.end_session = true;
        return this;
    }

    public setStartAccountLinking(): SkillResponseBuilder {
        this.response.start_account_linking = {};
        return this;
    }

    public setTts(tts: string): SkillResponseBuilder {
        this.response.response.tts = tts;
        return this;
    }

    public setData<T>(data: T): SkillResponseBuilder {
        (this.response.session_state ??= {}).data = data;
        return this;
    }

    public setNextHandler(handlerName: string): SkillResponseBuilder {
        (this.response.session_state ??= {}).nextHandler = handlerName;
        return this;
    }

    public setCard(card: Card): SkillResponseBuilder {
        this.response.response.card = card;
        return this;
    }

    public build(): AliceResponse {
        return this.response;
    }


    private removeExistingButton(title: string): void {
        if (!this.response.response.buttons) return;
        const index = this.response.response.buttons.findIndex(b => b.title === title);
        if (index !== -1) {
            this.response.response.buttons.splice(index, 1);
        }
    }

}
