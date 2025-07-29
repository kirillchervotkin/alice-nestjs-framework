import { AliceResponse } from "../types/api/response";
import { Button } from "../types/ui/button";
import { Card } from "../types/ui/cards/card";

export class SkillResponseBuilder {
    
    private response: AliceResponse;
    /**
     * Создает экземпляр билдера
     * @param {string} message - Текст ответа для пользователя
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response#response-desc|Документация: Поле text}
     */
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

    /**
    * Добавляет кнопку в ответ навыка на основе объекта конфигурации.
    * @param {Button} button - Объект кнопки с настройками
    * @returns {SkillResponseBuilder} Экземпляр строителя ответа для цепочки вызовов
    * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response#buttons-desc|Документация: Кнопки}
    * @example
    * setButton({
    *   title: "Моя кнопка",
    *   hide: true
    * });
    */
    public setButton(button: Button): SkillResponseBuilder;

    /**
    * @deprecated Этот метод устарел. Используйте {@link setButton} с объектом `Button` вместо передачи параметров по отдельности.
    * 
    * Добавляет кнопку в ответ навыка с указанным текстом и флагом скрытия.
    * @param {string} title - Текст кнопки (максимум 64 символа)
    * @param {boolean} hide - Скрывать ли кнопку после нажатия
    * @returns {SkillResponseBuilder} Экземпляр строителя ответа для цепочки вызовов
    * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response#buttons-desc|Документация: Кнопки}
    */
    public setButton(title: string, hide: boolean): SkillResponseBuilder;

    /**
    * Реализация добавления кнопок (поддерживает оба варианта вызова).
    * @param {string | Button} arg1 - Текст кнопки или объект конфигурации
    * @param {boolean} [arg2] - Опциональный флаг скрытия (только для устаревшего варианта)
    * @returns {SkillResponseBuilder}
    */
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

    /**
     * Добавляет кнопку в начало списка с удалением дубликатов
     * @param {string} title - Текст кнопки
     * @param {boolean} hide - Скрывать кнопку после нажатия
     * @returns {SkillResponseBuilder}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response#buttons-desc|Документация: Кнопки}
     */
    public setPrependButton(title: string, hide: boolean): SkillResponseBuilder {
        this.removeExistingButton(title);
        (this.response.response.buttons ??= []).unshift({ title, hide });
        return this;
    }

    /**
     * Добавляет несколько кнопок
     * @param {Button[]} buttons - Массив кнопок
     * @returns {SkillResponseBuilder}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response#buttons-desc|Документация: Кнопки}
     */
    public setButtons(buttons: Button[]): SkillResponseBuilder {
        (this.response.response.buttons ??= []).push(...buttons);
        return this;
    }

    /**
     * Завершает сессию
     * @returns {SkillResponseBuilder}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response#response-desc|Документация: Завершение сессии}
     */
    public setEndSession(): SkillResponseBuilder {
        this.response.response.end_session = true;
        return this;
    }

    /**
     * Инициирует процесс авторизации
     * @returns {SkillResponseBuilder}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response-start-account-linking|Документация: Авторизация}
     */
    public setStartAccountLinking(): SkillResponseBuilder {
        this.response.start_account_linking = {};
        return this;
    }

    /**
     * Устанавливает TTS-озвучку
     * @param {string} tts - Текст для озвучки
     * @returns {SkillResponseBuilder}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response#response-desc|Документация: Озвучка}
     */
    public setTts(tts: string): SkillResponseBuilder {
        this.response.response.tts = tts;
        return this;
    }

    /**
    * Сохраняет пользовательские данные в сессии
    * @template T
    * @param {T} data - Произвольные данные сессии
    * @returns {SkillResponseBuilder}
    * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/session-persistence#store-session|Документация: Сохранение данных}
    */
    public setData<T>(data: T): SkillResponseBuilder {
        (this.response.session_state ??= {}).data = data;
        return this;
    }

    /**
     * Устанавливает обработчик, который будет обрабатывать следующий запрос пользователя
     * @param {string} handlerName - Имя обработчика
     * @returns {SkillResponseBuilder}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/session-persistence#store-session|Документация: Состояние сессии}
     */
    public setNextHandler(handlerName: string): SkillResponseBuilder {
        (this.response.session_state ??= {}).nextHandler = handlerName;
        return this;
    }

    /**
     * Устанавливает карточку для ответа
     * @param {Card} card - Объект карточки
     * @returns {SkillResponseBuilder}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/ru/response|Документация: Карточки}
     */
    public setCard(card: Card): SkillResponseBuilder {
        this.response.response.card = card;
        return this;
    }

    /**
     * Возвращает сформированный ответ
     * @returns {AliceResponse}
     * @see {@link https://yandex.ru/dev/dialogs/alice/doc/response.html|Документация: Полная структура ответа}
     */
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