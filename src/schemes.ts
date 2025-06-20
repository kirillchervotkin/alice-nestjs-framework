import { z, ZodSchema } from "zod";

export const AliceRequestSchema = <T extends ZodSchema>(sessionSchema: T) =>
    z.object({
        meta: z.object({
            locale: z.string(),
            timezone: z.string(),
            client_id: z.string(),
            interfaces: z.object({
                screen: z.object({}).optional(),
                account_linking: z.object({}).optional(),
                audio_player: z.object({}).optional()
            })
        }),
        request: z.object({
            type: z.enum(['SimpleUtterance', 'ButtonPressed', 'Purchase.Confirmation', 'Show.Pull']),
            command: z.string(),
            original_utterance: z.string(),
            markup: z.object({
                dangerous_context: z.boolean().optional()
            }).optional(),
            nlu: z.object({
                tokens: z.array(z.string()),
                entities: z.array(
                    z.object({
                        type: z.string(),
                        tokens: z.object({ start: z.number(), end: z.number() }),
                        value: z.union([z.string(), z.number(), z.boolean(), z.record(z.unknown())])
                    })
                ),
                intents: z.record(
                    z.object({
                        slots: z.record(
                            z.object({
                                type: z.string(),
                                value: z.union([z.string(), z.number(), z.boolean()])
                            })
                        )
                    })
                ).optional()
            })
        }).optional(),
        session: z.object({
            message_id: z.number(),
            session_id: z.string(),
            skill_id: z.string(),
            user: z.object({
                user_id: z.string(),
                access_token: z.string().optional()
            }).optional(),
            application: z.object({
                application_id: z.string()
            }),
            new: z.boolean()
        }),
        state: z.object({
            session: sessionSchema.optional(),
            user: z.record(z.unknown()).optional(),
            application: z.record(z.unknown()).optional()
        }),
        version: z.string().default("1.0")
    });

export const SessionSchema = z.object({
    nextHandler: z.string().optional(),
    data: z.unknown().optional()
});