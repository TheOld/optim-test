// Importing required express and router
const express = require('express');
const router = express.Router();
router.use(express.json());

const extractXMLTags = require('../tools');

/**
 * This endpoint will parse the contents of a message and return a json object with the parsed data
 */
router.post('/', function (req, res) {
  try {
    const { content } = req.body;
    // First we'll extract the XML tags from the string (includes closing ones)
    const tags = extractXMLTags({ xml: content });
  } catch (error) {
    // Print error message on the console
    console.error(`file: content-parser.js ~ line 12 ~ error`, error);

    // Return user friendly error message to the client
    res.status(500).send({ error });
  }
});

module.exports = router;
