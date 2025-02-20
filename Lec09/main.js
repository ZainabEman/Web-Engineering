// console.log("i am zainab");
// setTimeout(Function(),console.log("i am zainab 02"), 200);
// console.log("hello");

//callback functions
// console.log("begin");
// FetchUser(123, function(user){console.log(user);});

// function FetchUser(userid, callback){
// setTimeout(function(){
//     const FetchUser={
//         id:userid,
//         name:"zainab",
//         email:"zainab@gmail.com",
//         age:21
//     };callback(FetchUser);
// }, 200)};
// console.log("end");


// console.log("before");
// function SendEmail(userEmail, callback){
//     setTimeout(function(){
//         const Response={
//             status:true
//         };callback(Response);
//     }, 3000)};


//     SendEmail("zainab@gmail.com", callback(response));
//     console.log("end");
    

// console.log("start");
// const promise= new Promise(function(resolve, reject){
//     setTimeout(
//         reject(new Error("i am filled"));
//         )
//         resolve(1),2000
//     );
// });

// console.log(promise);

// promise.then(function (result) {
//     console.log(result);
// })

const getAPI=fetch('https://api.github.com/users/ZainabEman');
getAPI.then((res)=> console.log(res));
getAPI.catch((err)=>console.log(err.message));

agex






