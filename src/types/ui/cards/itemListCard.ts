import { Button } from "../button";
import { ItemsListItem } from "./itemListItem";

/**
 * Карточка со списком элементов для Яндекс.Диалогов
 */
export interface ItemsListCard {
    type: 'ItemsList';
    /** Заголовочная часть карточки */
    header: ItemsListHeader;
    /** 
     * Элементы списка
     * @remarks Должно быть от 1 до 5 элементов
     */
    items: ItemsListItem[];
    /** Нижний блок карточки */
    footer: ItemsListFooter;
}

/**
 * Заголовочная часть для ItemsList
 */
export interface ItemsListHeader {
    /** 
     * Текст заголовка 
     * @remarks Максимальная длина - 64 символа
     */
    text: string;
}

/**
 * Нижний блок для ItemsList
 */
export interface ItemsListFooter {
    /** 
     * Текст в футере 
     * @remarks Максимальная длина - 64 символа
     */
    text: string;
    /** Кнопка действия */
    button: Button;
}

/**
 * Начальный шаг построения карточки списка
 */
export interface ItemsListStepSetHeader {
    /**
     * Устанавливает заголовок карточки
     * @param text - Текст заголовка
     * @returns Следующий шаг: добавление первого элемента
     */
    setHeader(text: string): ItemsListStepAddFirstItem;
}

/**
 * Шаг добавления первого элемента
 */
export interface ItemsListStepAddFirstItem {
    /**
     * Добавляет первый обязательный элемент в список
     * @param item - Элемент списка
     * @returns Следующий шаг: добавление элементов или установка футера
     * @remarks Минимальное количество элементов - 1
     */
    addItem(item: ItemsListItem): ItemsListStepAddMoreItemsOrSetFooter;
}

/**
 * Шаг добавления дополнительных элементов или установки футера
 */
export interface ItemsListStepAddMoreItemsOrSetFooter {
    /**
     * Добавляет дополнительный элемент в список
     * @param item - Элемент списка
     * @returns Тот же шаг для продолжения добавления
     * @remarks Максимальное количество элементов - 5
     */
    addItem(item: ItemsListItem): ItemsListStepAddMoreItemsOrSetFooter;
    
    /**
     * Устанавливает футер карточки
     * @param text - Текст футера
     * @param button - Кнопка действия
     * @returns Финальный шаг: сборка карточки
     */
    setFooter(text: string, button: Button): ItemsListStepBuild;
}

/**
 * Финальный шаг сборки карточки
 */
export interface ItemsListStepBuild {
    /**
     * Завершает построение карточки
     * @returns Готовый объект ItemsListCard
     * @throws Ошибка если количество элементов не в диапазоне 1-5
     */
    build(): ItemsListCard;
}