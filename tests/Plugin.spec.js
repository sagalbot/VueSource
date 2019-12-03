import { mockComponentPath } from './helpers/paths';
import plugin from '../src/server';
import path from 'path';

describe('Vuepress Plugin', () => {

  const instantiated = plugin({src: mockComponentPath});

  it('is a function that returns an object', () => {
    expect(typeof instantiated).toEqual('object');
  });

  it('expects an object with a src property', () => {
    expect(() => plugin({})).toThrowError('VueSource: you must define a src.');
  });

  it('returns an object with extendedPageData function', () => {
    expect(typeof instantiated.extendPageData).toEqual('function');
  });

  it('returns an object with enhanceAppFiles file path', () => {
    expect(typeof instantiated.enhanceAppFiles).toEqual('string');
    expect(instantiated.enhanceAppFiles)
      .toEqual(path.resolve(__dirname, '../src/server/enhanceApp.js'));
  });

  it('returns an object with a clientDynamicModules function', () => {
    expect(typeof instantiated.clientDynamicModules).toEqual('function');
  });

});
