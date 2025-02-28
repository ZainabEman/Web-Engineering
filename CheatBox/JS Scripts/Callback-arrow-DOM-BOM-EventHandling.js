/**************************************************************************

 * 1. HIGHER-ORDER FUNCTIONS
 *    - A higher-order function (HOF) is a function that:
 *      1) Takes one or more functions as arguments, or
 *      2) Returns a function as its result.
 *    - Enables functional programming techniques in JavaScript.
 **************************************************************************/

/*----------------------
 *  A) Passing Functions as Arguments
 * ----------------------*/

function greet(name) {
    // - This function returns a greeting message
    return `Hello, ${name}!`;
}

function executeWithUser(func, userName) {
    // - This HOF receives a function (func) and userName
    // - It then calls the passed function with userName as an argument
    return func(userName);
}

// Test
console.log(executeWithUser(greet, "Alice"));
// - Output: "Hello, Alice!"

/*
 *  - Explanation:
 *    - greet is a regular function.
 *    - executeWithUser is a higher-order function because it accepts
 *      another function as a parameter.
 */


/*----------------------
 *  B) Returning Functions
 * ----------------------*/

function createMultiplier(multiplier) {
    // - Returns a new function that multiplies its input by "multiplier"
    return function (num) {
        return num * multiplier;
    };
}

// Usage
const double = createMultiplier(2);
console.log(double(5));
// - Output: 10

/*
 *  - Explanation:
 *    - createMultiplier is a higher-order function since it returns another function.
 *    - The returned function captures 'multiplier' from its parent scope (closure).
 */


/*----------------------
 *  C) Common Array Methods (map, filter, reduce)
 * ----------------------*/

const numbers = [1, 2, 3, 4, 5];

// map: transforms each element
const doubledNumbers = numbers.map(function(num) {
    return num * 2;
});
console.log(doubledNumbers);
// - Output: [2, 4, 6, 8, 10]

// filter: keeps only elements that match the condition
const evenNumbers = numbers.filter(function(num) {
    return num % 2 === 0;
});


console.log(evenNumbers);
// - Output: [2, 4]

// reduce: accumulates values into a single result
const sum = numbers.reduce(function(accumulator, current) {
    return accumulator + current;
}, 0);
console.log(sum);
// - Output: 15

/*
 *  - Explanation:
 *    - map, filter, and reduce are array methods that expect callback functions.
 *    - They are considered higher-order functions because they take functions
 *      as their arguments.
 */


/**************************************************************************
 * 2. DOM AND BOM
 *
 * DOM (Document Object Model):
 *  - Represents the structure of a web page in a tree format.
 *  - Allows JavaScript to access and manipulate HTML elements.
 *
 * BOM (Browser Object Model):
 *  - Represents browser APIs (window, navigator, location, history, localStorage, etc.).
 *  - Allows interaction with the browser environment outside the document.
 **************************************************************************/

/*----------------------
 *  A) Basic DOM Manipulation
 * ----------------------*/

// HTML reference:
// <div id="myDiv">Original Text</div>
// <button id="changeTextBtn">Change Text</button>

// Select elements
const myDiv = document.getElementById("myDiv");
const changeTextBtn = document.getElementById("changeTextBtn");

// Change text on button click
changeTextBtn.addEventListener("click", function() {
    myDiv.textContent = "Text has been changed!";
});

/*
 *  - Explanation:
 *    - We selected the button and the div using their IDs.
 *    - When the button is clicked, the textContent of the div is updated.
 */


/*----------------------
 *  B) Manipulating Styles and Classes
 * ----------------------*/

// HTML reference:
// <div id="styleDiv" class="box">Style Me</div>
// CSS reference:
// .box { width: 100px; height: 50px; background-color: lightblue; }

const styleDiv = document.getElementById("styleDiv");

// Change style directly
styleDiv.style.color = "red";
styleDiv.style.border = "2px solid black";

// Add or remove classes
styleDiv.classList.add("highlight");
// styleDiv.classList.remove("box");

