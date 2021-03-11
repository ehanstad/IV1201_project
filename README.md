# IV1201_project
## Overview
The application is built in a server-client architecture using client side rendering. The server is developed using the Express framework. The client uses the React framework. The code for the client can be found in the frontend directory, and the server in the backend directory.

For more infromation regarding the application please read the project [wiki](https://github.com/ehanstad/IV1201_project/wiki).

## Requirements
In order to use and develop the application Node is required (preferably version 12.x), the deployment as well as the GitHub-actions workflow use version 12.x of Node. To download version 12 of Node use the following [link](https://nodejs.org/en/blog/release/v12.13.0/).

To check the version
- `node -v`

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

## Usage
To run both Express and React applications concurrently (for development)
- `npm run dev`

To run production locally (run server with static React build files)
- `npm run production`

To run tests
- `npm run test`

To run static code analysis
- `npm run lint`

To run only the Express application (with nodemon)
- `cd backend`
- `npm run server`

To run only the React application
- `cd frontend`
- `npm run start`

To run React build scripts
- `cd frontend`
- `npm run build`

## Deployment
To deploy the application simply push new features into the main branch
and it automatically update the deployed application on heroku.

A suggestion is to use pull requests and use github-actions as restictions.

## Database
The application uses heroku postgres to access it, simply go to the applications heroku dashboard side
and under "Installed add-ons" you will find a link.
