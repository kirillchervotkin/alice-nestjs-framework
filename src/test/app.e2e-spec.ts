import { Test, TestingModule } from '@nestjs/testing';
import { Controller, INestApplication, MiddlewareConsumer, NestModule } from '@nestjs/common';
import * as request from 'supertest';
import { IntentMiddleware } from '../intentMiddlware';
import { Intent, Unknown } from '../decorators';
import { Response } from 'supertest';
import { AliceRequest } from 'src/types/api/request';
import { AliceResponse } from 'src/types/api/response';
import { SkillResponseBuilder } from '../builders/skillResponseBuilder';

const REPLY_TEXT = 'Hello world';
const UNKNOWN_TEXT = 'Unknown intent';

@Controller()
export class AppController {
    @Intent('intentId')
    testRouting(): AliceResponse {
        console.log('test');
        return new SkillResponseBuilder(REPLY_TEXT).build();
    }
    @Intent()
    welcomeRouting(): AliceResponse {
        return new SkillResponseBuilder(REPLY_TEXT).build();
    }
    @Unknown()
    unknownRouting(): AliceResponse{
        return new SkillResponseBuilder('Unknown intent').build();
    }
}

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(IntentMiddleware)
            .forRoutes('*'); // Применяем ко всем роутам
    }
}


describe('Middleware routing (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [AppController],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should route request to intent handler when matching intent is present', () => {
        const aliceRequest: AliceRequest = {
            "meta": {
                "client_id": "ru.yandex.searchplugin/7.16 (none none; android 4.4.2)",
                "interfaces": { "screen": {} },
                "locale": "ru-RU",
                "timezone": "Europe/Moscow"
            },
            "request": {
                "command": "закажи пиццу пепперони",
                "nlu": {
                    "intents": {
                        "intentId": {
                            "slots": {
                                "pizza_type": {
                                    "type": "YANDEX.STRING",
                                    "value": "пепперони"
                                }
                            }
                        }
                    },
                    "tokens": ["закажи", "пиццу", "пепперони"],
                    "entities": []
                },
                "original_utterance": "закажи пиццу пепперони",
                "type": "SimpleUtterance"
            },
            "session": {
                "message_id": 0,
                "new": true,
                "session_id": "example_session_id",
                "skill_id": "example_skill_id",
                "user_id": "example_user_id",
                "application": { "application_id": "example_app_id" }
            },
            "version": "1.0"
        }

        return request(app.getHttpServer())
            .post('/')
            .send(aliceRequest)
            .expect(201)
            .expect((res: Response) => {
                const body: AliceResponse = res.body;
                console.log(body);
                expect(body.response.text).toEqual(REPLY_TEXT);
            });
    });

    it('should route welcome request to welcome handler on first launch', () => {
        const welcomeRequest: AliceRequest = {
            "meta": {
                "locale": "ru-RU",
                "timezone": "Europe/Moscow",
                "client_id": "ru.yandex.searchplugin/7.16 (none none; android 4.4.2)",
                "interfaces": {
                    "screen": {},
                    "account_linking": {},
                    "audio_player": {}
                }
            },
            "request": {
                "type": "SimpleUtterance",
                "command": "",
                "original_utterance": "запусти навык тест",
                "nlu": {
                    "tokens": ["запусти", "навык", "тест"],
                    "entities": []
                }
            },
            "session": {
                "new": true,
                "message_id": 0,
                "session_id": "2eac4854-fce721f3-b845abba-20d60",
                "skill_id": "3ad36498-f5rd-4079-a14b-788652932056",
                "user": {
                    "user_id": "6C91DA5198D1758C6A9F63A7C5CDDF09359F683B13A18A151FBF4C8B092BB0C2"
                },
                "application": {
                    "application_id": "47C73714B580ED2469056E71081159529FFC676A4E5B059D629A819E857DC2F8"
                }
            },
            "state": {
                "session": {},
                "user": {},
                "application": {}
            },
            "version": "1.0"
        }

        return request(app.getHttpServer())
            .post('/')
            .send(welcomeRequest)
            .expect(201)
            .expect((res: Response) => {
                const body: AliceResponse = res.body;
                console.log(body);
                // Проверяем обработку тела запроса
                expect(body.response.text).toEqual(REPLY_TEXT);
            });
    });

    it('should route to unknown handler when no matching intent found', () => {
        const unknownRequest: AliceRequest = 
                {
    meta: {
        locale: 'ru-RU',
        timezone: 'Europe/Moscow',
        client_id: 'abc123',
        interfaces: {
            screen: {},
            payments: {},
            account_linking: {},
            audio_player: {}
        }
    },
    request: {
        type: 'SimpleUtterance',
        command: 'hello word',
        original_utterance: 'hello word',
        markup: {
            dangerous_context: false
        },
        nlu: {
            tokens: ['hello', 'word'],
            entities: [],
            intents: {}
        }
    },
    session: {
        new: true,
        message_id: 1,
        session_id: 'session123',
        skill_id: 'skill456',
        application: {
            application_id: 'app789'
        }
    },
    version: '1.0'
}

        return request(app.getHttpServer())
            .post('/')
            .send(unknownRequest)
            .expect(201)
            .expect((res: Response) => {
                const body: AliceResponse = res.body;
                console.log(body);
                expect(body.response.text).toEqual(UNKNOWN_TEXT);
            });
    });
});