/*
 *  - Explanation:
 *    - You can modify an element's style properties directly or
 *      add/remove classes for more scalable styling.
 */


/*----------------------
 *  C) BOM Examples
 * ----------------------*/

// Window dimensions
console.log("Window Width:", window.innerWidth);
console.log("Window Height:", window.innerHeight);

// Navigator info
console.log("Browser Info:", navigator.userAgent);

// Changing the location
// location.href = "https://example.com"; // - Redirects to a new URL
// location.reload();                     // - Reloads the current page

// Using localStorage
localStorage.setItem("user", "Bob");
const userFromStorage = localStorage.getItem("user");
console.log("User from localStorage:", userFromStorage);

/*
 *  - Explanation:
 *    - BOM includes global objects like window, navigator, location, and localStorage.
 *    - localStorage allows for storing key-value pairs in the browser persistently.
 */


/**************************************************************************
 * 3. EVENT HANDLING
 *
 * - Events are actions or occurrences in the browser
 *   (e.g., click, mouseover, keypress, submit).
 * - We use event listeners to run code in response to these events.
 **************************************************************************/

/*----------------------
 *  A) addEventListener
 * ----------------------*/

// HTML reference:
// <button id="clickMeBtn">Click Me</button>

const clickMeBtn = document.getElementById("clickMeBtn");

// Add a click event listener
clickMeBtn.addEventListener("click", function() {
    console.log("Button clicked!");
});

/*
 *  - Explanation:
 *    - addEventListener("click", callback) listens for clicks on the button
 *      and calls the callback when the event occurs.
 */


/*----------------------
 *  B) Other Event Types
 * ----------------------*/

// HTML reference:
// <input type="text" id="myInput" />

const myInput = document.getElementById("myInput");

// Keydown event listener
myInput.addEventListener("keydown", function(event) {
    console.log("Key pressed:", event.key);
});

// Mouseover event listener
myDiv.addEventListener("mouseover", function() {
    console.log("Mouse is over the div!");
});


/*----------------------
 *  C) Event Capturing and Bubbling
 * ----------------------*/

/*
 * <html>
 *  <body>
 *    <div id="parent" style="padding: 50px; background-color: lightblue;">
 *      Parent
 *      <div id="child" style="padding: 50px; background-color: lightgreen;">
 *        Child
 *      </div>
 *    </div>
 *  </body>
 * </html>
 */

const parent = document.getElementById("parent");
const child = document.getElementById("child");

// Capturing phase (3rd parameter = true for capture)
parent.addEventListener("click", function() {
    console.log("Parent capture");
}, true);

child.addEventListener("click", function() {
    console.log("Child capture");
}, true);

// Bubbling phase (3rd parameter = false for bubble, default)
parent.addEventListener("click", function() {
    console.log("Parent bubble");
}, false);

child.addEventListener("click", function() {
    console.log("Child bubble");
}, false);

/*
 *  - Explanation:
 *    - By default, events bubble up from the innermost element to outer elements.
 *    - Capturing goes from outer elements to the inner target.
 *    - The third parameter to addEventListener controls whether capturing or bubbling is used.
 */


/**************************************************************************
 * 4. CALLBACK FUNCTIONS
 *
 * - A callback function is a function passed as an argument
 *   to be executed after a certain operation is finished.
 * - They can be synchronous or asynchronous.
 **************************************************************************/

/*----------------------
 *  A) Synchronous Callback
 * ----------------------*/

function doSynchronousTask(callback) {
    console.log("Performing a synchronous task...");
    // Immediately call the callback
    callback();
}

doSynchronousTask(function() {
    console.log("Synchronous callback executed.");
});

/*
 *  - Explanation:
 *    - The callback is called right away, after the synchronous task finishes.
 */


/*----------------------
 *  B) Asynchronous Callback with setTimeout
 * ----------------------*/

