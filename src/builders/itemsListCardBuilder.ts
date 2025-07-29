import { Button } from "../types/ui/button";
import { ItemsListCard, ItemsListStepAddFirstItem, ItemsListStepAddMoreItemsOrSetFooter, ItemsListStepBuild, ItemsListStepSetHeader } from "src/types/ui/cards/itemListCard";
import { ItemsListItem } from "../types/ui/cards/itemListItem";

/**
 * Строитель для карточки "Список товаров" (ItemsList) в Яндекс.Диалогах.
 * Реализует пошаговое создание карточки с обязательными заголовком, элементами и подвалом.
 * 
 * @see https://yandex.ru/dev/dialogs/alice/doc/cards.html#itemslist — документация по спискам товаров
 * @implements {ItemsListStepSetHeader}
 * @implements {ItemsListStepAddFirstItem}
 * @implements {ItemsListStepAddMoreItemsOrSetFooter}
 * @implements {ItemsListStepBuild}
 */
export class ItemsListCardBuilder implements ItemsListStepSetHeader, ItemsListStepAddFirstItem, ItemsListStepAddMoreItemsOrSetFooter, ItemsListStepBuild {
    private card: Partial<ItemsListCard> = { type: 'ItemsList' };
    private items: ItemsListItem[] = [];

    private constructor() { }

    /**
     * Инициализирует создание карточки списка товаров.
     * @returns {ItemsListStepSetHeader} Шаг установки заголовка
     * @example
     * ItemsListCardBuilder.create()
     *   .setHeader("Популярные товары")
     *   .addItem(item1)
     *   .addItem(item2)
     *   .setFooter("Показать еще", button)
     *   .build();
     */
    static create(): ItemsListStepSetHeader {
        return new ItemsListCardBuilder();
    }

    /**
     * Устанавливает заголовок карточки.
     * @param {string} text Текст заголовка (рекомендация: до 64 символов)
     * @returns {ItemsListStepAddFirstItem} Шаг добавления первого элемента
     */
    setHeader(text: string): ItemsListStepAddFirstItem {
        this.card.header = { text };
        return this;
    }

    /**
     * Добавляет элемент в список товаров.
     * @param {ItemsListItem} item Объект элемента списка
     * @returns {ItemsListStepAddMoreItemsOrSetFooter} Шаблон для продолжения добавления или установки подвала
     * 
     * @see https://yandex.ru/dev/dialogs/alice/doc/cards.html#itemslist-item — структура элемента
     * 
     * @example
     * builder.addItem({
     *   image_id: "123456",
     *   title: "Название товара",
     *   description: "Описание",
     *   button: { ... }
     * })
     */
    addItem(item: ItemsListItem): ItemsListStepAddMoreItemsOrSetFooter {
        this.items.push(item);
        return this;
    }

    /**
     * Устанавливает подвал карточки с кнопкой.
     * @param {string} text Текст подвала (рекомендация: до 64 символов)
     * @param {Button} button Кнопка действия
     * @returns {ItemsListStepBuild} Финальный шаг сборки
     */
    setFooter(text: string, button: Button): ItemsListStepBuild {
        this.card.footer = { text, button };
        return this;
    }

    /**
     * Завершает создание карточки и возвращает результат.
     * @returns {ItemsListCard} Готовый объект карточки
     * @throws {Error} Если:
     * - Не установлены заголовок или подвал
     * - Количество элементов не в диапазоне 1-5
     */
    build(): ItemsListCard {
        if (!this.card.header || !this.card.footer) {
            throw new Error("Header and footer must be set");
        }
        if (this.items.length < 1 || this.items.length > 5) {
            throw new Error("Items count must be between 1 and 5");
        }
        
        return {
            ...this.card,
            items: this.items
        } as ItemsListCard;
    }
}