// const p1=new Promise((resolve, reject)=>{
//     resolve(1);
// })

// const p2=new Promise((resolve, reject)=>{
//     resolve(1);
// })

// Promise.all([p1,p2])
//     .then(res);

const git=fetch('Https://api.github.com/users/ZainabEman');
git.then(res=>res.json());
git.then(profile=>console.log(profile));