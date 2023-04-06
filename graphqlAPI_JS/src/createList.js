import { util } from "@aws-appsync/utils";

export function request(ctx) {
  // const { list } = ctx.args;
  // const { title } = list;

  return {
    operation: "PutItem",
    key: {
      id: util.dynamodb.toDynamoDB(util.autoId()),
    },
    attributeValues: {
      title: util.dynamodb.toDynamoDB("coucou"),
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
  console.log(ctx.result);
  return ctx.result;
}
