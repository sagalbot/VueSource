import generator from '../src/node/generator';

import { mockComponentPath } from './helpers/paths';

describe('Extended Slot Properties', () => {

  it('can parse v-bind attributes', async () => {
    const {slots} = await generator(mockComponentPath);

    expect(slots.find(({name}) => name === 'body').bindings)
      .toEqual({'v-bind': 'bodySlotContent'});
  });

  it('can parse shorthand bindings', async () => {
    const {slots} = await generator(mockComponentPath);

    console.log(slots);

    expect(slots.find(({name}) => name === 'header').bindings)
      .toEqual({'name': 'name'});
  });

});
