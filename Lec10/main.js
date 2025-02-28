// Console Log Examples
console.log("I am Zainab");

// Using setTimeout Correctly
setTimeout(() => console.log("I am Zainab 02"), 200);

console.log("Hello");

// Callback Functions Example
console.log("Begin");
FetchUser(123, function(user){
    console.log(user);
});

function FetchUser(userid, callback){
    setTimeout(function(){
        const FetchUser = {
            id: userid,
            name: "Zainab",
            email: "zainab@gmail.com",
            age: 21
        };
        callback(FetchUser);
    }, 200);
}
console.log("End");

console.log("Before");

// Function to Send Email with Callback
function SendEmail(userEmail, callback){
    setTimeout(function(){
        const Response = {
            status: true
        };
        callback(Response);
    }, 3000);
}

SendEmail("zainab@gmail.com", function(response) {
    console.log("Email Sent Status:", response.status);
});

console.log("End");

// Promise Example
console.log("Start");
const promise = new Promise(function(resolve, reject){
    setTimeout(() => {
        reject(new Error("I am failed"));
    }, 2000);
});

promise.then(function (result) {
    console.log(result);
}).catch(function (error) {
    console.log("Error:", error.message);
});

// Handling Multiple Promises
const p1 = new Promise((resolve, reject) => {
    resolve(1);
});

const p2 = new Promise((resolve, reject) => {
    resolve(1);
});

Promise.all([p1, p2])
    .then(res => console.log(res))
    .catch(err => console.error("Error in promises:", err));

// Chaining Multiple API Calls with async/await
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

// Fetching Multiple URLs in Parallel
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
async function getGitData() {
    try {
        const response = await fetch('https://api.github.com/users/ZainabEman');
        const profile = await response.json();
        console.log(profile);
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

// Using Session Storage
sessionStorage.setItem('gitURL', 'https://api.github.com/users/ZainabEman');
console.log(sessionStorage.getItem('gitURL'));

// Handling Local Storage and JSON Operations
const users = [{name: 'Zainab', age: 21}, {name: 'Imama', age: 21}, {name: 'Noor', age: 21}];
localStorage.setItem('classData', JSON.stringify(users));
const retrievedData = JSON.parse(localStorage.getItem('classData'));
console.log(retrievedData);
