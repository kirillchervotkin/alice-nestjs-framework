import { Button } from "../button";


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


export interface ItemsListItemImageIdStep {
    setImageId(id: string): ItemsListItemTitleStep;
}

export interface ItemsListItemTitleStep {
    setTitle(title: string): ItemsListItemDescriptionStep;
}

export interface ItemsListItemDescriptionStep {
    setDescription(description: string): ItemsListItemButtonStep;
}

export interface ItemsListItemButtonStep {
    setButton(button: Button): ItemsListItemReadyToBuild;
}

export interface ItemsListItemReadyToBuild {
    build(): ItemsListItem;
}


