import { Button } from "../interfaces";
import { ImageGalleryItem } from "../types/cards";

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

export class ImageGalleryItemBuilder implements ImageIdStep, TitleStep, ButtonStep, BuildStep {
    private item: Partial<ImageGalleryItem> = {};

    private constructor() { }

    static create(): ImageIdStep {
        return new ImageGalleryItemBuilder();
    }

    setImageId(id: string): TitleStep {
        this.item.image_id = id;
        return this;
    }

    setTitle(title: string): ButtonStep {
        this.item.title = title;
        return this;
    }

    setButton(button: Button): BuildStep {
        this.item.button = button;
        return this;
    }

    build(): ImageGalleryItem {
        if (!this.item.image_id || !this.item.title || !this.item.button) {
            throw new Error("Missing required fields for ImageGalleryItem");
        }
        return this.item as ImageGalleryItem;
    }
}