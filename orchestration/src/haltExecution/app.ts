export const handler = async (event: { input: any; taskToken: string }): Promise<any> => {
    console.log('Lambda function invoked with event:', event.taskToken);
    return { result: 'success' };
};