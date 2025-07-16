import { BadRequestException, Injectable, NestMiddleware, OnModuleInit} from "@nestjs/common";
import { ModulesContainer, Reflector } from "@nestjs/core";
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper";
import { Response, Request, NextFunction } from 'express';
import { AliceRequestSchema, SessionStateSchema } from "./schemes";
import { INTENT_KEY } from "./constants";

import { AliceRequest } from "./types/api/request";
import { SessionState } from "./types/api/sessionState";

@Injectable()
export class IntentMiddleware implements NestMiddleware, OnModuleInit {

    private allIntents: string[] = [];

    constructor(
        private readonly reflector: Reflector,
        private readonly modulesContainer: ModulesContainer
    ) { }

    onModuleInit() {
        this.collectAllIntents();
    }

    use(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('test');
            if (req.body?.request?.original_utterance === 'ping') {
                return res.status(200).json({ text: '' });
            }
            const validatedRequest: AliceRequest<SessionState> = this.validateRequest(req.body);
            req.url = this.determineRoute(validatedRequest);
            next();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private collectAllIntents() {
        const modules = [...this.modulesContainer.values()];

        for (const module of modules) {
            for (const controller of [...module.controllers.values()]) {
                this.scanControllerIntents(controller);
            }
        }

        this.allIntents = [...new Set(this.allIntents)];
    }

    private scanControllerIntents(controller: InstanceWrapper) {
        const instance = controller.instance;
        const prototype = Object.getPrototypeOf(instance);

        for (const methodName of Object.getOwnPropertyNames(prototype).filter(m => m !== 'constructor')) {
            const callback = prototype[methodName];
            const intent = this.reflector.get(INTENT_KEY, callback);

            if (intent) {
                this.allIntents.push(intent);
            }
        }
    }

    private validateRequest(body: unknown): AliceRequest<SessionState> {
        const result = AliceRequestSchema(SessionStateSchema).safeParse(body);

        if (!result.success) {
            throw new BadRequestException('Invalid Alice request');
        }

        return result.data;
    }

    private determineRoute(aliceRequest: AliceRequest<SessionState>): string {
        const intents = Object.keys(aliceRequest.request?.nlu?.intents || {});
        const command = aliceRequest.request?.command || '';
        const nextHandler = aliceRequest.state?.session?.nextHandler || '';

        const matchedIntents = intents.filter(intent =>
            this.allIntents.includes(intent)
        );

        if (matchedIntents.length) return `/${matchedIntents.pop()}`;
        if (nextHandler) return `/NextHandler${nextHandler}`;
        if (command) return '/unknown';
        return '/';
    }
}

