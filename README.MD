# Migrating Netease Tracks to Spotify

Connecting Netease Music API with Spotify API to migrate Netease tracks to Spotify using
NodeJS.

![frontpage](./github/img1.png)

[Spotify API](https://developer.spotify.com/documentation/web-api/)

[Netease API](https://binaryify.github.io/NeteaseCloudMusicApi/#/)

APIs for different platforms <- Request Manager -> Front End, Spotify API

Local Set up method:
Mount Neatease Nodejs server: node app.js (neteaseapi folder)
Mount live server locally using vite: npm run dev (src folder of client)

Upcoming Goal Nov:

-  Complete React Integration
-  Refactor existing codes to Typescript
-  Implement React router and call backend API with signup form submissions


Features:
useroutput

Week 23 - 28:

-   Integrate database.
-   Research possible server and web hosting platforms.

Ideas: (COmpleted)
How to improve matching? For songs that artist are registered with slightly different name?
slightly different song name? etc
Use word matching api?

Goals:

-   Successfully migrate all tracks, with unfound tracks notified to end user
-   UI Interface for user login and track management.
-   Ability to deselect certain tracks to migrate
-   Inclusion of native netease music interface instead of relying on playlist link/id

Questions:

-   How to host a website
-   Package management and project framework
-   How to manage user data and track network trafficks.
-   How to unit test in js, what are some frameworks.

Notes:
Code in spotify-netease are clientside codes
Code in NeteaseCloudMusicAPI and fetchNetease.js is serverside code

A server is needed for continous hosting of fetchNetease.js code
fetchNetease.js will need to be written to accept web requests and return data.
Ideally rewrite fetchNetease.js to REST API to be robust and professional

A web hostng service is needed for spotify-netease code. Which processes frontend request
A frontend framework would be idea. Reactjs, vuejs
Vite is used for development of these frontend codes as it is a fast local development server

Client-Side Code:
Languages: The primary language used for client-side code is JavaScript. HTML and CSS are also essential for creating the structure and styling of web pages.
Responsibilities: Client-side code is responsible for rendering web pages, creating interactive user interfaces, and responding to user interactions. It runs in the user's web browser.
Common Tools: Web browsers execute client-side code. Developers use web development tools and frameworks to create client-side applications.

Server-Side Code:
Languages: Node.js, PHP, Python, Ruby, Java, and other server-side languages are used for server-side code.
Responsibilities: Server-side code runs on the server and is responsible for processing requests from clients, interacting with databases, executing business logic, and generating dynamic content. It can serve as the backend for web applications, providing data and services to the client-side code.
Common Tools: Server-side code is executed on web servers or application servers. Frameworks like Express.js (for Node.js), Django (for Python), Ruby on Rails (for Ruby), and others help developers build server-side applications.

Client-Side vs. Server-Side Code module system
ES6 (ECMAScript 2015) and CommonJS are two different module systems used in JavaScript. They serve similar purposes, but they have some key differences:

ES6 Modules (ESM):

Standardization: ES6 modules are part of the ECMAScript standard. They are built into modern JavaScript engines and are natively supported by browsers. You can use them without requiring any additional tools or transpilation in modern environments.
Import and Export Syntax: ES6 modules use the import and export statements to manage dependencies between files. You can export functions, objects, or variables from one module and import them into another.

Static Analysis: ES6 modules are statically analyzable, which means that tools can inspect the code and determine dependencies at compile time. This enables efficient tree-shaking (removing unused code) during bundling.
Browser Support: Modern browsers natively support ES6 modules. You can use them directly in client-side code without transpilation.
CommonJS:

Origin: CommonJS was originally designed for server-side JavaScript, particularly in the context of Node.js. It's not natively supported in browsers.
require and module.exports: CommonJS modules use the require function to import dependencies and the module.exports or exports object to export variables, functions, or objects.

Dynamic Loading: CommonJS modules are loaded and executed at runtime, which can make them less efficient for certain scenarios compared to the statically analyzable nature of ES6 modules.
Server-Side Usage: CommonJS modules are commonly used for server-side development, especially in Node.js. Node.js provides the require function to load modules.

In summary, ES6 modules are the modern standard for managing dependencies in JavaScript, especially for client-side code. They are natively supported by browsers and provide efficient tree-shaking capabilities. CommonJS, on the other hand, is still prevalent in server-side JavaScript, particularly within Node.js applications, where it remains a widely used module system. However, as JavaScript evolves, ES6 modules are becoming more widely adopted on both the client and server sides.
