import { ImageGalleryItem } from "./imageGalleryItem";

/**
 * Интерфейс карточки галереи изображений для Яндекс.Диалогов
 */
export interface ImageGalleryCard {
    type: 'ImageGallery';
    /** 
     * Элементы галереи изображений
     * @remarks Должен содержать от 1 до 10 элементов
     */
    items: ImageGalleryItem[];
}

/**
 * Начальный шаг построения галереи изображений
 * @remarks Требуется добавить первый обязательный элемент
 */
export interface ImageGalleryStep1 {
    /**
     * Добавляет первый элемент в галерею
     * @param item - Объект элемента галереи
     * @returns Следующий шаг: добавление элементов или сборка
     */
    addItem(item: ImageGalleryItem): ImageGalleryStep2;
}

/**
 * Промежуточный шаг построения галереи изображений
 * @remarks Позволяет добавлять дополнительные элементы или завершить сборку
 */
export interface ImageGalleryStep2 {
    /**
     * Добавляет дополнительный элемент в галерею
     * @param item - Объект элемента галереи
     * @returns Тот же шаг для продолжения добавления
     * @remarks Максимальное количество элементов - 10
     */
    addItem(item: ImageGalleryItem): ImageGalleryStep2;
    
    /**
     * Завершает построение галереи
     * @returns Готовый объект ImageGalleryCard
     * @throws Ошибка если добавлено менее 1 элемента
     */
    build(): ImageGalleryCard;
}