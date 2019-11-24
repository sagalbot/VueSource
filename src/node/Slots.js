module.exports = class Slots {
  constructor (slots = {}) {
    this.slots = slots;
  }

  add (name, slot) {
    this.slots[name] = slot;
    return this;
  }

  get definitions () {
    return this.slots;
  }

  /**
   * @return {*[]}
   */
  get bindings () {
    const normalizeBindings = bindings => {
      return Object.values(bindings)
        .map(binding => binding.replace(/ *\([^)]*\) */g, ''));
    };

    return Object
      .values(this.slots)
      .map(({bindings}) => normalizeBindings(bindings))
      .reduce((store, bindings) => [...store, ...bindings], []);
  }
};
