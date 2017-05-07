/*******************************************************************************
 * This file contains functions that interact with a user
 ******************************************************************************/
import config from '../config.js';
import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from 'amazon-cognito-identity-js';

/*
 * returns a new CognitoUserPool object used for user auth
 */
function createUserPool() {
     const userPool = new CognitoUserPool({
         UserPoolId: config.cognito.USER_POOL_ID,
         ClientId: config.cognito.APP_CLIENT_ID
     });
     return userPool;
}

/*
 * Returns a new CognitoUser object
 */
function createCognitoUser(username) {
    const userPool = createUserPool();
    return new CognitoUser({
        Username: username,
        Pool:userPool
    });
}

/*
 * Returns a new AuthenticationDetails object that is used to authenticate
 * user with AWS Cognito
 */
function createUserAuthDetails(username, password) {
    const userCredentials = {
        Username: username,
        Password: password
    };
    return new AuthenticationDetails(userCredentials);
}

/*
 *
 */
function getSignedInUser() {
    const userPool = createUserPool();
    const cognitoUser = userPool.getCurrentUser();
    return cognitoUser;
}

/*
 *
 */
function getUserToken() {
    const cognitoUser = getSignedInUser();
    return new Promise((resolve, reject) => {
        if (cognitoUser===null) {
            reject(null)
        }
        cognitoUser.getSession((err, session) => {
            if(err) {
                reject("no signed in user");
            } else {
                resolve(session.getIdToken().jwtToken);
            }
        });
    });
}
export {createCognitoUser,
        createUserAuthDetails,
        getSignedInUser,
        getUserToken};
