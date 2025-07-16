import { Button } from "../button";

/**
 * Карточка с галереей изображений
 */
export interface ImageGalleryItem {
    /** Идентификатор изображения */
    image_id: string;
    /** Заголовок изображения */
    title: string;
    /** Кнопка действия */
    button: Button;
}

// Шаги построения
export interface ImageIdStep {
    setImageId(id: string): TitleStep;
}

export interface TitleStep {
    setTitle(title: string): ButtonStep;
}

export interface ButtonStep {
    setButton(button: Button): BuildStep;
}

export interface BuildStep {
    build(): ImageGalleryItem;
}