export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  questions: Question[];
  completed?: boolean;
  score?: number;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  lessons: Lesson[];
}

export const levelsData: Level[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Master the core concepts and syntax of JavaScript",
    icon: "🟢",
    color: "#4A6FA5",
    completed: false,
    lessons: [
      {
        id: 1,
        title: "Introduction to JavaScript",
        content: `# Introduction to JavaScript

JavaScript is a versatile programming language used for web development. It allows you to add interactivity to websites, build web applications, and much more.

## Key Features:
- **Client-side scripting**
- **Dynamic content updates**
- **Event handling**
- **Asynchronous programming**

JavaScript was created in 1995 by Brendan Eich and has since become one of the most popular programming languages in the world.`,
        questions: [
          {
            id: 1,
            question: "What is JavaScript primarily used for?",
            options: [
              "Styling web pages",
              "Adding interactivity to websites",
              "Database management",
              "Image editing"
            ],
            correctAnswer: 1,
            explanation: "JavaScript is primarily used to add interactivity and dynamic behavior to websites. It runs in the browser and can manipulate HTML and CSS in real-time."
          },
          {
            id: 2,
            question: "Who created JavaScript?",
            options: [
              "Mark Zuckerberg",
              "Brendan Eich",
              "Linus Torvalds",
              "Bill Gates"
            ],
            correctAnswer: 1,
            explanation: "JavaScript was created by Brendan Eich in 1995 while working at Netscape Communications Corporation."
          },
          {
            id: 3,
            question: "Which of these is NOT a JavaScript data type?",
            options: [
              "String",
              "Number",
              "Float",
              "Boolean"
            ],
            correctAnswer: 2,
            explanation: "Float is not a separate data type in JavaScript. Numbers in JavaScript are all floating-point numbers (both integers and decimals)."
          },
          {
            id: 4,
            question: "Where can JavaScript code be executed?",
            options: [
              "Only in web browsers",
              "Only on servers",
              "In browsers, servers, and mobile devices",
              "Only on desktop computers"
            ],
            correctAnswer: 2,
            explanation: "JavaScript can run in web browsers (client-side), on servers (Node.js), and in mobile apps (React Native, NativeScript)."
          },
          {
            id: 5,
            question: "What does ECMAScript refer to?",
            options: [
              "A JavaScript framework",
              "The official standard for JavaScript",
              "A JavaScript library",
              "A type of JavaScript variable"
            ],
            correctAnswer: 1,
            explanation: "ECMAScript is the official standard specification for JavaScript. JavaScript is an implementation of the ECMAScript standard."
          }
        ]
      },
      {
        id: 2,
        title: "Variables and Data Types",
        content: `# Variables and Data Types

Variables are containers for storing data values. In JavaScript, you can declare variables using var, let, or const.

## Variable Declaration:
\`\`\`javascript
var name = "John"; // Old way
let age = 25; // Can be reassigned
const PI = 3.14; // Cannot be reassigned
\`\`\`

## Basic Data Types:
- **String**: Text values
- **Number**: Numeric values
- **Boolean**: true/false
- **Undefined**: Variable without a value
- **Null**: Intentional absence of value
- **Object**: Complex data structures`,
        questions: [
          {
            id: 1,
            question: "Which keyword creates a constant variable?",
            options: ["var", "let", "const", "static"],
            correctAnswer: 2,
            explanation: "The 'const' keyword creates a constant variable that cannot be reassigned. It must be initialized at declaration."
          },
          {
            id: 2,
            question: "What data type represents true/false values?",
            options: ["String", "Number", "Boolean", "Array"],
            correctAnswer: 2,
            explanation: "Boolean is the data type that represents true or false values. Named after George Boole."
          },
          {
            id: 3,
            question: "What is the value of an uninitialized variable?",
            options: ["null", "0", "undefined", "false"],
            correctAnswer: 2,
            explanation: "In JavaScript, variables that are declared but not initialized have the value 'undefined'."
          },
          {
            id: 4,
            question: "What is the difference between null and undefined?",
            options: [
              "null means empty, undefined means not declared",
              "They are exactly the same",
              "undefined is a number, null is an object",
              "null is for strings, undefined is for numbers"
            ],
            correctAnswer: 0,
            explanation: "null is an intentional absence of any object value, while undefined means a variable has been declared but not assigned a value."
          },
          {
            id: 5,
            question: "Which variable declaration is hoisted but not initialized?",
            options: ["let", "const", "var", "All of them"],
            correctAnswer: 2,
            explanation: "var declarations are hoisted and initialized with undefined, while let and const are hoisted but not initialized (temporal dead zone)."
          }
        ]
      },
      {
        id: 3,
        title: "Operators and Expressions",
        content: `# Operators and Expressions

Operators perform operations on variables and values.

## Arithmetic Operators:
\`\`\`javascript
let sum = 10 + 5;      // Addition
let diff = 10 - 5;     // Subtraction
let product = 10 * 5;  // Multiplication
let quotient = 10 / 5; // Division
let remainder = 10 % 3; // Modulus
\`\`\`

## Comparison Operators:
\`\`\`javascript
10 == "10"   // true (loose equality)
10 === "10"  // false (strict equality)
10 != "10"   // false
10 !== "10"  // true
\`\`\`

## Logical Operators:
\`\`\`javascript
true && false  // false (AND)
true || false  // true (OR)
!true          // false (NOT)
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is the result of: 5 + '5' in JavaScript?",
            options: ["10", "55", "Error", "undefined"],
            correctAnswer: 1,
            explanation: "JavaScript converts the number to string and concatenates: 5 + '5' = '55' (string concatenation)."
          },
          {
            id: 2,
            question: "What does the === operator check?",
            options: [
              "Only value equality",
              "Only type equality",
              "Both value and type equality",
              "Reference equality"
            ],
            correctAnswer: 2,
            explanation: "=== (strict equality) checks both value and type, while == (loose equality) performs type coercion."
          },
          {
            id: 3,
            question: "What is the result of: !(true && false) || true?",
            options: ["true", "false", "Error", "undefined"],
            correctAnswer: 0,
            explanation: "true && false = false, !false = true, true || true = true."
          },
          {
            id: 4,
            question: "What does the ternary operator do?",
            options: [
              "Creates three variables",
              "Checks three conditions",
              "Short form of if-else",
              "Performs three operations"
            ],
            correctAnswer: 2,
            explanation: "The ternary operator (condition ? expr1 : expr2) is a shorthand for if-else statements."
          },
          {
            id: 5,
            question: "What is the result of: 2 ** 3?",
            options: ["6", "8", "9", "23"],
            correctAnswer: 1,
            explanation: "** is the exponentiation operator. 2 ** 3 = 2 * 2 * 2 = 8."
          }
        ]
      },
      {
        id: 4,
        title: "Control Flow - If/Else",
        content: `# Control Flow - If/Else Statements

Conditional statements control the flow of execution based on conditions.

## Basic Syntax:
\`\`\`javascript
if (condition) {
  // code to execute if condition is true
} else if (anotherCondition) {
  // code to execute if anotherCondition is true
} else {
  // code to execute if all conditions are false
}
\`\`\`

## Examples:
\`\`\`javascript
let age = 18;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}
\`\`\`

## Nested If Statements:
\`\`\`javascript
let score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else {
  grade = "F";
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What will be logged: if (0) { console.log('true') } else { console.log('false') }",
            options: ["true", "false", "Error", "Nothing"],
            correctAnswer: 1,
            explanation: "0 is a falsy value in JavaScript, so the else block executes."
          },
          {
            id: 2,
            question: "Which of these is NOT a falsy value in JavaScript?",
            options: ["0", "''", "null", "'false'"],
            correctAnswer: 3,
            explanation: "'false' is a non-empty string, which is truthy. Falsy values are: false, 0, '', null, undefined, NaN."
          },
          {
            id: 3,
            question: "What is the purpose of else if statements?",
            options: [
              "To check multiple conditions in sequence",
              "To create infinite loops",
              "To declare variables conditionally",
              "To handle errors"
            ],
            correctAnswer: 0,
            explanation: "else if allows checking multiple conditions in sequence after an initial if statement."
          },
          {
            id: 4,
            question: "What will be logged: if ('hello') console.log('true');",
            options: ["true", "false", "Error", "Nothing"],
            correctAnswer: 0,
            explanation: "Non-empty strings are truthy in JavaScript, so 'hello' evaluates to true."
          },
          {
            id: 5,
            question: "How can you write a one-line if statement without braces?",
            options: [
              "if condition: statement",
              "if (condition) statement",
              "condition ? statement",
              "You cannot"
            ],
            correctAnswer: 1,
            explanation: "In JavaScript, you can write: if (condition) statement; but using braces is recommended for clarity."
          }
        ]
      },
      {
        id: 5,
        title: "Loops - For, While, Do-While",
        content: `# Loops in JavaScript

Loops execute a block of code multiple times.

## For Loop:
\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

## While Loop:
\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\`

## Do-While Loop:
\`\`\`javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
\`\`\`

## For...of Loop (for arrays):
\`\`\`javascript
const arr = [1, 2, 3];
for (const item of arr) {
  console.log(item);
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is the main difference between while and do-while loops?",
            options: [
              "do-while always executes at least once",
              "while is faster",
              "do-while can't use break",
              "There is no difference"
            ],
            correctAnswer: 0,
            explanation: "do-while executes the code block once before checking the condition, while while checks the condition first."
          },
          {
            id: 2,
            question: "What does break do in a loop?",
            options: [
              "Skips to the next iteration",
              "Exits the loop entirely",
              "Restarts the loop",
              "Pauses the loop"
            ],
            correctAnswer: 1,
            explanation: "break immediately terminates the loop and continues with the code after the loop."
          },
          {
            id: 3,
            question: "What does continue do in a loop?",
            options: [
              "Skips to the next iteration",
              "Exits the loop entirely",
              "Restarts the loop",
              "Pauses the loop"
            ],
            correctAnswer: 0,
            explanation: "continue skips the rest of the current iteration and moves to the next iteration of the loop."
          },
          {
            id: 4,
            question: "What is an infinite loop?",
            options: [
              "A loop that never ends",
              "A loop that runs once",
              "A loop with no condition",
              "A loop that only runs at night"
            ],
            correctAnswer: 0,
            explanation: "An infinite loop is a loop whose condition never becomes false, causing it to run indefinitely."
          },
          {
            id: 5,
            question: "Which loop is best for iterating over array elements?",
            options: ["for loop", "while loop", "for...of loop", "All are equal"],
            correctAnswer: 2,
            explanation: "for...of loop is specifically designed for iterating over iterable objects like arrays and is most readable for this purpose."
          }
        ]
      },
      {
        id: 6,
        title: "Functions - Declaration & Expression",
        content: `# Functions in JavaScript

Functions are reusable blocks of code that perform specific tasks.

## Function Declaration:
\`\`\`javascript
function greet(name) {
  return "Hello " + name;
}
\`\`\`

## Function Expression:
\`\`\`javascript
const greet = function(name) {
  return "Hello " + name;
};
\`\`\`

## Arrow Function (ES6+):
\`\`\`javascript
const greet = (name) => "Hello " + name;
\`\`\`

## Parameters and Arguments:
\`\`\`javascript
function multiply(a, b) {  // parameters
  return a * b;
}
multiply(5, 3);  // arguments
\`\`\`

## Default Parameters:
\`\`\`javascript
function greet(name = "Guest") {
  return "Hello " + name;
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "Which is NOT a way to declare a function?",
            options: [
              "Function Declaration",
              "Function Expression",
              "Arrow Function",
              "Variable Function"
            ],
            correctAnswer: 3,
            explanation: "Variable Function is not a valid term. The three main ways are Function Declaration, Function Expression, and Arrow Function."
          },
          {
            id: 2,
            question: "What do arrow functions not have?",
            options: [
              "Parameters",
              "Return statements",
              "Their own 'this' context",
              "Function body"
            ],
            correctAnswer: 2,
            explanation: "Arrow functions do not have their own 'this' context. They inherit 'this' from the parent scope."
          },
          {
            id: 3,
            question: "What is hoisting in JavaScript?",
            options: [
              "Moving variables to the top of their scope",
              "A type of function",
              "A loop construct",
              "An error handling technique"
            ],
            correctAnswer: 0,
            explanation: "Hoisting is JavaScript's behavior of moving declarations to the top of their containing scope during compilation."
          },
          {
            id: 4,
            question: "Which function type is NOT hoisted?",
            options: [
              "Function Declaration",
              "Function Expression",
              "Both are hoisted",
              "Neither are hoisted"
            ],
            correctAnswer: 1,
            explanation: "Function Declarations are hoisted, but Function Expressions are not."
          },
          {
            id: 5,
            question: "What is a pure function?",
            options: [
              "A function with no parameters",
              "A function that always returns the same output for the same input",
              "A function that uses only global variables",
              "A function written in TypeScript"
            ],
            correctAnswer: 1,
            explanation: "A pure function always returns the same result for the same arguments and has no side effects."
          }
        ]
      },
      {
        id: 7,
        title: "Arrays - Creation and Methods",
        content: `# Arrays in JavaScript

Arrays are ordered collections of values.

## Creating Arrays:
\`\`\`javascript
let fruits = ["apple", "banana", "orange"];
let numbers = new Array(1, 2, 3);
let empty = [];
\`\`\`

## Common Array Methods:

### Adding/Removing Elements:
\`\`\`javascript
fruits.push("grape");      // Add to end
fruits.pop();              // Remove from end
fruits.unshift("mango");   // Add to beginning
fruits.shift();            // Remove from beginning
\`\`\`

### Accessing Elements:
\`\`\`javascript
fruits[0];                 // First element
fruits[fruits.length - 1]; // Last element
\`\`\`

### Finding Elements:
\`\`\`javascript
fruits.indexOf("banana");  // Returns index
fruits.includes("apple");  // Returns boolean
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is the index of the first element in an array?",
            options: ["0", "1", "-1", "first"],
            correctAnswer: 0,
            explanation: "JavaScript arrays are zero-indexed, meaning the first element is at index 0."
          },
          {
            id: 2,
            question: "What does array.push() do?",
            options: [
              "Removes the first element",
              "Adds elements to the beginning",
              "Adds elements to the end",
              "Reverses the array"
            ],
            correctAnswer: 2,
            explanation: "push() adds one or more elements to the end of an array and returns the new length."
          },
          {
            id: 3,
            question: "How do you get the length of an array?",
            options: [
              "array.size",
              "array.length",
              "array.count",
              "array.size()"
            ],
            correctAnswer: 1,
            explanation: "The length property returns the number of elements in an array."
          },
          {
            id: 4,
            question: "What does array.splice() do?",
            options: [
              "Joins two arrays",
              "Adds/removes elements at specific positions",
              "Sorts the array",
              "Creates a copy of the array"
            ],
            correctAnswer: 1,
            explanation: "splice() changes the contents of an array by removing or replacing existing elements and/or adding new elements."
          },
          {
            id: 5,
            question: "What is a sparse array?",
            options: [
              "An array with holes",
              "A very large array",
              "An array with only numbers",
              "An array sorted in reverse"
            ],
            correctAnswer: 0,
            explanation: "A sparse array is an array where not all indices between 0 and length-1 have elements assigned to them."
          }
        ]
      },
      {
        id: 8,
        title: "Objects - Properties and Methods",
        content: `# Objects in JavaScript

Objects are collections of key-value pairs.

## Creating Objects:
\`\`\`javascript
// Object literal
let person = {
  name: "John",
  age: 30,
  city: "New York"
};

// Using new Object()
let car = new Object();
car.make = "Toyota";
car.model = "Camry";

// Using constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
let john = new Person("John", 30);
\`\`\`

## Accessing Properties:
\`\`\`javascript
person.name;      // Dot notation
person["age"];    // Bracket notation
\`\`\`

## Object Methods:
\`\`\`javascript
let person = {
  name: "John",
  greet: function() {
    return "Hello, " + this.name;
  }
};
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is the main purpose of objects in JavaScript?",
            options: [
              "To store collections of key-value pairs",
              "To create loops",
              "To handle errors",
              "To declare variables"
            ],
            correctAnswer: 0,
            explanation: "Objects are used to store collections of data and more complex entities as key-value pairs."
          },
          {
            id: 2,
            question: "What does 'this' refer to in an object method?",
            options: [
              "The global object",
              "The parent object",
              "The object containing the method",
              "The function itself"
            ],
            correctAnswer: 2,
            explanation: "In an object method, 'this' refers to the object that contains the method being called."
          },
          {
            id: 3,
            question: "How do you check if an object has a property?",
            options: [
              "object.hasProperty()",
              "object.contains()",
              "'property' in object",
              "object.checkProperty()"
            ],
            correctAnswer: 2,
            explanation: "The 'in' operator checks if a property exists in an object: 'property' in object."
          },
          {
            id: 4,
            question: "What is object destructuring?",
            options: [
              "Breaking an object into smaller objects",
              "Extracting properties into variables",
              "Deleting object properties",
              "Merging multiple objects"
            ],
            correctAnswer: 1,
            explanation: "Destructuring allows extracting multiple properties from an object into distinct variables."
          },
          {
            id: 5,
            question: "What is a constructor function?",
            options: [
              "A function that destroys objects",
              "A function that creates and initializes objects",
              "A function that sorts object properties",
              "A function that validates objects"
            ],
            correctAnswer: 1,
            explanation: "A constructor function is used to create multiple objects with the same structure and initialization."
          }
        ]
      },
      {
        id: 9,
        title: "Scope and Closures",
        content: `# Scope and Closures

## Scope Types:
### Global Scope:
\`\`\`javascript
var globalVar = "I'm global";
\`\`\`

### Function Scope:
\`\`\`javascript
function myFunction() {
  var functionVar = "I'm in function scope";
}
\`\`\`

### Block Scope (let/const):
\`\`\`javascript
if (true) {
  let blockVar = "I'm in block scope";
  const constVar = "I'm also block scoped";
}
\`\`\`

## Closures:
\`\`\`javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is scope in JavaScript?",
            options: [
              "The visibility and lifetime of variables",
              "A type of function",
              "A loop construct",
              "An error handling mechanism"
            ],
            correctAnswer: 0,
            explanation: "Scope determines the visibility and lifetime of variables and functions in different parts of your code."
          },
          {
            id: 2,
            question: "What is a closure?",
            options: [
              "A function with no parameters",
              "A function that remembers its lexical scope",
              "A way to close browser windows",
              "A type of loop"
            ],
            correctAnswer: 1,
            explanation: "A closure is a function that remembers the variables from the scope where it was created, even after that scope has closed."
          },
          {
            id: 3,
            question: "What is the difference between var and let?",
            options: [
              "var is block-scoped, let is function-scoped",
              "let is block-scoped, var is function-scoped",
              "They are exactly the same",
              "var is ES6, let is older"
            ],
            correctAnswer: 1,
            explanation: "let is block-scoped (only accessible within {}), while var is function-scoped (accessible within entire function)."
          },
          {
            id: 4,
            question: "What is lexical scope?",
            options: [
              "Scope determined at runtime",
              "Scope determined by the physical placement in code",
              "Scope that changes dynamically",
              "Scope shared between all functions"
            ],
            correctAnswer: 1,
            explanation: "Lexical scope means that scope is determined by the physical placement of variables and blocks in the code."
          },
          {
            id: 5,
            question: "What is the temporal dead zone?",
            options: [
              "A zone where variables don't exist",
              "The time between variable declaration and initialization",
              "A JavaScript error type",
              "A memory leak issue"
            ],
            correctAnswer: 1,
            explanation: "The temporal dead zone is the period between entering scope and being declared where let/const variables cannot be accessed."
          }
        ]
      },
      {
        id: 10,
        title: "ES6+ Features",
        content: `# Modern JavaScript Features (ES6+)

## Template Literals:
\`\`\`javascript
let name = "John";
let greeting = \`Hello, \${name}!\`;
\`\`\`

## Destructuring:
\`\`\`javascript
// Array destructuring
let [a, b] = [1, 2];

// Object destructuring
let {name, age} = {name: "John", age: 30};
\`\`\`

## Spread Operator:
\`\`\`javascript
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
\`\`\`

## Rest Parameters:
\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}
\`\`\`

## Default Parameters:
\`\`\`javascript
function greet(name = "Guest") {
  return \`Hello \${name}\`;
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What do template literals use instead of quotes?",
            options: ["Parentheses", "Backticks", "Square brackets", "Curly braces"],
            correctAnswer: 1,
            explanation: "Template literals use backticks (`) instead of single or double quotes."
          },
          {
            id: 2,
            question: "What does the spread operator (...) do?",
            options: [
              "Creates a copy of an array/object",
              "Spreads butter on toast",
              "Multiplies values",
              "Concatenates strings"
            ],
            correctAnswer: 0,
            explanation: "The spread operator creates a shallow copy of arrays/objects or expands them into individual elements."
          },
          {
            id: 3,
            question: "What is destructuring used for?",
            options: [
              "Extracting values from arrays/objects",
              "Destroying variables",
              "Creating complex structures",
              "Handling errors"
            ],
            correctAnswer: 0,
            explanation: "Destructuring allows extracting multiple values from arrays or properties from objects into distinct variables."
          },
          {
            id: 4,
            question: "What is the purpose of rest parameters?",
            options: [
              "To collect remaining arguments into an array",
              "To pause function execution",
              "To create infinite loops",
              "To handle async operations"
            ],
            correctAnswer: 0,
            explanation: "Rest parameters collect all remaining arguments into an array, allowing functions to accept any number of arguments."
          },
          {
            id: 5,
            question: "When was ES6 released?",
            options: ["2010", "2015", "2018", "2020"],
            correctAnswer: 1,
            explanation: "ES6 (ECMAScript 2015) was released in June 2015 and introduced many modern JavaScript features."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Intermediate JavaScript",
    description: "Master arrays, objects, DOM manipulation, and events",
    icon: "🔵",
    color: "#166088",
    completed: false,
    lessons: [
      {
        id: 11,
        title: "Array Methods - Map, Filter, Reduce",
        content: `# Advanced Array Methods

## map():
Transforms each element and returns new array.
\`\`\`javascript
let numbers = [1, 2, 3];
let doubled = numbers.map(n => n * 2); // [2, 4, 6]
\`\`\`

## filter():
Returns elements that pass a test.
\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];
let even = numbers.filter(n => n % 2 === 0); // [2, 4]
\`\`\`

## reduce():
Reduces array to single value.
\`\`\`javascript
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((acc, curr) => acc + curr, 0); // 10
\`\`\`

## find():
Returns first element that passes test.
\`\`\`javascript
let users = [{id: 1}, {id: 2}];
let user = users.find(u => u.id === 2); // {id: 2}
\`\`\`

## some() & every():
Check if some/all elements pass test.
\`\`\`javascript
let numbers = [1, 2, 3];
let hasEven = numbers.some(n => n % 2 === 0); // true
let allPositive = numbers.every(n => n > 0); // true
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What does array.map() return?",
            options: [
              "A modified original array",
              "A new array with transformed elements",
              "A single value",
              "The first matching element"
            ],
            correctAnswer: 1,
            explanation: "map() creates a new array with the results of calling a function on every element in the original array."
          },
          {
            id: 2,
            question: "What is the purpose of reduce()?",
            options: [
              "To reduce array length",
              "To transform array to single value",
              "To filter array elements",
              "To sort the array"
            ],
            correctAnswer: 1,
            explanation: "reduce() executes a reducer function on each element, resulting in a single output value."
          },
          {
            id: 3,
            question: "What does filter() do?",
            options: [
              "Creates new array with elements that pass test",
              "Removes all elements from array",
              "Changes original array elements",
              "Sorts array alphabetically"
            ],
            correctAnswer: 0,
            explanation: "filter() creates a new array with all elements that pass the test implemented by the provided function."
          },
          {
            id: 4,
            question: "What is the difference between find() and filter()?",
            options: [
              "find() returns first match, filter() returns all matches",
              "find() modifies original, filter() creates new",
              "find() works on objects, filter() on arrays",
              "There is no difference"
            ],
            correctAnswer: 0,
            explanation: "find() returns the first element that satisfies the condition, while filter() returns all elements that satisfy it."
          },
          {
            id: 5,
            question: "What is a callback function?",
            options: [
              "A function passed as argument to another function",
              "A function that calls itself",
              "A function that returns another function",
              "A function with no parameters"
            ],
            correctAnswer: 0,
            explanation: "A callback function is a function passed into another function as an argument to be executed later."
          }
        ]
      },
      {
        id: 12,
        title: "Object-Oriented Programming",
        content: `# Object-Oriented Programming in JavaScript

## Classes (ES6):
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
}

let john = new Person("John", 30);
\`\`\`

## Inheritance:
\`\`\`javascript
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    return \`\${this.name} is studying\`;
  }
}
\`\`\`

## Getters and Setters:
\`\`\`javascript
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  
  get area() {
    return Math.PI * this._radius ** 2;
  }
  
  set radius(value) {
    if (value > 0) this._radius = value;
  }
}
\`\`\`

## Static Methods:
\`\`\`javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }
}
MathUtils.add(2, 3); // 5
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is a class in JavaScript?",
            options: [
              "A blueprint for creating objects",
              "A type of function",
              "A collection of methods",
              "All of the above"
            ],
            correctAnswer: 0,
            explanation: "A class is a blueprint for creating objects with specific properties and methods."
          },
          {
            id: 2,
            question: "What does the 'new' keyword do?",
            options: [
              "Creates a new variable",
              "Creates an instance of a class",
              "Declares a new function",
              "Imports a module"
            ],
            correctAnswer: 1,
            explanation: "The 'new' keyword creates an instance of a class or constructor function."
          },
          {
            id: 3,
            question: "What is inheritance?",
            options: [
              "Creating new objects from existing ones",
              "Passing properties/methods from parent to child",
              "Copying object properties",
              "Destroying parent objects"
            ],
            correctAnswer: 1,
            explanation: "Inheritance allows a class to inherit properties and methods from another class."
          },
          {
            id: 4,
            question: "What does 'super()' do?",
            options: [
              "Calls the parent class constructor",
              "Creates a super variable",
              "Imports super powers",
              "Ends class definition"
            ],
            correctAnswer: 0,
            explanation: "super() calls the constructor of the parent class in a child class."
          },
          {
            id: 5,
            question: "What are static methods?",
            options: [
              "Methods called on class instances",
              "Methods called on the class itself",
              "Methods that don't move",
              "Methods that change state"
            ],
            correctAnswer: 1,
            explanation: "Static methods are called on the class itself, not on instances of the class."
          }
        ]
      },
      {
        id: 13,
        title: "Error Handling - Try/Catch",
        content: `# Error Handling in JavaScript

## Try/Catch/Finally:
\`\`\`javascript
try {
  // Code that might throw an error
  let result = riskyOperation();
} catch (error) {
  // Handle the error
  console.log("An error occurred:", error.message);
} finally {
  // Code that always runs
  console.log("Cleanup code");
}
\`\`\`

## Throwing Errors:
\`\`\`javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
\`\`\`

## Error Types:
\`\`\`javascript
try {
  // Code that might throw different errors
} catch (error) {
  if (error instanceof TypeError) {
    // Handle TypeError
  } else if (error instanceof ReferenceError) {
    // Handle ReferenceError
  } else {
    // Handle other errors
  }
}
\`\`\`

## Custom Errors:
\`\`\`javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is error handling?",
            options: [
              "Preventing all errors from occurring",
              "Gracefully dealing with runtime errors",
              "Ignoring errors in code",
              "Creating intentional errors"
            ],
            correctAnswer: 1,
            explanation: "Error handling is the process of responding to and recovering from error conditions in your program."
          },
          {
            id: 2,
            question: "What does the 'finally' block do?",
            options: [
              "Runs only if there's an error",
              "Runs only if there's no error",
              "Always runs after try/catch",
              "Prevents errors from occurring"
            ],
            correctAnswer: 2,
            explanation: "The finally block executes after try and catch blocks, regardless of whether an error occurred."
          },
          {
            id: 3,
            question: "What is the purpose of 'throw'?",
            options: [
              "To catch errors",
              "To create custom errors",
              "To ignore errors",
              "To log errors"
            ],
            correctAnswer: 1,
            explanation: "The throw statement allows you to create custom error messages and stop execution."
          },
          {
            id: 4,
            question: "What is a ReferenceError?",
            options: [
              "Error when variable doesn't exist",
              "Error when dividing by zero",
              "Error when type mismatch",
              "Error when memory is full"
            ],
            correctAnswer: 0,
            explanation: "ReferenceError occurs when trying to use a variable that hasn't been declared."
          },
          {
            id: 5,
            question: "What is defensive programming?",
            options: [
              "Writing code that anticipates errors",
              "Writing military software",
              "Protecting code from hackers",
              "Using try/catch everywhere"
            ],
            correctAnswer: 0,
            explanation: "Defensive programming involves writing code that anticipates and handles potential errors gracefully."
          }
        ]
      },
      {
        id: 14,
        title: "Asynchronous JavaScript - Callbacks",
        content: `# Asynchronous JavaScript - Callbacks

## Callback Functions:
\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
\`\`\`

## Handling Errors in Callbacks:
\`\`\`javascript
function readFile(path, callback) {
  // Simulating async operation
  setTimeout(() => {
    const error = Math.random() > 0.5 ? null : new Error("Read failed");
    const data = error ? null : "File content";
    callback(error, data);
  }, 1000);
}

readFile("/path", (error, data) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Data:", data);
  }
});
\`\`\`

## Callback Hell (Pyramid of Doom):
\`\`\`javascript
// Nested callbacks become hard to read
getData((data1) => {
  getMoreData(data1, (data2) => {
    getEvenMoreData(data2, (data3) => {
      console.log(data3);
    });
  });
});
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is asynchronous programming?",
            options: [
              "Executing code in parallel",
              "Executing code without waiting for previous operations",
              "Writing code that runs slowly",
              "A type of error handling"
            ],
            correctAnswer: 1,
            explanation: "Asynchronous programming allows code to run without blocking execution of other code."
          },
          {
            id: 2,
            question: "What is a callback function?",
            options: [
              "A function that calls another function",
              "A function passed as argument to be executed later",
              "A function that returns a value",
              "A function with no parameters"
            ],
            correctAnswer: 1,
            explanation: "A callback is a function passed as an argument to another function to be executed after its completion."
          },
          {
            id: 3,
            question: "What is callback hell?",
            options: [
              "When callbacks are too simple",
              "Deeply nested callbacks that are hard to read",
              "When callbacks execute too quickly",
              "A JavaScript error type"
            ],
            correctAnswer: 1,
            explanation: "Callback hell refers to multiple nested callbacks that make code difficult to read and maintain."
          },
          {
            id: 4,
            question: "What is the Node.js callback pattern?",
            options: [
              "callback(result)",
              "callback(error, result)",
              "callback()",
              "callback(data, error)"
            ],
            correctAnswer: 1,
            explanation: "The Node.js convention is: callback(error, result) where error is first argument."
          },
          {
            id: 5,
            question: "What problem do callbacks solve?",
            options: [
              "Making code run faster",
              "Handling asynchronous operations",
              "Reducing memory usage",
              "Improving code readability"
            ],
            correctAnswer: 1,
            explanation: "Callbacks allow handling asynchronous operations by executing code after an operation completes."
          }
        ]
      },
      {
        id: 15,
        title: "Promises - Then/Catch/Finally",
        content: `# Promises in JavaScript

## Creating Promises:
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Operation completed");
    } else {
      reject("Operation failed");
    }
  }, 1000);
});
\`\`\`

## Using Promises:
\`\`\`javascript
promise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Cleanup");
  });
\`\`\`

## Promise Chaining:
\`\`\`javascript
fetchData()
  .then(processData)
  .then(saveData)
  .then(() => console.log("All done"))
  .catch(handleError);
\`\`\`

## Promise Methods:
\`\`\`javascript
Promise.all([promise1, promise2]);    // Waits for all
Promise.race([promise1, promise2]);   // First to resolve/reject
Promise.allSettled([promise1, promise2]); // All complete
Promise.any([promise1, promise2]);    // First to resolve
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is a Promise in JavaScript?",
            options: [
              "A guarantee that code will run",
              "An object representing eventual completion/failure",
              "A type of function",
              "An error handling mechanism"
            ],
            correctAnswer: 1,
            explanation: "A Promise is an object representing the eventual completion or failure of an asynchronous operation."
          },
          {
            id: 2,
            question: "What are the three states of a Promise?",
            options: [
              "Pending, Resolved, Rejected",
              "Waiting, Done, Error",
              "Started, Running, Finished",
              "New, Active, Closed"
            ],
            correctAnswer: 0,
            explanation: "Promises have three states: pending (initial), fulfilled (resolved), and rejected."
          },
          {
            id: 3,
            question: "What does Promise.all() do?",
            options: [
              "Creates multiple promises",
              "Waits for all promises to resolve",
              "Races promises against each other",
              "Catches all promise errors"
            ],
            correctAnswer: 1,
            explanation: "Promise.all() waits for all promises in an array to resolve, or rejects if any promise rejects."
          },
          {
            id: 4,
            question: "What is promise chaining?",
            options: [
              "Linking multiple promises together",
              "Creating promise loops",
              "Breaking promises apart",
              "A type of error"
            ],
            correctAnswer: 0,
            explanation: "Promise chaining allows multiple .then() calls to handle sequential asynchronous operations."
          },
          {
            id: 5,
            question: "What's the difference between Promise.all() and Promise.allSettled()?",
            options: [
              "all() rejects if any fails, allSettled() waits for all",
              "all() is faster",
              "allSettled() only works with arrays",
              "There's no difference"
            ],
            correctAnswer: 0,
            explanation: "Promise.all() rejects immediately if any promise rejects, while Promise.allSettled() waits for all to settle."
          }
        ]
      },
      {
        id: 16,
        title: "Async/Await - Modern Async",
        content: `# Async/Await - Modern Asynchronous JavaScript

