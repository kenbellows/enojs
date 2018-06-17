const eno = require('../../../eno.js');

describe('validation.expectedSectionGotSections', () => {
  const document = eno.parse(`
    # languages
    eno: eno notation

    # languages
    json: JavaScript Object Notation

    # languages
    yaml: YAML Ain't Markup Language
  `);

  let error;
  try {
    document.section('languages');
  } catch(err) {
    error = err;
  }

  it(`provides a correct message`, () => {
    expect(error.message).toMatchSnapshot();
  });

  it(`provides correct selection metadata`, () => {
    expect(error.selection).toMatchSnapshot();
  });
});