function doAsynchronousTask(callback) {
    console.log("Starting an asynchronous task...");
    setTimeout(function() {
        console.log("Asynchronous task completed.");
        callback();
    }, 1000);
}

doAsynchronousTask(function() {
    console.log("Asynchronous callback executed.");
});

/*
 *  - Explanation:
 *    - setTimeout introduces a delay (1000ms). The callback runs after that delay.
 */


/*----------------------
 *  C) Asynchronous with Fetch (Promise-based)
 * ----------------------*/

// Uncomment the following in a live environment with a valid API endpoint:
/*
 * fetch("https://api.example.com/data")
 *  .then(function(response) {
 *    // Return the response as JSON
 *    return response.json();
 *  })
 *  .then(function(data) {
 *    console.log("Fetched data:", data);
 *  })
 *  .catch(function(error) {
 *    console.error("Error fetching data:", error);
 *  });
 */

/*
 *  - Explanation:
 *    - Fetch is an asynchronous call that returns a Promise.
 *    - The callbacks are passed to .then() and .catch().
 */


/*----------------------
 *  D) Custom Callback Example
 * ----------------------*/

function customOperation(data, onSuccess, onError) {
    // - Example: Validate data, then call onSuccess or onError
    if (data && typeof data === "string") {
        onSuccess(`Data "${data}" is valid!`);
    } else {
        onError("Invalid data provided!");
    }
}

// Usage
customOperation("Hello",
                function(successMessage) {
                    console.log("Success:", successMessage);
                },
                function(errorMessage) {
                    console.error("Error:", errorMessage);
                }
);

/*
 *  - Explanation:
 *    - customOperation takes two callbacks: onSuccess and onError.
 *    - Depending on the data validation, it calls the appropriate callback.
 */

/**************************************************************************
 * MCQS
 **************************************************************************/

/**************************************************************************
 * 1) HIGHER-ORDER FUNCTIONS
 **************************************************************************/
/*
 * 1) In JavaScript, a higher-order function is any function that takes one or more
 *   functions as arguments or returns another function, enabling composition.
 *
 * 2) Functions in JavaScript are first-class objects, so they can be passed
 *   as arguments or returned by other functions, a key aspect of higher-order
 *   functions.
 *
 * 3) Using closures, a higher-order function can produce specialized versions
 *   of the same function, known as partial application or currying.
 *
 * 4) Array methods like map, filter, and reduce are higher-order functions
 *   because they each accept a callback to process elements.
 *
 * 5) A function returning another function while capturing variables from its
 *   parent scope demonstrates both higher-order and closure behavior.
 *
 * 6) Composing multiple functions into a pipeline, such as f(g(x)), is made
 *   possible because functions can be treated as data (passed around).
 *
 * 7) Decorator patterns often rely on higher-order functions to wrap or augment
 *   an existing function without altering its internal code.
 *
 * 8) map() transforms each array element via the provided callback, returning
 *   a new array instead of modifying the original.
 *
 * 9) filter() invokes the callback for each array element and includes only
 *   those elements where the callback returns a truthy value.
 *
 * 10) reduce() iteratively combines elements into a single output by repeatedly
 *    calling a callback with an accumulator and the current element.
 *
 * 11) sort() can be passed a compareFunction callback, making it a higher-order
 *    function for custom sorting logic.
 *
 * 12) Logging or measuring execution time can be implemented by a higher-order
 *    function that wraps the original function and adds extra behavior.
 *
 * 13) Memoization uses a higher-order function that takes a function and returns
 *    a new one that caches results, improving performance for repeated calls.
 *
 * 14) Partial application occurs when a higher-order function consumes some
 *    arguments now and returns a new function for the remaining arguments later.
 *
 * 15) A function that orchestrates multiple callbacks in sequence is considered
 *    higher-order, as it manages other functions passed into it.
 *
 * 16) A multiplier function that returns another function (e.g., (factor) => (n) => n * factor)
 *    is a classic example of both higher-order function usage and closures.
 *
 * 17) Pipeline functions chain multiple operations together, commonly in a
 *    functional programming style facilitated by higher-order functions.
 *
 * 18) A higher-order function combining multiple function parameters (e.g., combine(f1, f2, data))
 *    shows how to orchestrate different transformations on the same input.
 *
 * 19) Anonymous callbacks are frequent in array methods, but named callbacks
 *    can aid in debugging, reflecting how first-class functions can be used.
 *
 * 20) Libraries like Ramda or Lodash rely on higher-order functions to provide
 *    composable utility methods for data transformations.
 */

