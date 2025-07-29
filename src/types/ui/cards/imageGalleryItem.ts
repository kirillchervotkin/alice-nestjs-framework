import { Button } from "../button";

/**
 * Интерфейс элемента галереи изображений для Яндекс.Диалогов
 */
export interface ImageGalleryItem {
    /** 
     * Идентификатор изображения 
     * @remarks Должен соответствовать изображению из Каталога изображений
     */
    image_id: string;
    
    /** 
     * Заголовок элемента 
     * @remarks Максимальная длина - 128 символов
     */
    title: string;
    
    /** Кнопка действия, связанная с изображением */
    button: Button;
}

/**
 * Начальный шаг построения элемента галереи изображений
 */
export interface ImageIdStep {
    /**
     * Устанавливает идентификатор изображения
     * @param id - Идентификатор изображения из Каталога изображений
     * @returns Следующий шаг: установка заголовка
     */
    setImageId(id: string): TitleStep;
}

/**
 * Шаг установки заголовка элемента галереи
 */
export interface TitleStep {
    /**
     * Устанавливает заголовок для элемента галереи
     * @param title - Текст заголовка
     * @returns Следующий шаг: установка кнопки
     * @remarks Максимальная длина - 128 символов
     */
    setTitle(title: string): ButtonStep;
}

/**
 * Шаг установки кнопки действия
 */
export interface ButtonStep {
    /**
     * Устанавливает кнопку для элемента галереи
     * @param button - Объект кнопки в формате Яндекс.Диалогов
     * @returns Финальный шаг: сборка элемента
     */
    setButton(button: Button): BuildStep;
}

/**
 * Финальный шаг построения элемента галереи
 */
export interface BuildStep {
    /**
     * Завершает создание элемента галереи
     * @returns Готовый объект ImageGalleryItem
     */
    build(): ImageGalleryItem;
}