// The Fetch API provides a modern, powerful, and flexible way to make asynchronous
// HTTP requests in JavaScript, allowing you to handle network responses and perform 
// various network operations directly within your JavaScript applications.

// Basic Usage
// At its core, the Fetch API allows you to make HTTP requests similar
//  to XMLHttpRequest but with a simpler, promise-based syntax. 
//  Here's a basic example of how to use it:

fetch('https://api.github.com/users/ZainabEman')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error));

// fetch(url, options): The main function used to make requests. url is the resource
//  you want to fetch, and options is an object containing any custom settings that
//   you want to apply to the request.

// Response Object: The promise returned from fetch() resolves with a Response
//  object, providing body, status, and headers of the response.


// You can customize fetch requests with several options:

// method:     The request method, e.g., GET, POST, DELETE, etc.
// headers:    Headers object or array of tuples containing HTTP headers.
// body:       Body of the request; can be a Blob, BufferSource, FormData, URLSearchParams,
                //  or USVString object.
// mode:       The mode you want to use for the request, e.g., cors, no-cors, same-origin.
// credentials: The request credentials you want to use for making requests to a different
                //  domain, e.g., include, same-origin, omit.
// cache:      The cache mode of the request, e.g., default, no-cache, reload,
                //  force-cache, only-if-cached.
// redirect:   How to handle redirects, e.g., follow, error, manual.
// referrerPolicy: Specifies the referrer policy to use for fetching.


// Example with Advanced Options
// Here's how you might set up a POST request with JSON data:

fetch('https://api.github.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'ZainabEman',
        email: 'example@example.com'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Handling Different Data Formats

// Fetch isn't limited to JSON. It can handle various types of data,
//  which you can access using different methods:

// .text():    Returns the response as plain text.
// .json():    Parses the response as JSON.
// .blob():    Processes the response as a Blob object.
// .formData(): Returns the response as FormData object.
// .arrayBuffer(): Returns the response as an ArrayBuffer object, useful for binary data.



// Streaming Data with Fetch
// The Fetch API supports streaming of response bodies directly to the web page,
//  which is great for handling large datasets:

fetch('https://api.github.com/users/ZainabEman')
    .then(response => {
        const reader = response.body.getReader();
        return new ReadableStream({
            start(controller) {
                function push() {
                    reader.read().then(({done, value}) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        push();
                    }).catch(err => {
                        console.error('Stream reading failed:', err);
                        controller.error(err);
                    });
                }
                push();
            }
        });
    })
    .then(stream => new Response(stream))
    .then(response => response.blob())
    .then(blob => console.log(blob))
    .catch(err => console.error('Failed to fetch:', err));

// Error Handling
// Fetch API error handling is straightforward. It only rejects a promise if the
//  network error occurs (not for HTTP error statuses), and you need to handle HTTP
//   errors manually:

fetch('https://api.github.com/users/ZainabEman')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));