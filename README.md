This app is hosted at [https://acm-weather-app.vercel.app/](https://acm-weather-app.vercel.app/)

Tech Stack:

I wrote this using React.js for the frontend and Next.js with Typescript for a full-stack framework. For styling I used Tailwind.css, as well as a UI component library called Daisy.ui (for displaying a graph of the UV Index and nothing else). I didn't really use a backend as I didn't need it, as all I needed was data fetching from APIs which was done client-side. However I did take advantage of Next.js 13 and the app directory, so I used this as an opportunity to use RSC (React Server Components) to implement all non-interactive components.

How to run:

Run `npm i` to install all necessary dependencies and then run `npm run dev` to locally host this webapp.

Building for Production:

Run `npm run build` to generate an optimized build, and then run `npm run start` to host the webpage.

Testing:

Run `npm run test` to run basic Jest tests