/**************************************************************************
 * DOM (Document Object Model) - 20 Statements
 **************************************************************************/
/*
 * 1) The DOM represents an HTML or XML document as a hierarchical tree of nodes,
 *   allowing live updates and interactions with the page structure via JavaScript.
 *
 * 2) document.createElement("tag") generates a new DOM node, which can then be
 *   appended to any parent node with parent.appendChild(newElement).
 *
 * 3) The textContent property of a DOM element allows reading or overwriting
 *   its textual content without parsing or interpreting HTML tags.
 *
 * 4) querySelector() retrieves the first element matching a given CSS selector,
 *   and querySelectorAll() returns all matches as a static NodeList.
 *
 * 5) Modifying element.style changes inline styles directly, whereas toggling
 *   classes (using classList) is often more maintainable.
 *
 * 6) The DOMContentLoaded event fires when the initial HTML is parsed, letting
 *   you safely manipulate elements without waiting for images or frames to load.
 *
 * 7) Form elements can be accessed via the DOM to dynamically validate user
 *   input or modify fields in response to user actions.
 *
 * 8) Minimizing layout thrashing (frequent DOM reads and writes) can improve
 *   performance; batch DOM operations or use requestAnimationFrame.
 *
 * 9) The document object is the root for DOM manipulation, providing methods
 *   like getElementById(), querySelector(), and createTextNode().
 *
 * 10) classList allows you to add, remove, or toggle CSS classes on an element,
 *    enabling clean dynamic styling without manually editing the style property.
 *
 * 11) getElementById("myId") is a quick way to select an element based on its
 *    unique id attribute, returning null if none is found.
 *
 * 12) querySelectorAll(".myClass") returns a NodeList of all elements matching
 *    the selector, which can be iterated over with forEach() in modern browsers.
 *
 * 13) node.innerHTML can set or get the HTML content inside an element, but it
 *    can introduce XSS vulnerabilities if used with untrusted strings.
 *
 * 14) cloneNode(deep) duplicates an existing DOM node; passing true copies
 *    all child nodes, while false copies only the node itself.
 *
 * 15) The DOM is composed of multiple node types (element, text, comment), which
 *    together form a tree structure with parent-child relationships.
 *
 * 16) node.removeChild(childNode) removes a specified child node from its parent,
 *    useful for dynamically deleting elements from the page.
 *
 * 17) node.insertBefore(newNode, referenceNode) inserts a newNode into the DOM
 *    before referenceNode, allowing precise placement.
 *
 * 18) getComputedStyle(element) retrieves the final calculated CSS values for
 *    an element after applying all style rules and layout constraints.
 *
 * 19) element.scrollIntoView() scrolls the page until the element is visible
 *    in the viewport, optionally aligning it to top or bottom.
 *
 * 20) The DOM specification is maintained by the W3C, standardizing methods
 *    and interfaces across different browsers for consistent behavior.
 */

/**************************************************************************
 * BOM (Browser Object Model) - 20 Statements
 **************************************************************************/
