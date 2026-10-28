import { unwrapResolverError } from '@apollo/server/errors';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GraphQLFormattedError } from 'graphql';

const logger = new Logger('GraphQL');

const CODES: Partial<Record<number, string>> = {
  [HttpStatus.BAD_REQUEST]: 'BAD_REQUEST',
  [HttpStatus.UNAUTHORIZED]: 'UNAUTHENTICATED',
  [HttpStatus.FORBIDDEN]: 'FORBIDDEN',
  [HttpStatus.NOT_FOUND]: 'NOT_FOUND',
};

/**
 * HttpException → понятный GraphQL-код без служебного originalError.
 * Прочие ошибки резолверов (Prisma и т.п.) логируются, а клиенту уходит общее сообщение.
 * Ошибки валидации и парсинга запроса проходят как есть.
 */
export function formatGraphQLError(formatted: GraphQLFormattedError, error: unknown): GraphQLFormattedError {
  const original = unwrapResolverError(error);
  const { originalError: _, ...extensions } = formatted.extensions ?? {};

  if (original instanceof HttpException) {
    const status = original.getStatus();
    return {
      ...formatted,
      message: original.message,
      extensions: { code: CODES[status] ?? 'INTERNAL_SERVER_ERROR', status },
    };
  }

  if (extensions.code === 'INTERNAL_SERVER_ERROR') {
    logger.error(original instanceof Error ? (original.stack ?? original.message) : String(original));
    return { ...formatted, message: 'Internal server error', extensions: { code: 'INTERNAL_SERVER_ERROR' } };
  }

  return { ...formatted, extensions };
}
