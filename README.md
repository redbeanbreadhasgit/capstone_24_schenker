# Capstone DB_Schenker

This project is made by React (Frontend) and Django (Backend). Here is the steps to set up the React environment and how to run it.

## How to install:
- We use Create React App to make our frontend. We start it by run:

        $ npx create-react-app capstone

    Tip: the React version for the project is v 18.2.0.

- We use Material-UI as our UI library, We install it by run this under the root folder of project:

        $ npm install @material-ui/core
    Tip: the Material-UI version fo the project is v 5.9.1, and all Material-UI packages will be installed under folder capstone/node_modules.

    Tip: the frontend environment has already been well set up, if you clone frontend code from our github link:
     https://github.com/redbeanbreadhasgit/capstone_24_schenker/tree/frontend 
 
## How to run:
- Open then command line and cd to the capstone root folder, then run it by type:

        $ npm start
    Then the web app frontend will be launched in the default port localhost 3000. You might see this URL in the browser's :

        http://localhost:3000
     
## File structure:
- All capstone files are under:

        capstone/

- All packages installed are under:

        capstone/nodes_module/

- All pages and components used in the project are under:

        capstone/src/pages/

- After the frontend starts, the output of this file will be rendered:

        capstone/src/App.js

    Tip: You can edit which specific files to be rendered in:

        capstone/src/index.js

- General page configuration is under:

        capstone/public/

    e.g. root element is defined in capstone/public/index.html