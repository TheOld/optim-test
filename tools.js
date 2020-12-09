/**
 * Simple function to extract XML tags from a string using regular expression.
 *
 * @param {*} XML containing string
 */
function extractXMLTags({ xml }) {
  try {
    /**
     * The RegEx matches an opening angle bracket, followed by one or
     * more characters that aren't opening or closing brackets, followed by a
     * closing angle bracket. */
    const reTagCatcher = /(<.[^(><.)]+>)/g;

    return xml.match(reTagCatcher);
  } catch (error) {
    throw error;
  }
}

module.exports = extractXMLTags;
