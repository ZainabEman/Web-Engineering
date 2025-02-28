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


