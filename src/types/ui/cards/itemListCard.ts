import { Button } from "../button";
import { ItemsListItem } from "./itemListItem";

export interface ItemsListCard {
    type: 'ItemsList';
    header: ItemsListHeader;
    items: ItemsListItem[];  // От 1 до 5 элементов
    footer: ItemsListFooter;
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

export interface ItemsListStepSetHeader {
    setHeader(text: string): ItemsListStepAddFirstItem;
}

export interface ItemsListStepAddFirstItem {
    addItem(item: ItemsListItem): ItemsListStepAddMoreItemsOrSetFooter;
}

export interface ItemsListStepAddMoreItemsOrSetFooter {
    addItem(item: ItemsListItem): ItemsListStepAddMoreItemsOrSetFooter;
    setFooter(text: string, button: Button): ItemsListStepBuild;
}

export interface ItemsListStepBuild {
    build(): ItemsListCard;
}