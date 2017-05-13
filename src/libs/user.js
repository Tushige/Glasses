/*******************************************************************************
 * This file contains functions that interact with a user
 ******************************************************************************/
import config from '../config.js';
import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
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
 * {CognitoUser} @return: the current signed in user
 */
function getSignedInUser() {
    const userPool = createUserPool();
    const cognitoUser = userPool.getCurrentUser();
    return cognitoUser;
}

/*
 * Used in page loads to get currently signed in user's token
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
                const token = session.getIdToken().jwtToken;
                if (token) {
                    resolve(token)
                }
                reject("no signed in user");
            }
        });
    });
}
/*
 * returns a new CognitoUserAttribute object with the given name:value pair
 * used in Sign up
 */
function createCognitoUserAttribute(name, value) {
    const data = {
        Name: name,
        Value: value
    }
    return new CognitoUserAttribute(data);
}
/*
 * helper function to authenticate a user given credentials
 * resolve returns the user Token
 */
function authenticateUser(user=undefined, username, password) {
    if (user===undefined) {
        user = createCognitoUser(username);
    }
    const authDetails = createUserAuthDetails(username, password);

    return new Promise(function(resolve, reject) {
        user.authenticateUser(authDetails, {
            onSuccess: function(result) {
                resolve(result.getIdToken().getJwtToken());
            },
            onFailure: function(err) {
                reject(err);
            }
        });
    });
}
export {createCognitoUser,
        createUserPool,
        createUserAuthDetails,
        getSignedInUser,
        createCognitoUserAttribute,
        getUserToken,
        authenticateUser};
