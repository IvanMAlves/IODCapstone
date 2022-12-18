# IODCapstone Tapletop Bookkeeping

## About

Tabletop Bookkeeping is an application designed for tabletop wargamming and roleplaying players to have a single place to store and manage their
tabletop bookkeeping records. Many tabletop games come with a paper and pen component to the game. Most of these games are multiplayer and require
multiple people to have access to the same information and other information to be kept with only the player. This application aims to take away the
pen and paper and create a digital replacement where users can manage their own informaiton and for future builds to shape how they want the informaiton stored.

Please note that this is still in early release and not complete other than for the purposes of education. This application still has many features to be 
implemented before its full live launch.

# Installation Instructions

1. Clone the github
2. Ensure both folders are in the same directory /IODCapstone
3. Complete back-end installation first
4. Complete front-end installation second

## back-end installation and customisation

cd to /IODCapstone/backend.\
npm install.\
The Database can be found /IODCapstone/backend for the db_init.sql.\
Locate /IODCapstone/backend for the config.js.\
Change the HOST, USER, PASSWORD, DB, and PORT to match your database.\
OR.\
Create .ENV file in the root directory and update with your details where in <>.\
PORT=8000.\
DB_PASSWORD=<your dbpassword>.\
DB_NAME=<your dbname>.\
DB_USER=<your db user name>.\
DB_HOST=localhost.\
DB_PORT=3306.\
  
npm start to run backend.\

## front end installation and customisation

cd to /IODCapstone/frontend/frontend-capstone.\
npm install.\
npm start to run frontend which will run on localhost:3000/ or open a browser and open localhost:3000/register.\

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
