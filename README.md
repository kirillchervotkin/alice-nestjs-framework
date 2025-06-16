# NestJS Alice Skill Framework
Фреймворк для создания навыков Алисы на NestJS с удобным API и автоматической маршрутизацией запросов.

## Основные возможности
- Автоматическая обработка входящих запросов от Яндекс Диалогов
- Формирование сложных ответов с кнопками и сохранением состояния
- Диалоговая маршрутизация на основе интентов и состояний
- TypeScript-декораторы для упрощения разработки

## Установка
```bash
npm install @kirillchervotkin/alice-nestjs-framework
```

## Быстрый старт

### 1. Создайте контроллер
```typescript
// src/alice.controller.ts
import { Controller } from '@nestjs/common';
import { 
  Intent, 
  Handler, 
  Data, 
  UserUtteranceDecorator, 
  SkillResponseBuilder,
  SkillResponse, 
  Unknown,
  UserUtterance,
  Button
} from '@kirillchervotkin/alice-nestjs-framework';

@Controller()
export class AliceController {
  // Обработчик когда пользователь запустил навык
  @Intent()
  start(): SkillResponse {
    return new SkillResponseBuilder('Привет! Как твои дела? ')
      .setData({ 'text' : 'Этот текст можно получить в следующем обработчике'}) //поле текст можно будет получить через декоратор @Data при следующем запросе
      .setNextHandler('NextHandler') //Следующий запрос будет обрабатывать методом с декоратором @Handler('NextHandler')
      .build();
  }

  // Обработчик NextHandler
  @Handler('NextHandler')
  nextHandler(@UserUtteranceDecorator() utterance: UserUtterance, @Data() data: any): SkillResponse {
    // Выведет 'Этот текст можно получить в следующем обработчике'
    console.log(data.text);
    
    if (utterance.command.includes('хорошо')) {
      return new SkillResponseBuilder('Рада что все хорошо!').build();
    } else {
      return new SkillResponseBuilder('Понятно!').build();
    }
  } // Добавлена закрывающая скобка

  // Обработчик нераспознанных команд
  @Unknown('Unknown')
  fallback():SkillResponse {
    const buttons: Button[] = [
    { title: 'Кнопка 1', hide: true },
    { title: 'Кнопка 2', hide: true },
  ];
    return new SkillResponseBuilder('Не поняла вас. Повторите пожалуйста.')
      .setPrependButton('Помощь', true) //Добавляет кнопку в начало, которая после нажатия исчезнет
      .setPrependButton('О навыке', false) //Добавляет кнопку в начало, которая после нажатия останется
      .setButton('О погоде', true) //Добавляет кнопку в конец, которая после нажатия исчезнет
      .setButtons(buttons) //Добавляет несколько кнопок
      .build();
  }

  // Обработчик интента с ID 'IntentID'
  @Intent('IntentID')
  intent(): SkillResponse {
    return new SkillResponse('Привет');
  }
}
```

### 2. Подключите middleware в приложении
```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IntentMiddleware } from '@kirillchervotkin/alice-nestjs-framework';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(IntentMiddleware); // Подключение обработчика Алисы
  await app.listen(3000);
}
bootstrap();
```

## Основные компоненты

### Жизненный цикл запроса
1. Поиск обработчика по иднетификтору интента из запроса (задается в консоле разработчика платформы Яндекс.Диалоги в разделе интенты)
2. Если не найден → поиск по идентификатору обработчика ( задается с помощью setNextHandler)
3. Если не найден → вызов `@Unknown`



### Декораторы для обработчиков
- **`@Intent()`** - обработка по идентификатору интента  
  ```typescript
  @Intent('IntentId')
  buyHandler() { ... }
  ```
- **`@Unknown()`** - обработка если запрос не соответствует ни одному интенту и не задан обработчик через setNextHandler  
  ```typescript
  @Intent('IntentId')
  buyHandler() { ... }
  ```
- **`@Handler()`** - обработка по идентификатору обработчика
  ```typescript
  @Handler('HandlerId')
  paymentHandler() { ... }
  ```

### Параметры обработчиков
- **`@Data()`** - данные из сессии  
  ```typescript
  getData(@Data() data: any) { ... }
  ```
- **`@UserUtteranceDecorator()`** - текст пользователя  
  ```typescript
  getUtterance(@UserUtteranceDecorator() utterance: UserUtterance) {
    console.log(utterance.command); // Текст после обработки
    console.log(utterance.originalUtterance); // Оригинальный текст
  }
  ```
### Авторизация
Для запуска OAuth-авторизации:
```typescript
new SkillResponseBuilder('Требуется авторизация')
  .setStartAccountLinking()
  .build();
```
## Ссылки
- [Официальная документация Яндекс.Диалогов](https://yandex.ru/dev/dialogs/alice/doc/about-docpage/)
- [Спецификация протокола запросов/ответов](https://yandex.ru/dev/dialogs/alice/doc/protocol-docpage/)
- [Работа с интентами и слоты](https://yandex.ru/dev/dialogs/alice/doc/nlu-docpage/)
- [Формирование ответов (кнопки, карточки)](https://yandex.ru/dev/dialogs/alice/doc/response-docpage/)
- [Авторизация пользователей](https://yandex.ru/dev/dialogs/alice/doc/oauth-docpage/)
- [Тестирование и публикация навыков](https://yandex.ru/dev/dialogs/alice/doc/publish-docpage/)


## Лицензия
MIT License. Используйте свободно для коммерческих и некоммерческих проектов.
