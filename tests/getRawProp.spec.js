import getRawPropDefinition from "../src/server/utils/getRawPropDefinition";
import parseSingleFileComponent from "../src/server/utils/parseSingleFileComponent";

import path from "path";

describe("getRawPropDefinition", () => {
  const filePath = path.resolve(__dirname, "mocks/MockComponent.vue");

  it("finds the search prop definition", () => {
    const { script } = parseSingleFileComponent(filePath);
    const search = getRawPropDefinition("search", script.content);

    expect(search).toEqual(
      `search: {
      type: Function,

      /**
       * Do something with a different thing.
       *
       * @param {String} needle - the search query
       * @param {Object} config
       * @param {String} config.haystack
       * @return {String}
       */
      default (needle, {haystack}) {
        return [haystack].toString();
      },
    }`
    );
  });

  it("finds the name prop definition", () => {
    const { script } = parseSingleFileComponent(filePath);
    const name = getRawPropDefinition("name", script.content);

    expect(name).toEqual(`name: String`);
  });
});
