RESTful NodeJS web application with a single endpoint to parse XML information from a text source and return the relevant data.

The endpoint `/parse-content` will accept a `POST` request containing, in the request body, the plain text content to be parsed.

The expected responses from the endpoint are:

- `200` - If the application was able to parse the data.

  - The response body will include a JSON object with the formatted data.

- `400` - If the request can not be fulfilled because of a client error (a malformed XML content, for example).

  - The same error will be returned if the content does not satisfy the following conditions:
    1. Opening tags without a corresponding closing tag.
    2. Missing `<total>` tag and/or value.
    3. Missing `<cost_centre>` tag and/or value.

- `500` - If something went wrong on the API side.
  - A readable message will be returned to the client with non-technical details.

> This is a NodeJS application using [Express](https://expressjs.com) and was bootstrapped using the [Express generator](https://expressjs.com/en/starter/generator.html) tool.

## Running the app

1. Clone this repo
2. CD into the folder
3. The app will use port `3001` by default. You can change this setting by setting up an environment variable `PORT={port#}` or changing the default port on the file `/bin/www:15`.
4. Set NODE_ENV to `“production”`.
5. Run `npm install`.
6. Finally `npm start` to start the app.
7. You can start consuming the endpoint using `http://localhost:{port}/parse-content`.