/*
 * 1) The BOM includes browser-level objects like window, navigator, location,
 *   and history, which facilitate interactions beyond the DOM itself.
 *
 * 2) window is the global scope in a browser, holding properties like
 *   window.innerWidth and methods like alert().
 *
 * 3) The location object holds details of the current page URL and enables
 *   navigation or reloading via location.href and location.reload().
 *
 * 4) The navigator object provides metadata about the browser and platform,
 *   like navigator.userAgent, used for feature detection or analytics.
 *
 * 5) localStorage stores key-value pairs across browser sessions with no
 *   expiration, accessed via localStorage.setItem(key, value) and getItem(key).
 *
 * 6) The history API allows back/forward navigation with history.back(),
 *   history.forward(), and arbitrary moves using history.go().
 *
 * 7) screen exposes device display details like screen.width and screen.height,
 *   aiding responsive or analytics-based design.
 *
 * 8) You can listen for global events like resize or scroll on window, using
 *   window.addEventListener("resize", callback) for dynamic UI adjustments.
 *
 * 9) location.search contains the query string (e.g., ?param=value),
 *   used for client-side routing or passing data in links.
 *
 * 10) Modern browsers provide advanced BOM features like the Push API,
 *    Service Workers, and Notifications, broadening web app capabilities.
 *
 * 11) sessionStorage behaves like localStorage but persists data only for the
 *    current tab session, clearing when the tab is closed.
 *
 * 12) window.confirm(message) displays a modal dialog with OK/Cancel buttons,
 *    returning true if the user confirms, false otherwise.
 *
 * 13) setTimeout() and setInterval() belong to the window object, scheduling
 *    callbacks after a delay or repeatedly at fixed intervals.
 *
 * 14) document.cookie can read and write cookies, though localStorage or
 *    sessionStorage are preferred for simpler key-value data handling.
 *
 * 15) indexedDB is a more powerful browser storage API for structured data,
 *    allowing transactions and indexes beyond basic key-value pairs.
 *
 * 16) window.open(url, target) can open a new browser window or tab,
 *    subject to browser settings or user preferences.
 *
 * 17) navigator.geolocation, if supported, can obtain the user’s geographic
 *    location with permission, facilitating location-based services.
 *
 * 18) Many debugging tools (console.log(), console.error()) are part of
 *    the BOM console object, helping diagnose runtime issues.
 *
 * 19) window.matchMedia("(max-width: 600px)") returns a MediaQueryList that can
 *    detect layout changes and trigger callbacks for responsive behavior.
 *
 * 20) window.performance provides high-resolution timing APIs, letting you
 *    measure page load times, track user interactions, and optimize performance.
 */

/**************************************************************************
 * 3) EVENT HANDLING
 **************************************************************************/
/*
 * 1) Events in JavaScript can be user-initiated (click, keydown) or browser-initiated
 *   (DOMContentLoaded, load), triggering code in event listeners.
 *
 * 2) addEventListener(eventType, callback) is the standard way to bind
 *   multiple handlers without overwriting existing ones.
 *
 * 3) By default, events bubble up from the target to parent elements;
 *   event.stopPropagation() halts this upward traversal.
 *
 * 4) To enable event capturing (outer-to-inner), pass true as the third parameter
 *   to addEventListener, reversing the flow before the target is reached.
 *
 * 5) The event object includes details like event.target, the element that
 *   dispatched the event, and event.type, indicating which event fired.
 *
 * 6) Click events combine mousedown and mouseup on the same element, making
 *   them a primary form of user interaction for buttons and links.
 *
 * 7) Keyboard events such as keydown or keyup track user input, with event.key
 *   revealing the specific key pressed.
 *
 * 8) Mouse events like mouseover and mouseout detect pointer entry and exit
 *   on elements, often used for hover effects.
 *
 * 9) Pointer events unify mouse, touch, and pen interactions under a
 *   consistent API (pointerdown, pointermove, pointerup).
 *
 * 10) The submit event on a form can be intercepted to run client-side
 *    validation or AJAX, often with event.preventDefault() to block normal
 *    submission.
 *
 * 11) The dblclick event detects double-clicks, while contextmenu triggers
 *    on right-click, providing more interactive possibilities.
 *
 * 12) Event delegation lets a parent element handle events from child
 *    elements, improving performance by attaching fewer listeners.
 *
 * 13) Passive event listeners improve scrolling performance, indicating
 *    you won’t call preventDefault() in the listener (via { passive: true }).
 *
 * 14) The beforeunload event fires just before a user leaves the page,
 *    allowing final checks or prompts about unsaved changes.
 *
 * 15) Touch events (touchstart, touchmove, touchend) are specialized for
 *    touchscreen devices, though pointer events are recommended for cross-platform coverage.
 *
 * 16) once: true in the event listener options automatically removes
 *    the listener after it fires once, useful for single-run scenarios.
 *
 * 17) The scroll event fires repeatedly during scrolling, so throttling or
 *    debouncing is often needed for performance.
 *
 * 18) The change event on input, select, and textarea elements fires when
 *    their value changes and the element loses focus (or the selection is committed).
 *
 * 19) Key press events can be used to implement hotkeys or shortcuts in web
 *    applications, read from event.key or event.code.
 *
 * 20) Programmatically triggering an event is possible via dispatchEvent(
 *    new Event("eventType")), enabling synthetic interactions for testing
 *    or advanced user flows.
 */

