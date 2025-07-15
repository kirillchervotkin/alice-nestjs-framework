import { z } from "zod";

// Создаем схемы для вложенных объектов
const EntitySchema = z.object({
  type: z.string(),
  tokens: z.object({
    start: z.number(),
    end: z.number(),
  }),
  value: z.union([z.string(), z.number(), z.boolean(), z.record(z.unknown())]),
});

const IntentSlotSchema = z.object({
  type: z.string(),
  value: z.union([z.string(), z.number(), z.boolean(), z.record(z.unknown())]),
});

export const SessionStateSchema = z.object({
  nextHandler: z.string().optional(),
  data: z.unknown().optional(),
});

const IntentSchema = z.object({
  slots: z.record(IntentSlotSchema),
});

const NLUSchema = z.object({
  tokens: z.array(z.string()),
  entities: z.array(EntitySchema),
  intents: z.record(IntentSchema).optional(),
}).optional();

const InterfacesSchema = z.object({
  screen: z.object({}).optional(),
  payments: z.object({}).optional(),
  account_linking: z.object({}).optional(),
  audio_player: z.object({}).optional(),
});

const MetaSchema = z.object({
  locale: z.string(),
  timezone: z.string(),
  client_id: z.string(),
  interfaces: InterfacesSchema,
});

const RequestSchema = z.object({
  type: z.union([
    z.literal("SimpleUtterance"),
    z.literal("ButtonPressed"),
    z.literal("Purchase.Confirmation"),
    z.literal("Show.Pull"),
  ]),
  command: z.string(),
  original_utterance: z.string(),
  markup: z
    .object({
      dangerous_context: z.boolean().optional(),
    })
    .optional(),
  payload: z.record(z.unknown()).optional(),
  nlu: NLUSchema,
});

const UserSchema = z.object({
  user_id: z.string(),
  access_token: z.string().optional(),
});

const ApplicationSchema = z.object({
  application_id: z.string(),
});

const SessionSchema = z.object({
  new: z.boolean(),
  message_id: z.number(),
  session_id: z.string(),
  skill_id: z.string(),
  user: UserSchema.optional(),
  application: ApplicationSchema,
  user_id: z.string().optional(), // Устаревшее поле
});

// Функция для создания основной схемы с поддержкой дженериков
export const AliceRequestSchema = <
  T extends z.ZodTypeAny = z.ZodUnknown,
  U extends z.ZodTypeAny = z.ZodUnknown,
  A extends z.ZodTypeAny = z.ZodUnknown
>(
  sessionStateSchema: T = z.unknown() as unknown as T,
  userStateSchema: U = z.unknown() as unknown as U,
  appStateSchema: A = z.unknown() as unknown as A
) =>
  z.object({
    meta: MetaSchema,
    request: RequestSchema,
    session: SessionSchema,
    state: z
      .object({
        session: sessionStateSchema.optional(),
        user: userStateSchema.optional(),
        application: appStateSchema.optional(),
      })
      .optional(),
    version: z.string(),
  });
