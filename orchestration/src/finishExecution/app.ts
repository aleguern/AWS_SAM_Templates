import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StepFunctions } from 'aws-sdk';

const stepFunctions = new StepFunctions();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
        return { statusCode: 400, body: 'error' };
    }

    console.log(event.body);

    const taskToken = JSON.parse(event?.body).taskToken;

    await stepFunctions
        .sendTaskSuccess({
            taskToken,
            output: JSON.stringify({
                Payload: { message: 'this is patrick' },
            }),
        })
        .promise();

    return { statusCode: 200, body: 'success' };
};
