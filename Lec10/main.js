// Handling Multiple Promises
// Here we create two promises which resolve immediately with the value 1.
const p1 = new Promise((resolve, reject) => {
    resolve(1);
});

const p2 = new Promise((resolve, reject) => {
    resolve(1);
});

// Promise.all is used to handle multiple promises simultaneously.
// It waits for all promises to resolve, and then it returns an array of results.
Promise.all([p1, p2])
    .then(res => console.log(res))
    .catch(err => console.error("Error in promises:", err));

// Theoretical Note:
// `Promise.all` is particularly useful when you need to coordinate multiple asynchronous operations.
// It will reject as soon as one of the promises in the array rejects.
// If all promises resolve, it will return an array of the resolved values in the order they were provided.


//Chaining Multiple API Calls: You can chain API calls using async/await in a very readable manner:

async function getUserFollowers() {
    try {
        const user = await fetch('https://api.github.com/users/ZainabEman');
        const userInfo = await user.json();
        const followers = await fetch(userInfo.followers_url);
        const followersList = await followers.json();
        return followersList;
    } catch (error) {
        console.error("Failed to fetch followers:", error);
    }
}
//Parallel Promises: Use Promise.all to wait for multiple promises to resolve in parallel:

async function fetchMultipleUrls(urlArray) {
    try {
        const promiseArray = urlArray.map(url => fetch(url));
        const responses = await Promise.all(promiseArray);
        return await Promise.all(responses.map(res => res.json()));
    } catch (error) {
        console.error("Error fetching multiple URLs:", error);
    }
}









// Fetching Data from GitHub API
// This async function retrieves user data from the GitHub API.
async function getGitData() {
    try {
        const response = await fetch('https://api.github.com/users/ZainabEman');
        const profile = await response.json();
        console.log(profile);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

// Theoretical Note:
// Asynchronous functions allow handling asynchronous operations more succinctly.
// The `await` keyword pauses the function execution until the Promise resolves, making it easier to write clean async code.

// Additional Example:
// Handling errors in async functions using try-catch for robust error management.


// Using Session Storage
// Storing data in sessionStorage.
sessionStorage.setItem('gitURL', 'https://api.github.com/users/ZainabEman');
// Retrieving data from sessionStorage.
console.log(sessionStorage.getItem('gitURL'));

// Theoretical Note:
// Session storage is used to store data only for the duration of the page session.
// Data stored in sessionStorage gets cleared when the page session ends.


// Handling Local Storage and JSON Operations
// Storing an array of user objects in localStorage.
const users = [{name: 'Zainab', age: 21}, {name: 'Imama', age: 21}, {name: 'Noor', age: 21}];
localStorage.setItem('classData', JSON.stringify(users));
// Retrieving and parsing the data from localStorage.
const retrievedData = JSON.parse(localStorage.getItem('classData'));
console.log(retrievedData);

// Theoretical Note:
// localStorage is similar to sessionStorage but persists even when the browser window is closed.
// JSON.stringify() converts a JavaScript object to a JSON string,
// and JSON.parse() converts a JSON string back into a JavaScript object.

// Additional Example:
// Storing and retrieving complex data structures using JSON to handle data persistently across sessions.