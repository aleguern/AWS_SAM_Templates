import * as ddb from '@aws-appsync/utils/dynamodb';

export function request(ctx) {
  const {
    arguments: { input },
  } = ctx;
  return ddb.put({ item: input });
}

export function response(ctx) {
  const { error, result } = ctx;
  if (error) {
    util.appendError(error.message, error.type);
  }
  return result;
}
