import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const id = ctx.args.id;

  return {
    operation: "GetItem",
    key: {
      id: util.dynamodb.toDynamoDB(id),
    },
  };
}
export function response(ctx) {
  const { version, ...values } = ctx.result;
  const result = { ...values };
  if (ctx.error) {
    const error = ctx.error;
    if (error) {
      return util.appendError(error.message, error.type, result, null);
    }
  }
  return ctx.result;
}
