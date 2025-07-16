/**
 * Пользовательский ввод (реплика) и его интерпретация
 * @see [Документация](https://yandex.ru/dev/dialogs/alice/doc/request.html#request__user-utterance-desc)
 */
export interface UserUtterance {
    /**
     * Полный текст пользовательского запроса
     @See [Документация](https://yandex.ru/dev/dialogs/alice/doc/ru/request-simpleutterance#request-desc)
     */
    originalUtterance: string;

    /**
     * Нормализованный текст запроса. 
     * В ходе нормализации текст очищается от знаков препинания, приводится к нижнему регистру, а числительные преобразуются в числа.
     * @See [Документация](https://yandex.ru/dev/dialogs/alice/doc/ru/request-simpleutterance#request-desc)
     */
    command: string;
}