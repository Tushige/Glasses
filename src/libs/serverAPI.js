/*
 * CRUD functions that interface with the Glasses API
 */
import config from '../config.js';

/*
 * Writes to DB
 * returns a promise, where resolve value is the created reading object
 */
function createReading(reading, userToken) {
    const endpoint = '/readings';
    const url = config.APIGateway.URL+endpoint;
    reading = JSON.stringify(reading);
    console.log("creating the following:");
    console.log(reading);
    let myInit = {
        method: 'POST',
        headers: {
            "Authorization": userToken,
        },
        body: reading,
    };
    let createPromise = fetch(url, myInit);
    return createPromise.then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            return Promise.reject(new Error("reading list creation failed"));
        }
    })
    // fetch fails
    .catch((err) => {
        return Promise.reject(err);
    });
}

/*
 * retrieves all readings for the user
 * returns a promise, where resolve value is the reading object
 */
function getAllReadings(userToken) {
    console.log("making an API call");
    const endpoint = '/readings';
    const url = config.APIGateway.URL+endpoint;
    let myInit = {
        method: 'GET',
        headers: {
            "Authorization": userToken,
        },
    };
    let getAllPromise = fetch(url, myInit);
    return getAllPromise.then((response) => {
        if (response.status === 200) {
            // returns a promise
            return response.json();
        } else {
            return Promise.reject(new Error("reading list retrieval failed"));
        }
    })
    .catch((err) => {
        return Promise.reject(err);
    });
}

/*
 * retrieves a reading for the user
 * returns a promise, where resolve value is the reading object
 */
function getReading(userToken, readingId) {
    const endpoint = '/reading/'+readingId;
    const url = config.APIGateway.URL+endpoint;
    let myInit = {
        method: 'GET',
        headers: {
            "Authorization": userToken,
        },
    };
    let getPromise = fetch(url, myInit);
    return getPromise.then((response) => {
        if (response.status === 200) {
            // returns a promise
            return response.json();
        } else {
            return Promise.reject(new Error("reading retrieval failed"));
        }
    })
    .catch((err) => {
        return Promise.reject(err);
    });
}
export {createReading,
        getReading,
        getAllReadings};
