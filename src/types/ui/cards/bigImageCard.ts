import { Button } from "../button";

/**
 * Карточка с большим изображением
 */
export interface BigImageCard {
    type: 'BigImage';
    /** Идентификатор изображения */
    image_id: string;
    /** Заголовок изображения */
    title: string;
    /** Описание изображения */
    description: string;
    /** Кнопка действия */
    button: Button;
}

export interface StepSetImageId {
    setImageId(id: string): StepSetTitle;
}

export interface StepSetTitle {
    setTitle(title: string): StepSetDescription;
}

export interface StepSetDescription {
    setDescription(description: string): StepSetButton;
}

export interface StepSetButton {
    setButton(button: Button): StepBuild;
}

export interface StepBuild {
    build(): BigImageCard;
}