## Async Functions:
\`\`\`javascript
async function fetchData() {
  return "Data fetched";
}
\`\`\`

## Await Keyword:
\`\`\`javascript
async function getUser() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
\`\`\`

## Error Handling with Try/Catch:
\`\`\`javascript
async function processData() {
  try {
    const data = await fetchData();
    const result = await process(data);
    return result;
  } catch (error) {
    console.error("Processing failed:", error);
    throw error;
  }
}
\`\`\`

## Parallel Execution:
\`\`\`javascript
async function fetchAll() {
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ]);
  return { user, posts };
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What does the async keyword do?",
            options: [
              "Makes a function return a Promise",
              "Makes code run faster",
              "Creates asynchronous loops",
              "Handles errors automatically"
            ],
            correctAnswer: 0,
            explanation: "The async keyword makes a function return a Promise. It's syntactic sugar for Promises."
          },
          {
            id: 2,
            question: "What does await do?",
            options: [
              "Pauses execution until Promise settles",
              "Creates a new Promise",
              "Throws an error",
              "Speeds up Promise resolution"
            ],
            correctAnswer: 0,
            explanation: "await pauses the execution of an async function until the Promise is resolved or rejected."
          },
          {
            id: 3,
            question: "Can await be used outside async functions?",
            options: [
              "Yes, anywhere",
              "No, only inside async functions",
              "Only in global scope",
              "Only in Node.js"
            ],
            correctAnswer: 1,
            explanation: "await can only be used inside async functions (or at top-level in modules with top-level await)."
          },
          {
            id: 4,
            question: "What is the main advantage of async/await over Promises?",
            options: [
              "Better performance",
              "More readable, synchronous-like code",
              "Smaller file size",
              "Works in older browsers"
            ],
            correctAnswer: 1,
            explanation: "async/await makes asynchronous code look and behave more like synchronous code, improving readability."
          },
          {
            id: 5,
            question: "How do you handle errors in async/await?",
            options: [
              "Using .catch()",
              "Using try/catch blocks",
              "Using if/else statements",
              "Errors are handled automatically"
            ],
            correctAnswer: 1,
            explanation: "Errors in async/await are handled using traditional try/catch blocks."
          }
        ]
      },
      {
        id: 17,
        title: "DOM Manipulation Basics",
        content: `# DOM Manipulation Basics

