import { Button } from "src/types/ui/button";
import { BigImageCard, StepBuild, StepSetButton, StepSetDescription, StepSetImageId, StepSetTitle } from "src/types/ui/cards/bigImageCard";

/**
 * Строитель для карточки с изображением (BigImage) в Яндекс.Диалогах.
 * Реализует пошаговое конструирование объекта с обязательными полями:
 * - `image_id` (идентификатор изображения)
 * - `title` (заголовок)
 * - `description` (описание)
 * - `button` (кнопка)
 * 
 * @see https://yandex.ru/dev/dialogs/alice/doc/cards.html — документация по карточкам
 * @implements {StepSetImageId}
 * @implements {StepSetTitle}
 * @implements {StepSetDescription}
 * @implements {StepSetButton}
 * @implements {StepBuild}
 */
export class BigImageCardBuilder implements StepSetImageId, StepSetTitle, StepSetDescription, StepSetButton, StepBuild {
    private card: Partial<BigImageCard> = { type: 'BigImage' };

    private constructor() {}

    /**
     * Инициализирует процесс создания карточки.
     * @returns {StepSetImageId} Шаг установки image_id
     * @example
     * BigImageCardBuilder.create()
     *   .setImageId("123456")
     *   .setTitle("Заголовок")
     *   .setDescription("Описание")
     *   .setButton(button)
     *   .build();
     */
    static create(): StepSetImageId {
        return new BigImageCardBuilder();
    }

    /**
     * Устанавливает идентификатор изображения.
     * @param {string} id ID изображения из Яндекс.Диалогов (требование: 6-20 символов)
     * @returns {StepSetTitle} Шаг установки заголовка
     * @see https://yandex.ru/dev/dialogs/alice/doc/resource-upload.html — загрузка изображений
     */
    setImageId(id: string): StepSetTitle {
        this.card.image_id = id;
        return this;
    }

    /**
     * Устанавливает заголовок карточки.
     * @param {string} title Текст заголовка (рекомендация: до 128 символов)
     * @returns {StepSetDescription} Шаг установки описания
     */
    setTitle(title: string): StepSetDescription {
        this.card.title = title;
        return this;
    }

    /**
     * Устанавливает описание карточки.
     * @param {string} description Текст описания (рекомендация: до 256 символов)
     * @returns {StepSetButton} Шаг установки кнопки
     */
    setDescription(description: string): StepSetButton {
        this.card.description = description;
        return this;
    }

    /**
     * Добавляет кнопку к карточке.
     * @param {Button} button Объект кнопки ({@link Button})
     * @returns {StepBuild} Финальный шаг сборки
     */
    setButton(button: Button): StepBuild {
        this.card.button = button;
        return this;
    }

    /**
     * Завершает создание карточки.
     * @returns {BigImageCard} Готовый объект карточки
     * @throws {Error} Если не установлены обязательные поля
     */
    build(): BigImageCard {
        if (!this.card.image_id || !this.card.title || !this.card.description || !this.card.button) {
            throw new Error("Missing required fields in BigImageCard");
        }
        return this.card as BigImageCard;
    }
}