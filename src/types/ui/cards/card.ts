import { BigImageCard } from "./bigImageCard";
import { ImageGalleryCard } from "./imageGalleryCard";
import { ItemsListCard } from "./itemListCard";

/**
 * Объединенный тип карточки
 */
export type Card =
    | ImageGalleryCard
    | ItemsListCard
    | BigImageCard;



