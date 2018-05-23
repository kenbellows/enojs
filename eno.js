// const EnoBuilder = require('./lib/builder.js');
const EnoParser = require('./lib/parser.js');
const { EnoParseError, EnoValidationError } = require('./lib/errors.js');
const messages = require('./lib/messages.js');

const locales = Object.keys(messages);
const reporters = ['html', 'terminal', 'text']

// TODO: Parser and Builder (no generic dumper concept exists in eno)
// TODO: - Pass default loaders to parse(..), which are always run when getting any values from the resulting document (e.g. ERB default loader to interpolate things)
//       - Generally enable possiblity to run multiple loaders in order (then you can also pass multiple loaders to the individual getters e.g.)
// TODO: Possibility to pass file label to parser context, which is then used to enrich error messages with file name :) Use this in early usecases then
// TODO: Validate reporter choice if custom specified

const build = object => {

  if(typeof object !== 'object') {
    throw new TypeError(
      `The builder accepts only objects as input, input was: ${object}`
    );
  }

//   const builder = new EnoDumper(input, locale);
};

const parse = (input, locale = 'en', reporter = 'text') => {

  if(typeof input !== 'string') {
    throw new TypeError(
      `The parser accepts only strings as input, input was: ${input}`
    );
  }

  if(!locales.includes(locale)) {
    throw new RangeError(
      `The requested locale '${locale}' is not supported. Translation contributions are ` +
      'very welcome and an easy thing to do - only a few easy messages need ' +
      'to be translated!'
    );
  }

  if(!reporters.includes(reporter)) {
    throw new RangeError(`The requested reporter '${reporter}' does not exist.`);
  }

  const parser = new EnoParser(input, messages[locale], reporter);

  return parser.run();
};

module.exports = {
  EnoParseError,
  EnoValidationError,
  build,
  parse
};
