import { Button } from "../types/ui/button";
import { BuildStep, ButtonStep, ImageGalleryItem, ImageIdStep, TitleStep } from "../types/ui/cards/imageGalleryItem";

/**
 * Строитель для элемента галереи изображений (ImageGalleryItem) в Яндекс.Диалогах.
 * Реализует пошаговое создание элемента галереи с обязательными полями.
 * 
 * @see https://yandex.ru/dev/dialogs/alice/doc/cards.html#imagegallery-item — структура элемента
 * @implements {ImageIdStep}
 * @implements {TitleStep}
 * @implements {ButtonStep}
 * @implements {BuildStep}
 */
export class ImageGalleryItemBuilder implements ImageIdStep, TitleStep, ButtonStep, BuildStep {
    private item: Partial<ImageGalleryItem> = {};

    private constructor() { }

    /**
     * Инициализирует создание элемента галереи.
     * @returns {ImageIdStep} Шаг установки идентификатора изображения
     * @example
     * ImageGalleryItemBuilder.create()
     *   .setImageId("123456")
     *   .setTitle("Заголовок")
     *   .setButton(button)
     *   .build();
     */
    static create(): ImageIdStep {
        return new ImageGalleryItemBuilder();
    }

    /**
     * Устанавливает идентификатор изображения.
     * @param {string} id ID изображения (требование: 6-20 символов)
     * @returns {TitleStep} Шаг установки заголовка
     * @see https://yandex.ru/dev/dialogs/alice/doc/resource-upload.html — загрузка изображений
     */
    setImageId(id: string): TitleStep {
        this.item.image_id = id;
        return this;
    }

    /**
     * Устанавливает заголовок элемента.
     * @param {string} title Текст заголовка (рекомендация: до 128 символов)
     * @returns {ButtonStep} Шаг установки кнопки
     */
    setTitle(title: string): ButtonStep {
        this.item.title = title;
        return this;
    }

    /**
     * Добавляет кнопку к элементу галереи.
     * @param {Button} button Объект кнопки действия
     * @returns {BuildStep} Финальный шаг сборки
     */
    setButton(button: Button): BuildStep {
        this.item.button = button;
        return this;
    }

    /**
     * Завершает создание элемента и возвращает результат.
     * @returns {ImageGalleryItem} Готовый объект элемента галереи
     * @throws {Error} Если отсутствуют обязательные поля:
     * - image_id
     * - title
     * - button
     */
    build(): ImageGalleryItem {
        if (!this.item.image_id || !this.item.title || !this.item.button) {
            throw new Error("Missing required fields for ImageGalleryItem");
        }
        return this.item as ImageGalleryItem;
    }
}