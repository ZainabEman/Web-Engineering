// const p1=new Promise((resolve, reject)=>{
//     resolve(1);
// })

// const p2=new Promise((resolve, reject)=>{
//     resolve(1);
// })

// Promise.all([p1,p2])
//     .then(res);

//const git=fetch('Https://api.github.com/users/ZainabEman');
// git.then(res=>res.json());
// git.then(profile=>console.log(profile));

// async function getGitData(){
//     const git=fetch('Https://api.github.com/users/ZainabEman');
//     const profile=(await git).json();
//     console.log(profile);
// };

// sessionStorage.setItem('gitURL', 'Https://api.github.com/users/ZainabEman');
// console.log(sessionStorage.getItem('gitURL'));
 const user=[{name:'zainab', age:21},{name:'Imama', age:21},{name:'noor', age:21}];
 console.log(JSON.stringify(user.name));
 localStorage.setItem('classData',JSON.stringify(user));
 localStorage.setItem('classData',JSON.parse(user));