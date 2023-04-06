import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StepFunctions } from 'aws-sdk';

const stepFunctions = new StepFunctions();
const STEP_MACHINE_ARN = process.env.STEP_FUNCTION_ARN || '';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const params = {
            stateMachineArn: STEP_MACHINE_ARN,
            input: JSON.stringify(event),
        };
        await stepFunctions.startExecution(params).promise();
        return {
            statusCode: 200,
            body: 'Execution started',
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: 'Execution started',
        };
    }
};
