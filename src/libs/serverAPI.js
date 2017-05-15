/*
 * CRUD functions that interface with the Glasses API
 */
import config from '../config.js';

/*
 * Writes to DB
 * returns a promise
 */
function create(reading, userToken) {
    const url = config.APIGateway.URL+"/readings";
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

export {create};