## Selecting Elements:
\`\`\`javascript
// Single element
const header = document.getElementById('header');
const firstPara = document.querySelector('.paragraph');

// Multiple elements
const buttons = document.querySelectorAll('.btn');
const divs = document.getElementsByTagName('div');
\`\`\`

## Modifying Elements:
\`\`\`javascript
// Changing content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>';

// Changing attributes
element.setAttribute('id', 'new-id');
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('hidden');

// Changing styles
element.style.color = 'red';
element.style.backgroundColor = '#fff';
\`\`\`

## Creating Elements:
\`\`\`javascript
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
document.body.appendChild(newDiv);
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is the DOM?",
            options: [
              "Document Object Model - HTML as objects",
              "A type of database",
              "A JavaScript framework",
              "A programming language"
            ],
            correctAnswer: 0,
            explanation: "DOM is the Document Object Model, representing HTML documents as objects that can be manipulated with JavaScript."
          },
          {
            id: 2,
            question: "What's the difference between getElementById and querySelector?",
            options: [
              "getElementById is faster",
              "querySelector can use CSS selectors",
              "getElementById only works with IDs",
              "All of the above"
            ],
            correctAnswer: 3,
            explanation: "getElementById is faster and specific to IDs, while querySelector is more flexible with CSS selectors."
          },
          {
            id: 3,
            question: "What is the difference between textContent and innerHTML?",
            options: [
              "textContent is faster, innerHTML parses HTML",
              "They are identical",
              "innerHTML is for text only",
              "textContent creates HTML elements"
            ],
            correctAnswer: 0,
            explanation: "textContent gets/sets plain text, innerHTML gets/sets HTML content and parses it."
          },
          {
            id: 4,
            question: "How do you add a CSS class to an element?",
            options: [
              "element.addClass('class')",
              "element.className = 'class'",
              "element.classList.add('class')",
              "element.setClass('class')"
            ],
            correctAnswer: 2,
            explanation: "element.classList.add('className') adds a class to an element's class list."
          },
          {
            id: 5,
            question: "What does document.createElement() do?",
            options: [
              "Creates a new HTML element in memory",
              "Adds element to the page",
              "Deletes an element",
              "Modifies existing element"
            ],
            correctAnswer: 0,
            explanation: "createElement() creates a new element in memory but doesn't add it to the page until appended."
          }
        ]
      },
      {
        id: 18,
        title: "Event Handling",
        content: `# Event Handling in JavaScript

