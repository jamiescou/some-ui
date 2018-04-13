const REGEX_BLOCK_DELIMITER = new RegExp('\r', 'g');

const sanitizaDraftText = (input) => input.replace(REGEX_BLOCK_DELIMITER, '');

export default sanitizaDraftText;