/**************************************************************************
 * 4) CALLBACK FUNCTIONS
 **************************************************************************/
/*
 * 1) A callback function is passed into another function to be executed once
 *   an operation completes or a specific event occurs.
 *
 * 2) Synchronous callbacks run instantly in the same call stack, such as
 *   those in array methods like forEach() or map().
 *
 * 3) Asynchronous callbacks are queued for later execution, as seen in
 *   setTimeout(), fetch(), or event listeners.
 *
 * 4) Node.js widely uses callback patterns for file I/O or network requests,
 *   which can lead to nested callback "hell" without careful structuring.
 *
 * 5) "Callback hell" describes deeply nested callbacks, which can be avoided
 *   using Promises, async/await, or other flow-control methods like async libraries.
 *
 * 6) Named callbacks (function handleData(...) {...}) are often easier to
 *   debug than anonymous callbacks because they appear in stack traces.
 *
 * 7) Error-first callbacks (err, data) are common in Node.js, where err is
 *   checked first; if null, data is processed, otherwise the error is handled.
 *
 * 8) Even when using Promises or async/await, callbacks underlie the mechanism
 *   behind the scenes in the JavaScript runtime.
 *
 * 9) The event loop coordinates asynchronous callbacks by pushing them onto
 *   the call stack once the main thread is idle or an event triggers.
 *
 * 10) "setInterval()" repeatedly invokes its callback until cleared, while
 *    "setTimeout()" calls it once after a defined delay.
 *
 * 11) A typical fetch() request returns a Promise, which calls .then(callback)
 *    or .catch(errorCallback) once the asynchronous operation completes.
 *
 * 12) In a reduce() method, the callback is invoked for each array element with
 *    the current accumulator and the current value, forming a final output.
 *
 * 13) You can combine callbacks with closures to maintain state across
 *    multiple asynchronous calls.
 *
 * 14) Debouncing uses a timer-based callback to ensure a function is only
 *    executed after a certain pause in repeated events (like resize or scroll).
 *
 * 15) The requestAnimationFrame(callback) API schedules animation updates
 *    at the browser’s refresh rate, replacing setTimeout() for smoother graphics.
 *
 * 16) Converting callback-based code to Promise-based code can improve
 *    readability, especially if you then use async/await syntax.
 *
 * 17) A test framework may use callbacks to indicate asynchronous tests have
 *    finished, controlling the timing and reporting of results.
 *
 * 18) setTimeout() accepts additional arguments after the delay parameter,
 *    passing them to the callback upon execution, providing simple parameter
 *    injection.
 *
 * 19) Callbacks are integral to front-end frameworks’ lifecycle hooks (e.g.,
 *    React's componentDidMount or Vue's mounted), which run after certain events.
 *
 * 20) Although async/await is a more modern syntax, it's essentially syntactic
 *    sugar on top of Promises, which themselves rely on callback mechanisms
 *    under the hood.
 */


