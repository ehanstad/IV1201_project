# IV1201_project

## Setup
Installing dependencies
- `git clone https://github.com/ehanstad/IV1201_project.git`
- `cd IV1201_project`
- `npm i`
- `cd frontend`
- `npm i`

Setup enviroment variables
- Create a file `.env` in root directory.
- Write enviroment varibales to this file (api keys, db user/pass etc)

## Using the application locally
To run both Express and React applications concurrently (for development)
- `npm run dev`

To run only the Express application (with nodemon)
- `/backend/npm run server` (in backend)

To run only the React application
- `/frontend/npm run start` (in frontend)

To run tests
- `npm run test`

Static code analysis
- `npm run lint`

## Deployment
To deploy the application simply push new features into the main branch
and it automatically update the deployed application on heroku.

A suggestion is to use pull requests and use github-actions as restictions.

## Database
The application uses heroku postgres to access it, simply go to the applications heroku dashboard side
and under "Installed add-ons" you will find a link.

## Requirements
The application uses version 12 of Node.js for github-action checks
To download version 12 of Node.js. [link](https://nodejs.org/en/blog/release/v12.13.0/)
and npm as Node package manager

To download
- `sudo apt-install npm`

To check the version
- `npm -v`
- `node -v`

For more infromation regarding the application please read the projects [wiki-side](https://github.com/ehanstad/IV1201_project/wiki).
