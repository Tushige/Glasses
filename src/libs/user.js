/*******************************************************************************
 *  @file user.js
 *  Contains functions that interact with a user object via Amazon AWS
 ******************************************************************************/
import config from '../config.js';
import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

/**
 *  @return {CognitoUserPool} - a new CognitoUserPool object used for user auth
 */
function createUserPool() {
     const userPool = new CognitoUserPool({
         UserPoolId: config.cognito.USER_POOL_ID,
         ClientId: config.cognito.APP_CLIENT_ID
     });
     return userPool;
}

/**
 *  @function - creates new CognitoUser object
 *            - CognitoUser object is created with a
 *              userPool in which that user is defined,
 *              and username
 *  @param username {String} - email address of user
 *  @return {CognitoUser} a new CognitoUser object
 */
function createCognitoUser(username) {
    const userPool = createUserPool();
    return new CognitoUser({
        Username: username,
        Pool:userPool
    });
}

/**
 *  @function - helper function to create user auth object to be used with AWS
 *  @param username {String} - user email
 *  @param password {String} - user password
 *  @return {AuthenticationDetails}
 *              that is used to authenticate
 *              user with AWS Cognito
 */
function createUserAuthDetails(username, password) {
    const userCredentials = {
        Username: username,
        Password: password
    };
    return new AuthenticationDetails(userCredentials);
}

/**
 *  @return {CognitoUser}:  the current signed in user or
 *                          null if no user found
 */
function getSignedInUser() {
    const userPool = createUserPool();
    const cognitoUser = userPool.getCurrentUser();
    return cognitoUser;
}

/**
 * Used in page loads to get currently signed in user's token
 * @return {Promise}
 *          Promise can resolve in 2 ways:
 *              1. user token if signed in user present
 *              2. null if there is no signed in user
 *          Promise rejects if session retrieval failed
 */
function getUserToken() {
    const cognitoUser = getSignedInUser();
    return new Promise((resolve, reject) => {
        if (cognitoUser===null) {
            resolve(null);
        }
        cognitoUser.getSession((err, session) => {
            if(err) {
                reject(err);
            } else {
                const token = session.getIdToken().jwtToken;
                if (token) {
                    resolve(token)
                }
                resolve(null);
            }
        });
    });
}
/**
 * @function - helper function to create a
 *             new CognitoUserAttribute object with the given name:value
 *             pair
 *           - used in Sign up
 */
function createCognitoUserAttribute(name, value) {
    const data = {
        Name: name,
        Value: value
    }
    return new CognitoUserAttribute(data);
}
/**
 * helper function to authenticate a user given credentials
 *  @param user {CognitoUser} - signed in user
 *  @param username {String} - user email
 *  @param password {String} - user password
 *  @return {Promise} - resolve returns userToken
 *                    - reject returns error message
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
