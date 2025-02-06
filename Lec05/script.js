// (function fun1(){
//     console.log("i am invoked");

// })();



// let greet = function fun1(name){
//    return `welcome ${name}`;
// };
 let arr=[1,2,3,3,4,4,1,2];

// function detectDuplicate(arr){
//     for(i=0;i=arr.length;i++){
//         //logic to check duplicate
//     }
// }
//arrow function
//callback functions
// let name1=((name)=>{
//     return name;
// })();


 const hasDuplicates = arr => arr.filter((item, index, self) => self.indexOf(item) !== index).length > 0;

// console.log(hasDuplicates([1, 2, 3, 4, 5])); // false
// console.log(hasDuplicates([1, 2, 3, 4, 1])); // true

// const hasDuplicates = arr => arr.some((item, index) => arr.indexOf(item) !== index);

// // Example usage:
// console.log(hasDuplicates([1, 2, 3, 4, 5])); // false
// console.log(hasDuplicates([1, 2, 3, 4, 1])); // true

// let add = function sum(a,b){
//     return a + b;
// }

// let mul= function product(a,b){return a*b}

// let manipulator=(val1,val2,func)=>{return func(val1,val2)}
// function counter(){
//     let count=0;
//     return function(){
//          return counter++;
//     };
// };
// let increment =counter();
// console.log(increment());

function mul(...val){
    return val.reduce((product,num)=>product*num,1);
};

setTimeout(() => {
    console.log(mul(2, 3, 4)); 
}, 2000);