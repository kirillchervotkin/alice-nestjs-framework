import { applyDecorators, createParamDecorator, ExecutionContext, Post, SetMetadata, UseFilters } from "@nestjs/common";
import { UserUtterance } from "./interfaces";
import { INTENT_KEY } from "./constants";

export const Data = createParamDecorator((_, ctx: ExecutionContext): unknown => {
  const request = ctx.switchToHttp().getRequest();
  const sessionData: unknown = request.body?.state?.session?.data ?? {};
  return sessionData;
});

export const UserUtteranceDecorator = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserUtterance => {
    const request = ctx.switchToHttp().getRequest();

    const originalUtterance: unknown = request.body?.request?.original_utterance;
    const safeOriginalUtterance: string = originalUtterance == null ? '' : String(originalUtterance);

    const command: unknown = request.body?.request?.command;
    const safeCommand: string = command == null ? '' : String(command);
    return {
      originalUtterance: safeOriginalUtterance,
      command: safeCommand
    };
  }
);

export const Intent = (intentId: string = '') => {
  return applyDecorators(
    SetMetadata(INTENT_KEY, intentId),
    Post(intentId)
  );
};

export const Handler = (handlerId: string) => {
  return applyDecorators(
    Post(`NextHandler${handlerId}`),
  )
}

export const Unknown = (handlerId: string) => {
  return applyDecorators(
    Post('unknown'),
  )
}