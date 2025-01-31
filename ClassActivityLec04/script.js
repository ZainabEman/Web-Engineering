// console.log("hello");
//let fruits=new Array("apple","mango","orange", "apple", "mango");
// // fruits.splice(1,1,"apple", "Orange","pear");
// console.log(fruits.indexOf("apple"));
//console.log(fruits.forEach((value)=>value.toUpperCase()));
//let htmlListItem=fruits.map(val=>"<li>"+val+"<li>");
//let value=[[1,2,3,4,5],[6,7,8]];
//let result=fruits.reduce(((acc,val)=>acc+"<li>"+val+"<li>"),"<ul>");
//let max=value.reduce(((acc,val)=>acc+","+val),value[0]);
//console.log(max);
//let str='hello'+value;
//console.log(str);
//console.log(str.slice(2));
//sets, no duplicate values e.g. to store session keys

let person ={
    name:'zainab',
    age:21,
    isStudent: true
};

// let person1=Object.create(person);
// person1.name='imama';
// person1.age=21;

let idVal="name";
person[idVal];

person["city"]="mars";