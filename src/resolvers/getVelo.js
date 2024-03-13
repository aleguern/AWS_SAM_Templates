import * as ddb from '@aws-appsync/utils/dynamodb';

export function request(ctx) {
    const { arguments: { id } } = ctx;
    return ddb.get({ key: { id } });
}

export function response(ctx) {
    const { error, result } = ctx;
    if (error) {
        util.appendError(error.message, error.type);
    }
    return result;
}