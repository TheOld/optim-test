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

/**
 * Calculates the GST using  IRD’s recommended formula ((open market value x 3) ÷ 23) https://www.ird.govt.nz/gst/cancelling-your-gst-registration/cancel-your-gst-registration
 *
 * @param {*} value to extract the GST from
 */
function calulateGST({ value }) {
  try {
    const parsedTotal = parseFloat(value);
    const gst = (parsedTotal * 3) / 23;

    const exclusiveValue = value - gst;

    return {
      // Set the GST (with 2 digits after the decimal point)
      gst: gst.toFixed(2),
      // The GST exclusive total
      gst_exclusive: exclusiveValue.toFixed(2),
      // And the original value
      gst_inclusive: parsedTotal.toFixed(2),
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { extractXMLTags, calulateGST };
