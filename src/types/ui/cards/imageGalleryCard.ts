import { ImageGalleryItem } from "./imageGalleryItem";

export interface ImageGalleryCard {
    type: 'ImageGallery';
    items: ImageGalleryItem[];  // От 1 до 10 элементов
}

export interface ImageGalleryStep1 {
    addItem(item: ImageGalleryItem): ImageGalleryStep2;
}

export interface ImageGalleryStep2 {
    addItem(item: ImageGalleryItem): ImageGalleryStep2;
    build(): ImageGalleryCard;
}