// Console Logging Example
console.log("Hello, World!");

// Array Methods Demonstration
let fruits = ["apple", "mango", "orange", "apple", "mango"];

// Using indexOf to find the first occurrence of "apple"
console.log("Index of 'apple':", fruits.indexOf("apple"));

// Using forEach to convert values to uppercase (Note: forEach doesn't return a new array)
fruits.forEach((value, index, array) => array[index] = value.toUpperCase());
console.log("Uppercased Fruits:", fruits);

// Using map to create an HTML list format
let htmlListItem = fruits.map(val => `<li>${val}</li>`);
console.log("HTML List Items:", htmlListItem);

// Multidimensional array example
let values = [[1, 2, 3, 4, 5], [6, 7, 8]];

// Using reduce to concatenate an array into an HTML list
let result = fruits.reduce((acc, val) => acc + `<li>${val}</li>`, "<ul>") + "</ul>";
console.log("Generated HTML List:", result);

// Using reduce to flatten the nested array and find the maximum value
let flattenedArray = values.flat();
let max = Math.max(...flattenedArray);
console.log("Max value in the array:", max);

// String Operations
let str = 'hello ' + JSON.stringify(values); // Convert array to string representation
console.log("String representation:", str);
console.log("Sliced string (from index 2):", str.slice(2));

// Sets Example - To Store Unique Values
let uniqueFruits = new Set(fruits);
console.log("Unique Fruits Set:", uniqueFruits);

// Object Example
let person = {
  name: "Zainab",
  age: 21,
  isStudent: true,
  registeredCourses: {
    subject1: { title: "PF", isPassed: true },
  },
  displayName: function () {
    return this.name;
  }
};

// Creating a new object with Object.create
let person1 = Object.create(person);
person1.name = 'Imama';
person1.age = 21;

// Adding a new property to the person object
person["city"] = "Mars";

// Creating a copy of the person object with an additional property
let currentStudent = { ...person, grade: 'A' };
console.log("Current Student Object:", currentStudent);

// Additional Example: Using Object.keys & Object.values
console.log("Person Keys:", Object.keys(person));
console.log("Person Values:", Object.values(person));