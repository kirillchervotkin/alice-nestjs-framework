import { Button } from "../types/ui/button";

import { ItemsListItemImageIdStep, ItemsListItemTitleStep, ItemsListItemDescriptionStep, ItemsListItemButtonStep, ItemsListItemReadyToBuild, ItemsListItem } from "src/types/ui/cards/itemListItem";

/**
 * Строитель для элемента списка товаров (ItemsListItem) в Яндекс.Диалогах.
 * Реализует пошаговое создание элемента списка с обязательными полями.
 * 
 * @see https://yandex.ru/dev/dialogs/alice/doc/cards.html#itemslist-item — документация по элементам списка
 * @implements {ItemsListItemImageIdStep}
 * @implements {ItemsListItemTitleStep}
 * @implements {ItemsListItemDescriptionStep}
 * @implements {ItemsListItemButtonStep}
 * @implements {ItemsListItemReadyToBuild}
 */
export class ItemsListItemBuilder implements 
    ItemsListItemImageIdStep, 
    ItemsListItemTitleStep, 
    ItemsListItemDescriptionStep, 
    ItemsListItemButtonStep, 
    ItemsListItemReadyToBuild 
{
    private item: Partial<ItemsListItem> = {};

    private constructor() { }

    /**
     * Инициализирует создание элемента списка товаров.
     * @returns {ItemsListItemImageIdStep} Шаг установки идентификатора изображения
     * @example
     * ItemsListItemBuilder.create()
     *   .setImageId("123456")
     *   .setTitle("Название товара")
     *   .setDescription("Описание товара")
     *   .setButton(button)
     *   .build();
     */
    static create(): ItemsListItemImageIdStep {
        return new ItemsListItemBuilder();
    }

    /**
     * Устанавливает идентификатор изображения товара.
     * @param {string} id ID изображения (6-20 символов)
     * @returns {ItemsListItemTitleStep} Шаг установки названия товара
     * @see https://yandex.ru/dev/dialogs/alice/doc/resource-upload.html — загрузка изображений
     */
    setImageId(id: string): ItemsListItemTitleStep {
        this.item.image_id = id;
        return this;
    }

    /**
     * Устанавливает название товара.
     * @param {string} title Название товара (рекомендация: до 128 символов)
     * @returns {ItemsListItemDescriptionStep} Шаг установки описания
     */
    setTitle(title: string): ItemsListItemDescriptionStep {
        this.item.title = title;
        return this;
    }

    /**
     * Устанавливает описание товара.
     * @param {string} description Описание товара (рекомендация: до 256 символов)
     * @returns {ItemsListItemButtonStep} Шаг установки кнопки
     */
    setDescription(description: string): ItemsListItemButtonStep {
        this.item.description = description;
        return this;
    }

    /**
     * Добавляет кнопку действия для товара.
     * @param {Button} button Объект кнопки
     * @returns {ItemsListItemReadyToBuild} Финальный шаг сборки
     */
    setButton(button: Button): ItemsListItemReadyToBuild {
        this.item.button = button;
        return this;
    }

    /**
     * Завершает создание элемента и возвращает результат.
     * @returns {ItemsListItem} Готовый объект элемента списка
     * @throws {Error} Если отсутствуют обязательные поля:
     * - image_id
     * - title
     * - description
     * - button
     */
    build(): ItemsListItem {
        if (!this.item.image_id || !this.item.title ||
            !this.item.description || !this.item.button) {
            throw new Error("Missing fields in ItemsListItem");
        }
        return this.item as ItemsListItem;
    }
}