import generator from '../src/node/generator';
import path from 'path';

describe('Parser E2E', () => {

  const file = path.resolve(__dirname, 'mocks/MockComponent.vue');

  it('can parse a vue component', async () => {

    const component = await generator(file);

    expect(component.slots).toBeTruthy();
    expect(component.props).toBeTruthy();
    expect(component.events).toBeTruthy();
    expect(component.methods).toBeTruthy();
  });

});