## Adding Event Listeners:
\`\`\`javascript
// Method 1: addEventListener
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
});

// Method 2: Inline handler
<button onclick="handleClick()">Click me</button>

// Method 3: Property
button.onclick = function() {
  console.log('Clicked');
};
\`\`\`

## Common Events:
\`\`\`javascript
// Mouse events
element.addEventListener('click', handleClick);
element.addEventListener('mouseover', handleHover);
element.addEventListener('mouseout', handleMouseOut);

// Keyboard events
element.addEventListener('keydown', handleKeyDown);
element.addEventListener('keyup', handleKeyUp);

// Form events
form.addEventListener('submit', handleSubmit);
input.addEventListener('change', handleChange);
input.addEventListener('input', handleInput);
\`\`\`

## Event Object:
\`\`\`javascript
element.addEventListener('click', function(event) {
  console.log(event.target);      // Element that triggered event
  console.log(event.type);        // Event type (click)
  console.log(event.clientX);     // Mouse X coordinate
  event.preventDefault();         // Prevent default behavior
  event.stopPropagation();        // Stop event bubbling
});
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is event handling?",
            options: [
              "Responding to user interactions",
              "Creating events programmatically",
              "Handling JavaScript errors",
              "Managing application state"
            ],
            correctAnswer: 0,
            explanation: "Event handling is writing code to respond to user interactions like clicks, keypresses, etc."
          },
          {
            id: 2,
            question: "What is event bubbling?",
            options: [
              "Events moving from child to parent elements",
              "Events creating sound effects",
              "Events happening multiple times",
              "Events that fail to execute"
            ],
            correctAnswer: 0,
            explanation: "Event bubbling is when an event starts at the target element and bubbles up through its ancestors."
          },
          {
            id: 3,
            question: "What does event.preventDefault() do?",
            options: [
              "Prevents event from bubbling",
              "Prevents default browser behavior",
              "Stops event propagation",
              "Cancels event listener"
            ],
            correctAnswer: 1,
            explanation: "preventDefault() stops the browser's default action for that event (like form submission)."
          },
          {
            id: 4,
            question: "What is event delegation?",
            options: [
              "Attaching listener to parent to handle child events",
              "Creating multiple event handlers",
              "Delegating events to another script",
              "A type of error handling"
            ],
            correctAnswer: 0,
            explanation: "Event delegation uses a single event listener on a parent to handle events from multiple children."
          },
          {
            id: 5,
            question: "How do you remove an event listener?",
            options: [
              "element.removeEventListener()",
              "element.deleteListener()",
              "element.clearEvents()",
              "You cannot remove listeners"
            ],
            correctAnswer: 0,
            explanation: "removeEventListener() removes an event listener previously added with addEventListener()."
          }
        ]
      },
      {
        id: 19,
        title: "Working with Dates",
        content: `# Working with Dates in JavaScript

