# PouchDb Demo

### Getting Started

- These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installation

1.  Clone the repo
    ```
     https://github.com/serge-web/PouchDb_Demonstrator.git
    ```
2.  Install NPM packages
    ```
     npm install
    ```

### Environments

1.  Create env files

- Local environments
  ```
   .env
  ```

2.  Add your environment variables in the .env file you created, for this version you only need to add the port for the API

    ```
      PORT=7000

    ```

### Running the code

- Running the code in development environment (with nodemon)
  ```
   npm run start-dev
  ```
- Running the code in production environment
  ```
   npm run start
  ```

### Test the app

- To test if the app is working, run http://localhost:port/api/test (you should get a hello world message when calling this endpoint)

### Built With

- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [EJS](https://ejs.co/)
