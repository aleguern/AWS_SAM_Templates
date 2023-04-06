import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const { args } = ctx;
  return {
    operation: "UpdateItem",
    key: {
      id: util.dynamodb.toDynamoDB(args.id),
    },
    update: {
      expression: "SET #title = :title",
      expressionNames: {
        "#title": "title",
      },
      expressionValues: {
        ":title": util.dynamodb.toDynamoDB(ctx.args.title),
      },
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