## Creating Dates:
\`\`\`javascript
// Current date/time
const now = new Date();

// Specific date
const birthday = new Date('1990-05-15');
const specific = new Date(2024, 0, 31); // Jan 31, 2024

// From timestamp
const fromTimestamp = new Date(1643673600000);
\`\`\`

## Getting Date Components:
\`\`\`javascript
const date = new Date();

date.getFullYear();    // 2024
date.getMonth();       // 0-11 (0 = January)
date.getDate();        // 1-31
date.getDay();         // 0-6 (0 = Sunday)
date.getHours();       // 0-23
date.getMinutes();     // 0-59
date.getSeconds();     // 0-59
date.getMilliseconds(); // 0-999
date.getTime();        // Timestamp (ms since 1970)
\`\`\`

## Setting Date Components:
\`\`\`javascript
date.setFullYear(2025);
date.setMonth(5);      // June (0-indexed)
date.setDate(15);
date.setHours(14, 30, 0); // 2:30 PM
\`\`\`

## Formatting Dates:
\`\`\`javascript
date.toDateString();      // "Thu Jan 01 2024"
date.toISOString();       // "2024-01-01T00:00:00.000Z"
date.toLocaleDateString(); // Localized date string
date.toLocaleTimeString(); // Localized time string
\`\`\``,
        questions: [
          {
            id: 1,
            question: "How do you create a Date object for the current time?",
            options: [
              "new Date()",
              "Date.now()",
              "Date.current()",
              "new CurrentDate()"
            ],
            correctAnswer: 0,
            explanation: "new Date() with no arguments creates a Date object for the current date and time."
          },
          {
            id: 2,
            question: "What does getMonth() return for January?",
            options: ["0", "1", "Jan", "January"],
            correctAnswer: 0,
            explanation: "getMonth() returns 0-11, where 0 = January, 1 = February, etc."
          },
          {
            id: 3,
            question: "What is a Unix timestamp?",
            options: [
              "Milliseconds since Jan 1, 1970",
              "Seconds since computer was turned on",
              "Date in string format",
              "A type of clock"
            ],
            correctAnswer: 0,
            explanation: "Unix timestamp is milliseconds since January 1, 1970 (UTC)."
          },
          {
            id: 4,
            question: "What does Date.now() return?",
            options: [
              "Current timestamp in milliseconds",
              "Current date as string",
              "Date object for now",
              "Time in seconds"
            ],
            correctAnswer: 0,
            explanation: "Date.now() returns the number of milliseconds elapsed since January 1, 1970."
          },
          {
            id: 5,
            question: "How do you calculate the difference between two dates?",
            options: [
              "date2 - date1",
              "date1.difference(date2)",
              "Date.diff(date1, date2)",
              "date1.compare(date2)"
            ],
            correctAnswer: 0,
            explanation: "Subtracting two Date objects gives the difference in milliseconds: date2 - date1."
          }
        ]
      },
      {
        id: 20,
        title: "Regular Expressions",
        content: `# Regular Expressions in JavaScript

## Creating Regular Expressions:
\`\`\`javascript
// Literal notation
const regex1 = /pattern/flags;

// Constructor
const regex2 = new RegExp('pattern', 'flags');
\`\`\`

## Common Patterns:
\`\`\`javascript
/hello/           // Matches "hello"
/^hello/          // Starts with "hello"
/hello$/          // Ends with "hello"
/h.llo/           // Matches "h" + any char + "llo"
/h.*llo/          // Matches "h" + any chars + "llo"
/h[ae]llo/        // Matches "hallo" or "hello"
/h[^ae]llo/       // Matches NOT "hallo" or "hello"
/\\d/              // Any digit (0-9)
/\\w/              // Word character (a-z, A-Z, 0-9, _)
/\\s/              // Whitespace
/^[A-Z][a-z]+$/   // Capital letter followed by lowercase
/^\\d{3}-\\d{3}-\\d{4}$/ // US phone number format
\`\`\`

## Using RegExp Methods:
\`\`\`javascript
const regex = /hello/;
const str = "hello world";

regex.test(str);      // true (tests for match)
str.match(regex);     // ["hello"] (returns matches)
str.replace(regex, 'hi'); // "hi world"
str.search(regex);    // 0 (index of first match)
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What are regular expressions used for?",
            options: [
              "Pattern matching in strings",
              "Creating mathematical formulas",
              "Defining variables",
              "Handling errors"
            ],
            correctAnswer: 0,
            explanation: "Regular expressions are patterns used to match character combinations in strings."
          },
          {
            id: 2,
            question: "What does the 'g' flag mean in regex?",
            options: [
              "Global search (find all matches)",
              "Case-insensitive search",
              "Multiline search",
              "Sticky search"
            ],
            correctAnswer: 0,
            explanation: "The 'g' flag means global search - find all matches rather than stopping after first match."
          },
          {
            id: 3,
            question: "What does \\d match in regex?",
            options: [
              "Any digit (0-9)",
              "Any character",
              "Only the letter d",
              "Decimal point"
            ],
            correctAnswer: 0,
            explanation: "\\d matches any digit character (0-9)."
          },
          {
            id: 4,
            question: "What does the + quantifier mean?",
            options: [
              "One or more of the preceding element",
              "Zero or more of the preceding element",
              "Exactly one of the preceding element",
              "Zero or one of the preceding element"
            ],
            correctAnswer: 0,
            explanation: "+ means one or more occurrences of the preceding element."
          },
          {
            id: 5,
            question: "What does the ^ character mean at the start of a regex?",
            options: [
              "Start of string",
              "End of string",
              "Any character",
              "Literal ^ character"
            ],
            correctAnswer: 0,
            explanation: "^ at the beginning of a pattern matches the start of the string."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    description: "Master advanced concepts, APIs, and frameworks",
    icon: "🟡",
    color: "#DB5461",
    completed: false,
    lessons: [
      {
        id: 21,
        title: "Modules - Import/Export",
        content: `# JavaScript Modules

## Exporting:
\`\`\`javascript
// Named exports
export const pi = 3.14159;
export function double(x) { return x * 2; }
export class Calculator { /* ... */ }

// Default export
export default function main() { /* ... */ }

// Export list
const name = "John";
const age = 30;
export { name, age };

// Renaming exports
export { name as firstName, age };
\`\`\`

## Importing:
\`\`\`javascript
// Import named exports
import { pi, double } from './math.js';

// Import with different names
import { pi as PI, double as timesTwo } from './math.js';

// Import default export
import mainFunction from './app.js';

// Import everything
import * as math from './math.js';

// Import for side effects only
import './styles.css';
\`\`\`

## Dynamic Imports:
\`\`\`javascript
// Load module on demand
async function loadModule() {
  const module = await import('./module.js');
  module.doSomething();
}

// With error handling
try {
  const module = await import('./module.js');
} catch (error) {
  console.error('Failed to load module:', error);
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What are JavaScript modules?",
            options: [
              "Reusable pieces of code in separate files",
              "A type of function",
              "Built-in JavaScript objects",
              "HTML template files"
            ],
            correctAnswer: 0,
            explanation: "Modules are reusable pieces of code that can be exported from one file and imported in another."
          },
          {
            id: 2,
            question: "What is the difference between named and default exports?",
            options: [
              "Named can have multiple, default only one per module",
              "Default exports are faster",
              "Named exports are deprecated",
              "There's no difference"
            ],
            correctAnswer: 0,
            explanation: "A module can have multiple named exports but only one default export."
          },
          {
            id: 3,
            question: "What does import * as module from './file.js' do?",
            options: [
              "Imports all exports as an object",
              "Imports only default export",
              "Creates a new module",
              "Deletes the module"
            ],
            correctAnswer: 0,
            explanation: "The * syntax imports all exports from a module into a single object."
          },
          {
            id: 4,
            question: "What are dynamic imports?",
            options: [
              "Imports that load at runtime",
              "Faster imports",
              "Imports with animations",
              "A type of error"
            ],
            correctAnswer: 0,
            explanation: "Dynamic imports load modules at runtime using import() which returns a Promise."
          },
          {
            id: 5,
            question: "What is tree shaking?",
            options: [
              "Removing unused code during bundling",
              "A way to organize modules",
              "A JavaScript error",
              "A type of import"
            ],
            correctAnswer: 0,
            explanation: "Tree shaking is the process of removing unused code from the final bundle during build."
          }
        ]
      },
      {
        id: 22,
        title: "Local Storage & Session Storage",
        content: `# Web Storage API

## Local Storage:
\`\`\`javascript
// Save data
localStorage.setItem('username', 'john_doe');
localStorage.setItem('preferences', JSON.stringify({ theme: 'dark' }));

// Read data
const username = localStorage.getItem('username');
const prefs = JSON.parse(localStorage.getItem('preferences'));

// Remove data
localStorage.removeItem('username');

// Clear all
localStorage.clear();

// Check if key exists
if (localStorage.getItem('token')) {
  // User is logged in
}
\`\`\`

## Session Storage:
\`\`\`javascript
// Works same as localStorage but cleared when tab closes
sessionStorage.setItem('sessionId', 'abc123');
const sessionId = sessionStorage.getItem('sessionId');
\`\`\`

## Storage Events:
\`\`\`javascript
// Listen for storage changes across tabs
window.addEventListener('storage', (event) => {
  console.log('Key changed:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('Storage area:', event.storageArea);
});
\`\`\`

## Limitations:
\`\`\`javascript
// Storage limits (typically 5-10MB per origin)
// Only strings can be stored (use JSON.stringify/parse)
// Synchronous (can block main thread)
// Same-origin policy applies
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is localStorage used for?",
            options: [
              "Storing data persistently in browser",
              "Storing server-side data",
              "Temporary computation",
              "Network requests"
            ],
            correctAnswer: 0,
            explanation: "localStorage persists data across browser sessions until explicitly cleared."
          },
          {
            id: 2,
            question: "What's the difference between localStorage and sessionStorage?",
            options: [
              "localStorage persists, sessionStorage clears on tab close",
              "sessionStorage is faster",
              "localStorage has smaller limits",
              "They are identical"
            ],
            correctAnswer: 0,
            explanation: "sessionStorage clears when the browser tab closes, while localStorage persists."
          },
          {
            id: 3,
            question: "What data types can be stored in Web Storage?",
            options: [
              "Only strings",
              "Strings and numbers",
              "Any JavaScript type",
              "Only JSON objects"
            ],
            correctAnswer: 0,
            explanation: "Web Storage only stores strings. Objects must be converted with JSON.stringify()."
          },
          {
            id: 4,
            question: "What is the storage limit for localStorage?",
            options: [
              "Typically 5-10MB per origin",
              "Unlimited",
              "1MB",
              "100KB"
            ],
            correctAnswer: 0,
            explanation: "Most browsers allow 5-10MB per origin for localStorage."
          },
          {
            id: 5,
            question: "When does the storage event fire?",
            options: [
              "When localStorage changes in another tab",
              "When localStorage is read",
              "When browser closes",
              "On page load"
            ],
            correctAnswer: 0,
            explanation: "The storage event fires when localStorage is changed in another tab/window of the same origin."
          }
        ]
      },
      {
        id: 23,
        title: "Fetch API & AJAX",
        content: `# Fetch API for HTTP Requests

## Basic Fetch:
\`\`\`javascript
// GET request
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// With async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
\`\`\`

## POST Request with JSON:
\`\`\`javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com'
  })
})
.then(response => response.json())
.then(data => console.log('Success:', data));
\`\`\`

## Handling Response Status:
\`\`\`javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
\`\`\`

## Uploading Files:
\`\`\`javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('userId', '123');

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData
});
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What does the Fetch API return?",
            options: [
              "A Promise",
              "Immediate data",
              "A callback",
              "An event"
            ],
            correctAnswer: 0,
            explanation: "fetch() returns a Promise that resolves to the Response object."
          },
          {
            id: 2,
            question: "What's the default HTTP method for fetch()?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctAnswer: 0,
            explanation: "If no method is specified, fetch() defaults to GET."
          },
          {
            id: 3,
            question: "What does response.json() return?",
            options: [
              "A Promise that resolves to parsed JSON",
              "Immediate JSON object",
              "A string",
              "An array"
            ],
            correctAnswer: 0,
            explanation: "response.json() returns a Promise that resolves with the result of parsing the body text as JSON."
          },
          {
            id: 4,
            question: "How do you send JSON data in a POST request?",
            options: [
              "JSON.stringify() in body with Content-Type header",
              "Directly in body property",
              "As query parameters",
              "In headers"
            ],
            correctAnswer: 0,
            explanation: "JSON data must be stringified and sent with Content-Type: application/json header."
          },
          {
            id: 5,
            question: "What does response.ok check?",
            options: [
              "If status code is 200-299",
              "If response is JSON",
              "If request was sent",
              "If network is available"
            ],
            correctAnswer: 0,
            explanation: "response.ok is true if the HTTP status code is in the range 200-299."
          }
        ]
      },
      {
        id: 24,
        title: "Web Workers",
        content: `# Web Workers for Parallel Processing

## Creating a Worker:
\`\`\`javascript
// Main thread
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({ type: 'calculate', data: largeArray });

// Receive from worker
worker.onmessage = (event) => {
  console.log('Result from worker:', event.data);
};

// Handle errors
worker.onerror = (error) => {
  console.error('Worker error:', error);
};

// Terminate worker
worker.terminate();
\`\`\`

## Worker Script (worker.js):
\`\`\`javascript
// Worker thread
self.onmessage = (event) => {
  const { type, data } = event.data;
  
  if (type === 'calculate') {
    // Perform heavy computation
    const result = performHeavyCalculation(data);
    
    // Send result back
    self.postMessage(result);
  }
};

function performHeavyCalculation(data) {
  // CPU-intensive work here
  return data.map(x => x * 2);
}
\`\`\`

## Limitations:
\`\`\`javascript
// Workers cannot access:
// - DOM
// - window object
// - document object
// - parent objects

// Workers can access:
// - navigator
// - location (read-only)
// - XMLHttpRequest
// - fetch
// - WebSockets
// - IndexedDB
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What are Web Workers used for?",
            options: [
              "Running JavaScript in background threads",
              "Creating web pages",
              "Handling HTTP requests",
              "Storing data"
            ],
            correctAnswer: 0,
            explanation: "Web Workers run JavaScript in background threads separate from the main UI thread."
          },
          {
            id: 2,
            question: "Can Web Workers access the DOM?",
            options: [
              "No, they run in separate context",
              "Yes, directly",
              "Only with special permissions",
              "Sometimes"
            ],
            correctAnswer: 0,
            explanation: "Workers cannot access the DOM, window, or document objects directly."
          },
          {
            id: 3,
            question: "How do workers communicate with main thread?",
            options: [
              "Using postMessage() and onmessage",
              "Direct function calls",
              "Global variables",
              "LocalStorage"
            ],
            correctAnswer: 0,
            explanation: "Workers use postMessage() to send messages and onmessage to receive them."
          },
          {
            id: 4,
            question: "What is a SharedWorker?",
            options: [
              "Worker shared between multiple tabs",
              "Worker with DOM access",
              "Faster worker",
              "Worker that shares memory"
            ],
            correctAnswer: 0,
            explanation: "SharedWorker can be accessed by multiple browsing contexts (windows, tabs, iframes)."
          },
          {
            id: 5,
            question: "When should you use Web Workers?",
            options: [
              "For CPU-intensive tasks",
              "For all JavaScript code",
              "Only for network requests",
              "For DOM manipulation"
            ],
            correctAnswer: 0,
            explanation: "Use Workers for heavy computations to avoid blocking the main UI thread."
          }
        ]
      },
      {
        id: 25,
        title: "Performance Optimization",
        content: `# JavaScript Performance Optimization

## Debouncing:
\`\`\`javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', debounce(function() {
  console.log('Searching:', this.value);
}, 300));
\`\`\`

## Throttling:
\`\`\`javascript
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
window.addEventListener('scroll', throttle(function() {
  console.log('Scrolling');
}, 100));
\`\`\`

## Memory Management:
\`\`\`javascript
// Avoid memory leaks
function createElement() {
  const element = document.createElement('div');
  // Remove event listeners when done
  element.addEventListener('click', handler);
  // Store reference for cleanup
  return {
    element,
    cleanup: () => {
      element.removeEventListener('click', handler);
      element.remove();
    }
  };
}

// Use WeakMap for private data
const privateData = new WeakMap();
class MyClass {
  constructor() {
    privateData.set(this, { secret: 42 });
  }
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is debouncing?",
            options: [
              "Delaying function execution until pause in calls",
              "Making functions faster",
              "A type of error",
              "Memory optimization"
            ],
            correctAnswer: 0,
            explanation: "Debouncing delays function execution until after a specified wait time has elapsed since the last time it was invoked."
          },
          {
            id: 2,
            question: "What is throttling?",
            options: [
              "Limiting function calls to once per time period",
              "Making functions slower",
              "A network technique",
              "Data compression"
            ],
            correctAnswer: 0,
            explanation: "Throttling ensures a function is called at most once in a specified time period."
          },
          {
            id: 3,
            question: "What is a memory leak?",
            options: [
              "Memory that is allocated but never freed",
              "Slow memory access",
              "Memory corruption",
              "Out of memory error"
            ],
            correctAnswer: 0,
            explanation: "A memory leak occurs when memory is allocated but not released when no longer needed."
          },
          {
            id: 4,
            question: "What is the purpose of requestAnimationFrame?",
            options: [
              "Smooth animations at 60fps",
              "Making HTTP requests",
              "Memory management",
              "Error handling"
            ],
            correctAnswer: 0,
            explanation: "requestAnimationFrame schedules a function to run before the next repaint, ideal for smooth animations."
          },
          {
            id: 5,
            question: "What is lazy loading?",
            options: [
              "Loading resources only when needed",
              "Slow loading on purpose",
              "A type of error",
              "Memory optimization"
            ],
            correctAnswer: 0,
            explanation: "Lazy loading delays loading of non-critical resources until they are needed."
          }
        ]
      },
      {
        id: 26,
        title: "Security Best Practices",
        content: `# JavaScript Security

## XSS Prevention:
\`\`\`javascript
// NEVER do this (XSS vulnerability)
element.innerHTML = userInput;

// DO this instead
element.textContent = userInput;

// If you must use HTML, sanitize it
function sanitizeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Or use DOMPurify library
// import DOMPurify from 'dompurify';
// element.innerHTML = DOMPurify.sanitize(userInput);
\`\`\`

## CSRF Protection:
\`\`\`javascript
// Include CSRF token in requests
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(data)
});
\`\`\`

## Content Security Policy (CSP):
\`\`\`html
<!-- In HTML meta tag -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://apis.example.com">
\`\`\`

## Safe Eval Alternatives:
\`\`\`javascript
// AVOID eval()
eval(userInput); // DANGEROUS!

// Use Function constructor (still be careful)
const safeEval = new Function('x', 'y', 'return x + y');
safeEval(2, 3); // 5

// Or use JSON.parse for JSON data
const data = JSON.parse(userJsonString);
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is XSS?",
            options: [
              "Cross-Site Scripting attack",
              "A JavaScript framework",
              "A type of variable",
              "XML parsing"
            ],
            correctAnswer: 0,
            explanation: "XSS (Cross-Site Scripting) allows attackers to inject malicious scripts into web pages."
          },
          {
            id: 2,
            question: "How can you prevent XSS?",
            options: [
              "Never use innerHTML with user input",
              "Use eval() for user input",
              "Store data in localStorage",
              "Use async/await"
            ],
            correctAnswer: 0,
            explanation: "Avoid using innerHTML with untrusted data. Use textContent or properly sanitize input."
          },
          {
            id: 3,
            question: "What is CSRF?",
            options: [
              "Cross-Site Request Forgery",
              "A JavaScript function",
              "A type of loop",
              "Content Security"
            ],
            correctAnswer: 0,
            explanation: "CSRF tricks users into performing actions they didn't intend on websites where they're authenticated."
          },
          {
            id: 4,
            question: "What is Content Security Policy?",
            options: [
              "Restricts resources browser can load",
              "A JavaScript security function",
              "A type of encryption",
              "Network security protocol"
            ],
            correctAnswer: 0,
            explanation: "CSP helps prevent XSS by specifying which resources the browser is allowed to load."
          },
          {
            id: 5,
            question: "Why is eval() dangerous?",
            options: [
              "Can execute arbitrary code",
              "It's slow",
              "Causes memory leaks",
              "Only works in browsers"
            ],
            correctAnswer: 0,
            explanation: "eval() executes any JavaScript code passed to it, making it vulnerable to code injection attacks."
          }
        ]
      },
      {
        id: 27,
        title: "Testing JavaScript",
        content: `# Testing JavaScript Code

## Unit Tests:
\`\`\`javascript
// Simple test function
function test(description, testFunction) {
  try {
    testFunction();
    console.log('✓', description);
  } catch (error) {
    console.error('✗', description);
    console.error(error);
  }
}

function add(a, b) {
  return a + b;
}

// Test cases
test('adds 1 + 2 to equal 3', () => {
  if (add(1, 2) !== 3) {
    throw new Error('Expected 3');
  }
});

test('adds negative numbers', () => {
  if (add(-1, -1) !== -2) {
    throw new Error('Expected -2');
  }
});
\`\`\`

## Test-Driven Development (TDD):
\`\`\`javascript
// 1. Write test first
test('multiply function works', () => {
  // Test will fail - multiply doesn't exist yet
  if (multiply(2, 3) !== 6) {
    throw new Error('Expected 6');
  }
});

// 2. Write minimal code to pass test
function multiply(a, b) {
  return a * b;
}

// 3. Refactor if needed
function multiply(a, b) {
  // More efficient implementation
  return a * b;
}
\`\`\`

## Mocking and Stubs:
\`\`\`javascript
// Mock fetch for testing
const originalFetch = window.fetch;

function mockFetch(data) {
  window.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => data
  });
}

// Restore after test
function restoreFetch() {
  window.fetch = originalFetch;
}

// Test using mock
test('fetch data', async () => {
  mockFetch({ user: 'John' });
  const data = await fetchUser();
  if (data.user !== 'John') {
    throw new Error('Expected John');
  }
  restoreFetch();
});
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is unit testing?",
            options: [
              "Testing individual units of code",
              "Testing entire application",
              "Testing user interface",
              "Testing network speed"
            ],
            correctAnswer: 0,
            explanation: "Unit testing tests individual units (functions, methods) of code in isolation."
          },
          {
            id: 2,
            question: "What is TDD?",
            options: [
              "Test-Driven Development",
              "Type-Driven Design",
              "Test Debugging Development",
              "Template Driven Development"
            ],
            correctAnswer: 0,
            explanation: "TDD is writing tests before writing the actual code."
          },
          {
            id: 3,
            question: "What is a mocking framework used for?",
            options: [
              "Creating fake objects for testing",
              "Making fun of code",
              "Performance testing",
              "Code compilation"
            ],
            correctAnswer: 0,
            explanation: "Mocking frameworks create fake objects that simulate real objects for testing."
          },
          {
            id: 4,
            question: "What is code coverage?",
            options: [
              "Percentage of code executed by tests",
              "Number of tests written",
              "Lines of code in project",
              "Test execution speed"
            ],
            correctAnswer: 0,
            explanation: "Code coverage measures what percentage of code is executed when tests run."
          },
          {
            id: 5,
            question: "What are integration tests?",
            options: [
              "Tests how different units work together",
              "Tests individual functions",
              "Tests only UI components",
              "Tests network connectivity"
            ],
            correctAnswer: 0,
            explanation: "Integration tests verify that different modules or services work together correctly."
          }
        ]
      },
      {
        id: 28,
        title: "Design Patterns",
        content: `# JavaScript Design Patterns

## Singleton Pattern:
\`\`\`javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    Database.instance = this;
    this.connection = null;
    return this;
  }
  
  connect() {
    this.connection = 'Connected';
    return this;
  }
}

// Usage
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true (same instance)
\`\`\`

## Factory Pattern:
\`\`\`javascript
class Car {
  constructor(model, year) {
    this.model = model;
    this.year = year;
  }
}

class CarFactory {
  createCar(type) {
    switch(type) {
      case 'sedan':
        return new Car('Sedan', 2024);
      case 'suv':
        return new Car('SUV', 2024);
      default:
        throw new Error('Unknown car type');
    }
  }
}

// Usage
const factory = new CarFactory();
const myCar = factory.createCar('sedan');
\`\`\`

## Observer Pattern:
\`\`\`javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('Received data:', data);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer();
subject.subscribe(observer1);
subject.notify('Hello!');
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What are design patterns?",
            options: [
              "Reusable solutions to common problems",
              "UI design templates",
              "Code formatting rules",
              "Testing methodologies"
            ],
            correctAnswer: 0,
            explanation: "Design patterns are reusable solutions to common software design problems."
          },
          {
            id: 2,
            question: "What is the Singleton pattern?",
            options: [
              "Ensures only one instance exists",
              "Creates multiple instances",
              "A type of function",
              "A looping pattern"
            ],
            correctAnswer: 0,
            explanation: "Singleton ensures a class has only one instance and provides global access to it."
          },
          {
            id: 3,
            question: "What is the Factory pattern?",
            options: [
              "Creates objects without specifying exact class",
              "Builds factories in code",
              "A manufacturing process",
              "A type of loop"
            ],
            correctAnswer: 0,
            explanation: "Factory pattern creates objects without exposing the creation logic to the client."
          },
          {
            id: 4,
            question: "What is the Observer pattern?",
            options: [
              "One-to-many dependency between objects",
              "Watching code execution",
              "A debugging tool",
              "A testing pattern"
            ],
            correctAnswer: 0,
            explanation: "Observer defines a one-to-many dependency so when one object changes state, all dependents are notified."
          },
          {
            id: 5,
            question: "What is the Module pattern?",
            options: [
              "Encapsulates code in modules",
              "Imports/export syntax",
              "A file organization method",
              "All of the above"
            ],
            correctAnswer: 3,
            explanation: "Module pattern encapsulates code, provides public/private access, and organizes code into modules."
          }
        ]
      },
      {
        id: 29,
        title: "TypeScript Basics",
        content: `# TypeScript - Typed JavaScript

## Basic Types:
\`\`\`typescript
let name: string = "John";
let age: number = 30;
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "coding"];
let person: { name: string, age: number } = { name: "John", age: 30 };

// Union types
let id: string | number = "abc123";
id = 123; // Also valid

// Type inference
let inferredString = "Hello"; // TypeScript infers 'string'
let inferredNumber = 42; // Infers 'number'
\`\`\`

## Interfaces:
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
  readonly createdAt: Date; // Readonly
}

const user: User = {
  id: 1,
  name: "John",
  createdAt: new Date()
};

// user.createdAt = new Date(); // Error: readonly
\`\`\`

## Functions with Types:
\`\`\`typescript
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;

// Optional parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting || "Hello"} \${name}\`;
}
\`\`\`

## Classes:
\`\`\`typescript
class Person {
  private id: number;
  public name: string;
  
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  
  public greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is TypeScript?",
            options: [
              "Typed superset of JavaScript",
              "A different programming language",
              "A JavaScript framework",
              "A testing tool"
            ],
            correctAnswer: 0,
            explanation: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript."
          },
          {
            id: 2,
            question: "What are the benefits of TypeScript?",
            options: [
              "Type safety and better tooling",
              "Faster execution",
              "Smaller file size",
              "Works without compilation"
            ],
            correctAnswer: 0,
            explanation: "TypeScript provides static typing, better IDE support, and catches errors at compile time."
          },
          {
            id: 3,
            question: "What does the '?' after a property name mean?",
            options: [
              "Optional property",
              "Required property",
              "Private property",
              "Readonly property"
            ],
            correctAnswer: 0,
            explanation: "The '?' makes a property optional in TypeScript interfaces and types."
          },
          {
            id: 4,
            question: "What is type inference?",
            options: [
              "TypeScript guessing types from values",
              "Manually declaring types",
              "A type of error",
              "Converting types"
            ],
            correctAnswer: 0,
            explanation: "TypeScript can infer types from values without explicit type annotations."
          },
          {
            id: 5,
            question: "What is a union type?",
            options: [
              "Value that can be multiple types",
              "Type that combines objects",
              "A type of variable",
              "A JavaScript operator"
            ],
            correctAnswer: 0,
            explanation: "Union types allow a value to be one of several types (e.g., string | number)."
          }
        ]
      },
      {
        id: 30,
        title: "React.js Fundamentals",
        content: `# React.js - Component Basics

## Functional Components:
\`\`\`jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using arrow function
const Button = ({ onClick, children }) => (
  <button onClick={onClick}>
    {children}
  </button>
);
\`\`\`

## JSX Syntax:
\`\`\`jsx
const element = (
  <div className="container">
    <h1>Hello World</h1>
    <p>This is JSX</p>
    <button onClick={() => console.log('Clicked')}>
      Click me
    </button>
  </div>
);
\`\`\`

## State with useState:
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook:
\`\`\`jsx
import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array = run once on mount
  
  return <div>{data ? data.message : 'Loading...'}</div>;
}
\`\`\``,
        questions: [
          {
            id: 1,
            question: "What is React?",
            options: [
              "A JavaScript library for building UIs",
              "A programming language",
              "A database system",
              "A testing framework"
            ],
            correctAnswer: 0,
            explanation: "React is a JavaScript library for building user interfaces, particularly single-page applications."
          },
          {
            id: 2,
            question: "What is JSX?",
            options: [
              "JavaScript XML - HTML-like syntax in JS",
              "A type of JavaScript",
              "A file format",
              "A React component"
            ],
            correctAnswer: 0,
            explanation: "JSX is a syntax extension that allows writing HTML-like code in JavaScript files."
          },
          {
            id: 3,
            question: "What are React hooks?",
            options: [
              "Functions that let you use React features",
              "A type of component",
              "Event handlers",
              "CSS styles"
            ],
            correctAnswer: 0,
            explanation: "Hooks are functions that let you use state and other React features in functional components."
          },
          {
            id: 4,
            question: "What does useState return?",
            options: [
              "Current state and setter function",
              "Just the state value",
              "A component",
              "An event handler"
            ],
            correctAnswer: 0,
            explanation: "useState returns an array with [currentState, setStateFunction]."
          },
          {
            id: 5,
            question: "What is the purpose of useEffect?",
            options: [
              "Handle side effects in components",
              "Create new components",
              "Style components",
              "Optimize performance"
            ],
            correctAnswer: 0,
            explanation: "useEffect handles side effects like data fetching, subscriptions, or manually changing the DOM."
          }
        ]
      }
    ]
  }
];

// Calculate total stats
export const totalStats = {
  levels: levelsData.length,
  lessons: levelsData.reduce((sum, level) => sum + level.lessons.length, 0),
  questions: levelsData.reduce((sum, level) => 
    sum + level.lessons.reduce((lessonSum, lesson) => 
      lessonSum + lesson.questions.length, 0
    ), 0
  )
};


// Helper to calculate level progress
export function calculateLevelProgress(levelId: number, progressData: any) {
  const level = levelsData.find(l => l.id === levelId);
  if (!level) return 0;
  
  const totalLessons = level.lessons.length;
  if (totalLessons === 0) return 0;
  
  const completedLessons = level.lessons.filter(lesson => 
    progressData.completedLessons.includes(lesson.id)
  ).length;
  
  return (completedLessons / totalLessons) * 100;
}

// Add this at the bottom of your questions.ts file
export function findLessonById(lessonId: number) {
  for (const level of levelsData) {
    for (const lesson of level.lessons) {
      if (lesson.id === lessonId) {
        return { lesson, level };
      }
    }
  }
  return null;
}