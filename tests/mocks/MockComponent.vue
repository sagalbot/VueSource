<template>
  <section>
    <slot name="header" :name="name">
      <header>
        <h1>{{ name }}</h1>
      </header>
    </slot>
  </section>
</template>

<script>
import mixin from 'mockMixin.js';

export default {
  props: {
    /**
     * The name of the thing that your talking about.
     */
    name: String,

    /**
     * Used to extrapolate different things from all sorts
     * of various inputs.
     */
    search: {
      type: Function,

      /**
       * Do something with a different thing.
       *
       * @param {String} needle - the search query
       * @param {Array} haystack
       * @return {String}
       */
      default(needle, {haystack}) {
        return [].toString();
      }
    }
  },
  mixins: [mixin],
  methods: {
    /**
     * Take something and turn it into a different thing.
     * @public
     * @emits reducing
     * @emits reduced
     * @param {Object} thing - the thing you're gonna reduce.
     * @return {String} 'something else'
     */
    reduce(thing) {
      /**
       * @event reducing
       * @param {Object} thing - the thing being reduced
       */
      this.$emit('reducing', thing);
      const reduced =  'something else';

      /**
       * @event reduced
       * @param {String} reduced the result of the reducing
       */
      this.$emit('reduced', reduced);
    },

    /**
     * Make sure it happens quickly.
     * @public
     * @param {Object} doIt
     */
    quickly: (doIt) => doIt.now(),
  }
}
</script>
