// sessionStorage

// Basic Operations
// Setting an Item:

// Stores the value 'https://api.github.com/users/ZainabEman' under the key 'gitURL'
sessionStorage.setItem('gitURL', 'https://api.github.com/users/ZainabEman');



// Getting an Item:
// Retrieves the item stored under the key 'gitURL'
console.log(sessionStorage.getItem('gitURL'));



// Removes the item stored under the key 'gitURL'
sessionStorage.removeItem('gitURL');


// Clearing All Storage:
// Clears all the sessionStorage data for the current session
sessionStorage.clear();



//Practical Example:
// Storing a user session ID temporarily
sessionStorage.setItem('sessionId', 'abc123');

// Later in the app
const sessionId = sessionStorage.getItem('sessionId');
console.log('Session ID:', sessionId);

// Clear the session ID when the user logs out
sessionStorage.removeItem('sessionId');



// Theoretical Note: Session storage is ideal for data that should
//  not be retained after the browser is closed, such as information
//   related to a user's single session like page states or token credentials.

// localStorage
// localStorage is similar to sessionStorage but is more persistent.
//  It is part of the web storage API which stores data indefinitely
//   until explicitly deleted. Data in localStorage does not expire and
//    remains accessible across browser sessions.


//Setting an Item:

// Stores an array of user objects as a JSON string in localStorage
const users = [{name: 'Zainab', age: 21}, {name: 'Imama', age: 21}, {name: 'Noor', age: 21}];
localStorage.setItem('classData', JSON.stringify(users));


//Getting an Item:
// Retrieves the JSON string stored under 'classData' and parses it to an array of objects
const retrievedData = JSON.parse(localStorage.getItem('classData'));
console.log(retrievedData);


//Removing an Item:

// Removes the item stored under 'classData'
localStorage.removeItem('classData');

//Clearing All Storage:

// Clears all localStorage data
localStorage.clear();


// Advanced Example:
// Handling user settings that should persist across sessions:
// Storing user preferences
const settings = { theme: 'dark', notifications: true };
localStorage.setItem('userSettings', JSON.stringify(settings));

// Retrieving and using the stored settings
const storedSettings = JSON.parse(localStorage.getItem('userSettings'));
if (storedSettings) {
    applyTheme(storedSettings.theme);
    toggleNotifications(storedSettings.notifications);
}

// Function to apply theme
function applyTheme(theme) {
    document.body.classList.add(theme);
}

// Function to toggle notifications
function toggleNotifications(enable) {
    if (enable) {
        console.log('Notifications turned on');
    } else {
        console.log('Notifications turned off');
    }
}