// Importing required express and router
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(express.json());

const { extractXMLTags, calulateGST } = require('../tools');

/**
 * This endpoint will parse the contents of a message and return a json object with the parsed data
 */
router.post('/', bodyParser.text({ type: '*/*' }), function (req, res) {
  try {
    const content = req.body;

    // First we'll extract the XML tags from the string (includes closing ones)
    const tags = extractXMLTags({ xml: content });

    // Once we obtain a list of tags, we'll query the string for the values matching the tags on the list
    const values = {};

    for (let index = 0; index < tags.length; index++) {
      const tag = tags[index];

      if (!tag.includes('/')) {
        // Let's strip the tag from it's brackets
        const strippedTag = tag.replace(/\W+/g, '');
        // Here we're manually building a closing tag based on the current tag in the list - not used in validation for missing closing tag though
        const closingTag = `</${tag.substring(1)}`;

        // Now we get the value from inside the valid tags, if the tag is empty we'll set the valu to `null` and treat it accordingly
        const value = content.split(tag).pop().split(closingTag)[0] || null;

        // If there's no total set, we reject the message
        if (tag === '<total>' && !value) {
          res.status(400).send({ error: `Total value is not set.` });
          break;
        }

        // Here we'll check for missing closing tags
        if (!content.includes(closingTag)) {
          res
            .status(400)
            .send({ error: `Missing closing tag for ${strippedTag}.` });
          break;
        }

        // For the particular case of cost_centre being null or empty, we'll set the value to UNKNOWN
        if (tag === '<cost_centre>' && !value) {
          values[`${strippedTag}`] = 'UNKNOWN';
        } else {
          values[`${strippedTag}`] = value;
        }

        if (tag === '<total>' && value) {
          values.total = calulateGST({ value });
        }
      }
    }

    // Some clean up
    delete values.expense;

    // Finally we return the response with the parsed data
    res.send(values);
  } catch (error) {
    // Print error message on the console
    console.error(`file: content-parser.js ~ line 12 ~ error`, error);

    // Return user friendly error message to the client
    res.status(500).send({ error });
  }
});

module.exports = router;
