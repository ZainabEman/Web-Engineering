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
    resolve(1);
});

promise.then(function (result) {
    console.log(result);
}).catch(function (error) {
    console.log("Error:", error.message);
});s