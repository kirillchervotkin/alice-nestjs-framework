import { Button } from "../interfaces";


export interface ItemsListItem {
    image_id: string;
    title: string;
    description: string;
    button: Button;
}


interface ItemsListItemImageIdStep {
    setImageId(id: string): ItemsListItemTitleStep;
}

interface ItemsListItemTitleStep {
    setTitle(title: string): ItemsListItemDescriptionStep;
}

interface ItemsListItemDescriptionStep {
    setDescription(description: string): ItemsListItemButtonStep;
}

interface ItemsListItemButtonStep {
    setButton(button: Button): ItemsListItemReadyToBuild;
}

interface ItemsListItemReadyToBuild {
    build(): ItemsListItem;
}

export class ItemsListItemBuilder implements 
    ItemsListItemImageIdStep, 
    ItemsListItemTitleStep, 
    ItemsListItemDescriptionStep, 
    ItemsListItemButtonStep, 
    ItemsListItemReadyToBuild 
{
    private item: Partial<ItemsListItem> = {};

    private constructor() { }

    static create(): ItemsListItemImageIdStep {
        return new ItemsListItemBuilder();
    }

    setImageId(id: string): ItemsListItemTitleStep {
        this.item.image_id = id;
        return this;
    }

    setTitle(title: string): ItemsListItemDescriptionStep {
        this.item.title = title;
        return this;
    }

    setDescription(description: string): ItemsListItemButtonStep {
        this.item.description = description;
        return this;
    }

    setButton(button: Button): ItemsListItemReadyToBuild {
        this.item.button = button;
        return this;
    }

    build(): ItemsListItem {
        if (!this.item.image_id || !this.item.title ||
            !this.item.description || !this.item.button) {
            throw new Error("Missing fields in ItemsListItem");
        }
        return this.item as ItemsListItem;
    }
}