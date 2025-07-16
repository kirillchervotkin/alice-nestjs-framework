import { ImageGalleryCard, ImageGalleryStep1, ImageGalleryStep2 } from "src/types/ui/cards/imageGalleryCard";
import { ImageGalleryItem } from "src/types/ui/cards/imageGalleryItem";

/**
 * Строитель для карточки галереи изображений (ImageGallery) в Яндекс.Диалогах.
 * Реализует пошаговое добавление элементов галереи с валидацией количества.
 * 
 * @see https://yandex.ru/dev/dialogs/alice/doc/cards.html#imagegallery — документация по карточкам-галереям
 * @implements {ImageGalleryStep1}
 * @implements {ImageGalleryStep2}
 */
export class ImageGalleryCardBuilder implements ImageGalleryStep1, ImageGalleryStep2 {
    private items: ImageGalleryItem[] = [];

    private constructor() {}

    /**
     * Инициализирует создание галереи изображений.
     * @returns {ImageGalleryStep1} Первый шаг - добавление элемента
     * @example
     * ImageGalleryCardBuilder.create()
     *   .addItem(item1)
     *   .addItem(item2)
     *   .build();
     */
    static create(): ImageGalleryStep1 {
        return new ImageGalleryCardBuilder();
    }

    /**
     * Добавляет элемент в галерею изображений.
     * @param {ImageGalleryItem} item Объект элемента галереи
     * @returns {ImageGalleryStep2} Шаблон для продолжения добавления или сборки
     * 
     * @see https://yandex.ru/dev/dialogs/alice/doc/cards.html#imagegallery-item — структура элемента
     * 
     * @example
     * builder.addItem({
     *   image_id: "123456",
     *   title: "Изображение 1",
     *   description: "Описание",
     *   button: { ... }
     * })
     */
    addItem(item: ImageGalleryItem): ImageGalleryStep2 {
        this.items.push(item);
        return this;
    }

    /**
     * Завершает создание галереи и возвращает результат.
     * @returns {ImageGalleryCard} Готовый объект галереи
     * @throws {Error} Если количество элементов не в диапазоне 1-10
     */
    build(): ImageGalleryCard {
        if (this.items.length < 1 || this.items.length > 10) {
            throw new Error("ImageGallery must contain 1-10 items");
        }
        return {
            type: 'ImageGallery',
            items: this.items
        };
    }
}