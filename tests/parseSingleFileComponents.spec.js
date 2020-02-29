import parseSingFileComponent
  from '../src/server/utils/parseSingleFileComponent';

import path from 'path';

describe('Parsing Single File Components', () => {
  const file = path.resolve(__dirname, 'mocks/MockComponent.vue');

  it('returns a cheerio instance', () => {
    const component = parseSingFileComponent(file);
    expect(typeof component.$).toBe('function');
  });

  it('can find template elements', () => {
    const {$} = parseSingFileComponent(file);
    expect($('header').html().trim()).toEqual("<h1>{{ name }}</h1>")
  });
});
