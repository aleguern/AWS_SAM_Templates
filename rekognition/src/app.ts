import * as AWS from 'aws-sdk';
import { S3Event, S3Handler } from 'aws-lambda';

const rekognition = new AWS.Rekognition();
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || '';

export const handler: S3Handler = async (event: S3Event) => {
    const bucketName = event.Records[0].s3.bucket.name;
    const objectKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    const params: AWS.Rekognition.DetectLabelsRequest = {
        Image: {
            S3Object: {
                Bucket: bucketName,
                Name: objectKey,
            },
        },
        MaxLabels: 10,
        MinConfidence: 80,
    };

    try {
        const result = await rekognition.detectLabels(params).promise();
        console.log(`Labels detected in ${objectKey}:`, result.Labels);

        const labels = result.Labels?.filter((label) => label.Confidence && label.Confidence >= 80).map(
            (label) => label.Name,
        );

        const item = {
            ImageName: objectKey,
            Labels: labels,
        };

        const putParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
            TableName: TABLE_NAME,
            Item: item,
        };

        await dynamodb.put(putParams).promise();
        console.log(`Labels saved to DynamoDB for ${objectKey}`);
    } catch (error) {
        console.error(`Error detecting or saving labels for ${objectKey}:`, error);
    }
};
