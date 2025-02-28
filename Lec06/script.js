// Immediately Invoked Function Expression (IIFE)
(function fun1(){
    console.log("I am invoked");
})();

// Function Expression
let greet = function fun1(name){
   return `Welcome ${name}`;
};

// Array Example
let arr = [1, 2, 3, 3, 4, 4, 1, 2];

// Function to detect duplicates in an array
const detectDuplicate = arr => arr.filter((item, index, self) => self.indexOf(item) !== index);
console.log("Duplicates in array:", detectDuplicate(arr));

// Arrow Function Example
const name1 = name => name;
console.log("Name Example:", name1("Zainab"));

// Function to check if an array has duplicates
const hasDuplicates = arr => arr.some((item, index) => arr.indexOf(item) !== index);
console.log("Has Duplicates (false expected):", hasDuplicates([1, 2, 3, 4, 5]));
console.log("Has Duplicates (true expected):", hasDuplicates([1, 2, 3, 4, 1]));

// Function Manipulator with Callbacks
let add = (a, b) => a + b;
let mul = (a, b) => a * b;
let manipulator = (val1, val2, func) => func(val1, val2);
console.log("Sum:", manipulator(3, 5, add));
console.log("Product:", manipulator(3, 5, mul));

// Counter Closure Example
function counter(){
    let count = 0;
    return function(){
        return count++;
    };
}
let increment = counter();
console.log("Increment Counter:", increment());
console.log("Increment Counter:", increment());

// Function with Rest Parameters
function multiply(...val){
    return val.reduce((product, num) => product * num, 1);
}
console.log("Multiplication of multiple numbers:", multiply(2, 3, 4, 5));

// Using setTimeout with Function
setTimeout(() => {
    console.log("Delayed Multiplication:", multiply(2, 3, 4)); 
}, 2000);

// DOM Manipulation Examples
let myEl = document.createElement("div");
let myButton = document.createElement("button");
myButton.innerText = "Zainab";
myEl.appendChild(myButton);
document.body.appendChild(myEl);

// Adding Event Listeners
let count = 0;
function incrementCounter(){
    return count++;
}
myButton.addEventListener("click", () => { alert('I am clicked'); });
myEl.addEventListener('click', incrementCounter);
myButton.addEventListener("mouseover", function() {
    myButton.style.color = "red";
});

// Selecting All Elements in Document
let elements = document.getElementsByTagName("*");
console.log("All elements in document:", elements);
for (let i = 0; i < elements.length; ++i) { 
    console.log(elements[i]);
}
