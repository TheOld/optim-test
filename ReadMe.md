RESTful NodeJS web application with a single endpoint to parse XML information from a text source and return the relevant data.

The endpoint `/content-parser` will accept a `POST` request containing, in the request body, the content to be parsed.

The expected responses from the endpoint are:

- `200` - If the application was able to parse the data.

  - The response body will include a JSON object with the formatted data.

- `403` - If the request can not be fulfilled because of a client error (a malformed XML content, for example).

  - The same error will be returned if the content does not satisfy the following conditions:
    1. Opening tags without a corresponding closing tag.
    2. Missing `<total>` tag and/or value.
    3. Missing `<cost_centre>` tag and/or value.

- `500` - If something went wrong on the API side.
  - A readable message will be returned to the client with non-technical details.

> This is a NodeJS application using [Express](https://expressjs.com) and was bootstrapped using the [Express generator](https://expressjs.com/en/starter/generator.html) tool.
