import { Button } from "../interfaces";

export interface BigImageCard {
    type: 'BigImage';
    image_id: string;
    title: string;
    description: string;
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

export class BigImageCardBuilder implements StepSetImageId, StepSetTitle, StepSetDescription, StepSetButton, StepBuild {
    private card: Partial<BigImageCard> = { type: 'BigImage' };

    private constructor() {}

    static create(): StepSetImageId {
        return new BigImageCardBuilder();
    }

    setImageId(id: string): StepSetTitle {
        this.card.image_id = id;
        return this;
    }

    setTitle(title: string): StepSetDescription {
        this.card.title = title;
        return this;
    }

    setDescription(description: string): StepSetButton {
        this.card.description = description;
        return this;
    }

    setButton(button: Button): StepBuild {
        this.card.button = button;
        return this;
    }

    build(): BigImageCard {
        if (!this.card.image_id || !this.card.title || !this.card.description || !this.card.button) {
            throw new Error("Missing required fields in BigImageCard");
        }

        return this.card as BigImageCard;
    }
}