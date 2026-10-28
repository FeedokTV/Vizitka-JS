import { NotFoundException } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { formatGraphQLError } from './format-graphql-error';

const resolverError = (original: Error) =>
  new GraphQLError(original.message, { path: ['profile'], originalError: original });

describe('formatGraphQLError', () => {
  it('maps NotFoundException to NOT_FOUND without originalError', () => {
    const error = resolverError(new NotFoundException('Profile "x" not found'));
    const formatted = {
      message: error.message,
      path: ['profile'],
      extensions: { code: 'INTERNAL_SERVER_ERROR', originalError: { statusCode: 404 } },
    };

    expect(formatGraphQLError(formatted, error)).toEqual({
      message: 'Profile "x" not found',
      path: ['profile'],
      extensions: { code: 'NOT_FOUND', status: 404 },
    });
  });

  it('hides internal error details', () => {
    const error = resolverError(new Error('The table `public.Profile` does not exist'));
    const formatted = { message: error.message, extensions: { code: 'INTERNAL_SERVER_ERROR' } };

    expect(formatGraphQLError(formatted, error)).toEqual({
      message: 'Internal server error',
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  });

  it('passes validation errors through', () => {
    const formatted = { message: 'Cannot query field "foo"', extensions: { code: 'GRAPHQL_VALIDATION_FAILED' } };

    expect(formatGraphQLError(formatted, new GraphQLError(formatted.message))).toEqual(formatted);
  });
});
