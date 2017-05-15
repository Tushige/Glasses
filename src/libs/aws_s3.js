import config from '../config.js';
import AWS from 'aws-sdk';

async function configureS3(userToken) {
    var bucket_name = config.S3.BUCKET_NAME;
    var bucket_region = config.S3.BUCKET_REGION;
    var identityPoolId = config.S3.IDENTITY_POOL_ID;
    var awsCognitoIdentityProvider = config.cognito.IDENTITY_PROVIDER;
    AWS.config.update({
        region: bucket_region,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: identityPoolId,
            Logins: {
                [awsCognitoIdentityProvider]: userToken
            }
        }),
    });
    await AWS.config.credentials.getPromise()
    /*don't do anything if worked, return rejection if failed*/
    .then((err) => {
        if (err) {
            return Promise.reject(err);
        }
    })
    .catch((err) => {
        return Promise.reject(err);
    });

    // create an AWS.S3 service object
    let s3 = new AWS.S3({
        apiVersion:'2006-03-01',
        params: {
            Bucket: bucket_name,
        },
    });
    return Promise.resolve(s3);
}

export {configureS3};
