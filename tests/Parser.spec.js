import generator from '../src/server/generator';
import path from 'path';

describe('Parser E2E', () => {

  const file = path.resolve(__dirname, 'mocks/MockComponent.vue');

  it('can parse a vue component', async () => {

    const component = await generator(file);

    expect(Array.isArray(component.slots)).toBeTruthy();
    expect(Array.isArray(component.props)).toBeTruthy();
    expect(Array.isArray(component.events)).toBeTruthy();
    expect(Array.isArray(component.methods)).toBeTruthy();
  });

});
