import { Button } from "../interfaces";

/**
 * Объединенный тип карточки
 */
export type Card =
    | ImageGalleryCard
    | ItemsListCard
    | BigImageCard;

/**
 * Карточка с большим изображением
 */
export interface BigImageCard {
    type: 'BigImage';
    /** Идентификатор изображения */
    image_id: string;
    /** Заголовок изображения */
    title: string;
    /** Описание изображения */
    description: string;
    /** Кнопка действия */
    button: Button;
}

export interface ItemsListCard {
    type: 'ItemsList';
    header: ItemsListHeader;
    items: ItemsListItem[];  // От 1 до 5 элементов
    footer: ItemsListFooter;
}

/**
 * Карточка с галереей изображений
 */
export interface ImageGalleryCard {
    type: 'ImageGallery';
    items: ImageGalleryItem[];  // От 1 до 10 элементов
}

export interface ImageGalleryItem {
    /** Идентификатор изображения */
    image_id: string;
    /** Заголовок изображения */
    title: string;
    /** Кнопка действия */
    button: Button;
}

/**
* Карточка со списком элементов
 */

export interface ItemsListItem {
    /** Идентификатор изображения */
    image_id: string;
    /** Заголовок элемента */
    title: string;
    /** Описание элемента */
    description: string;
    /** Кнопка действия */
    button: Button;
}

/**
 * Заголовочная часть для ItemsList
 */
export interface ItemsListHeader {
    /** Текст заголовка */
    text: string;
}

/**
 * Нижний блок для ItemsList
 */
export interface ItemsListFooter {
    /** Текст в футере */
    text: string;
    /** Кнопка действия */
    button: Button;
}