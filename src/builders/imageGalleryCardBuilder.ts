import { ImageGalleryCard, ImageGalleryStep1, ImageGalleryStep2 } from "src/types/ui/cards/imageGalleryCard";
import { ImageGalleryItem } from "src/types/ui/cards/imageGalleryItem";

export class ImageGalleryCardBuilder implements ImageGalleryStep1, ImageGalleryStep2 {
    private items: ImageGalleryItem[] = [];

    private constructor() {}

    static create(): ImageGalleryStep1 {
        return new ImageGalleryCardBuilder();
    }

    addItem(item: ImageGalleryItem): ImageGalleryStep2 {
        this.items.push(item);
        return this;
    }

    build(): ImageGalleryCard {
        if (this.items.length < 1 || this.items.length > 10) {
            throw new Error("ImageGallery must contain 1-10 items");
        }
        return {
            type: 'ImageGallery',
            items: this.items
        };
    }
}

