export default {
  props: {

    /**
     * The size of the thing that you're referring to.
     */
    size: {
      type: Number,
      default: 5,
    },
  },

  computed: {
    /**
     * Get the optimized version of the size by subtracting an
     * arbitrary number.
     *
     * @see https://example.dev
     *
     * @return {Number}
     */
    optimizedSize () {
      return size - 5;
    },
  },
};
