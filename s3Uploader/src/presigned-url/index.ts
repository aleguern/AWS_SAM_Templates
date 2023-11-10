import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';

const S3_BUCKET = process.env.S3_BUCKET || '';

const corsHeaders = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
};

const s3 = new AWS.S3();

export const handler: APIGatewayProxyHandler = async (event) => {
    const { filename, filetype } = JSON.parse(event.body || '');

    try {
        const signedUrl = await s3.getSignedUrlPromise('putObject', {
            Bucket: S3_BUCKET,
            Key: filename,
            ContentType: filetype, // Set the appropriate content type for your image
            Expires: 3600, // URL expiration time in seconds
        });

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ url: signedUrl }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Failed to generate presigned URL' }),
        };
    }
};
