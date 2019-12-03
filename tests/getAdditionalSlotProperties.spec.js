import {
  getAdditionalSlotProperties,
  pickBindingsFromElement,
} from '../src/server/getAdditionalSlotProperties';
import { mockComponentPath } from './helpers/paths';

describe('getAdditionalSlotProperties', () => {

  it('can retrieve a specific slot definition', () => {
    const slots = getAdditionalSlotProperties(mockComponentPath);
    expect(slots.get('body')).toBeTruthy();
    expect(slots.get('default')).toBeTruthy();
    expect(slots.get('header')).toBeTruthy();
  });

  it('is an array of objects', () => {
    const slots = getAdditionalSlotProperties(mockComponentPath);
    expect(Array.isArray(slots)).toEqual(true);
  });

  it('can parse v-bind attributes', () => {
    const slots = getAdditionalSlotProperties(mockComponentPath);
    expect(slots.get('body').bindings)
      .toEqual([{bound: 'v-bind', value: 'bodySlotContent'}]);
  });

  it('can parse shorthand bindings', () => {
    const slots = getAdditionalSlotProperties(mockComponentPath);
    expect(slots.get('header').bindings)
      .toEqual([{'bound': 'name', value: 'name'}]);
  });

  it('can parse slots with no bindings', () => {
    const slots = getAdditionalSlotProperties(mockComponentPath);
    expect(slots.get('default').bindings).toEqual([]);
  });

  describe('parsing HTML attributes', () => {
    const picked = pickBindingsFromElement({
      attribs: {
        'id': 'some-div',
        'v-bind': 'getSomeThing(fromThis)',
        ':multiple': 'multiple',
      },
    });

    it('returns an array of objects', () => {
      expect(Array.isArray(picked)).toBeTruthy();
    });

    it('skips html attributes', () => {
      expect(picked.includes({bound: 'id', value: 'some-div'})).toBeFalsy();
    });

    it('includes valid bindings', () => {
      expect(picked.includes({bound: 'v-bind', value: 'getSomeThing'}));
      expect(picked.includes({bound: 'multiple', value: 'multiple'}));
    })
  });

});
