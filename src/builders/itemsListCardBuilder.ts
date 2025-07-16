import { Button } from "src/types/ui/button";
import { ItemsListCard, ItemsListStepAddFirstItem, ItemsListStepAddMoreItemsOrSetFooter, ItemsListStepBuild, ItemsListStepSetHeader } from "src/types/ui/cards/itemListCard";
import { ItemsListItem } from "src/types/ui/cards/itemListItem";

class ItemsListCardBuilder implements ItemsListStepSetHeader, ItemsListStepAddFirstItem, ItemsListStepAddMoreItemsOrSetFooter, ItemsListStepBuild {
    private card: Partial<ItemsListCard> = { type: 'ItemsList' };
    private items: ItemsListItem[] = [];

    private constructor() { }

    static create(): ItemsListStepSetHeader {
        return new ItemsListCardBuilder();
    }

    setHeader(text: string): ItemsListStepAddFirstItem {
        this.card.header = { text };
        return this;
    }

    addItem(item: ItemsListItem): ItemsListStepAddMoreItemsOrSetFooter {
        this.items.push(item);
        return this;
    }

    setFooter(text: string, button: Button): ItemsListStepBuild {
        this.card.footer = { text, button };
        return this;
    }

    build(): ItemsListCard {
        if (!this.card.header || !this.card.footer) {
            throw new Error("Header and footer must be set");
        }
        if (this.items.length < 1 || this.items.length > 5) {
            throw new Error("Items count must be between 1 and 5");
        }
        return this.card as ItemsListCard;
    }
}