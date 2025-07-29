import { Button } from "../button";

/**
 * Элемент списка для карточки ItemsList в Яндекс.Диалогах
 */
export interface ItemsListItem {
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
    
    /** 
     * Описание элемента 
     * @remarks Максимальная длина - 256 символов
     */
    description: string;
    
    /** Кнопка действия, связанная с элементом */
    button: Button;
}

/**
 * Начальный шаг построения элемента списка (установка image_id)
 */
export interface ItemsListItemImageIdStep {
    /**
     * Устанавливает идентификатор изображения для элемента
     * @param id - Идентификатор изображения из Каталога изображений
     * @returns Следующий шаг: установка заголовка
     */
    setImageId(id: string): ItemsListItemTitleStep;
}

/**
 * Шаг установки заголовка элемента
 */
export interface ItemsListItemTitleStep {
    /**
     * Устанавливает заголовок элемента
     * @param title - Текст заголовка
     * @returns Следующий шаг: установка описания
     * @remarks Максимальная длина - 128 символов
     */
    setTitle(title: string): ItemsListItemDescriptionStep;
}

/**
 * Шаг установки описания элемента
 */
export interface ItemsListItemDescriptionStep {
    /**
     * Устанавливает описание элемента
     * @param description - Текст описания
     * @returns Следующий шаг: установка кнопки
     * @remarks Максимальная длина - 256 символов
     */
    setDescription(description: string): ItemsListItemButtonStep;
}

/**
 * Шаг установки кнопки действия
 */
export interface ItemsListItemButtonStep {
    /**
     * Устанавливает кнопку для элемента
     * @param button - Объект кнопки в формате Яндекс.Диалогов
     * @returns Финальный шаг: сборка элемента
     */
    setButton(button: Button): ItemsListItemReadyToBuild;
}

/**
 * Финальный шаг построения элемента списка
 */
export interface ItemsListItemReadyToBuild {
    /**
     * Завершает создание элемента списка
     * @returns Готовый объект ItemsListItem
     */
    build(): ItemsListItem;
}