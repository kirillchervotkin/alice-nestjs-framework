import { Button } from "../button";

/**
 * Интерфейс карточки с большим изображением для Яндекс.Диалогов
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

/**
 * Шаг установки идентификатора изображения
 */
export interface StepSetImageId {
    /**
     * Устанавливает ID изображения
     * @param id - Идентификатор изображения из Каталога изображений
     * @returns Следующий шаг: установка заголовка
     */
    setImageId(id: string): StepSetTitle;
}

/**
 * Шаг установки заголовка карточки
 */
export interface StepSetTitle {
    /**
     * Устанавливает заголовок карточки
     * @param title - Текст заголовка (максимум 128 символов)
     * @returns Следующий шаг: установка описания
     */
    setTitle(title: string): StepSetDescription;
}

/**
 * Шаг установки описания карточки
 */
export interface StepSetDescription {
    /**
     * Устанавливает описание карточки
     * @param description - Текст описания (максимум 256 символов)
     * @returns Следующий шаг: установка кнопки
     */
    setDescription(description: string): StepSetButton;
}

/**
 * Шаг установки кнопки действия
 */
export interface StepSetButton {
    /**
     * Устанавливает кнопку действия
     * @param button - Объект кнопки в формате Яндекс.Диалогов
     * @returns Следующий шаг: сборка финального объекта
     */
    setButton(button: Button): StepBuild;
}

/**
 * Финальный шаг сборки карточки
 */
export interface StepBuild {
    /**
     * Завершает построение карточки
     * @returns Готовый объект BigImageCard
     */
    build(): BigImageCard;
}