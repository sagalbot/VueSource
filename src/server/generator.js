const docs = require("vue-docgen-api");
const { ComponentDoc } = require("vue-docgen-api");
const {
  getAdditionalSlotProperties
} = require("./getAdditionalSlotProperties");
const getRawPropDefinition = require("./utils/getRawPropDefinition");
const parseSingleFileComponent = require("./utils/parseSingleFileComponent");

/**
 * Generate an object of API documentation.
 * @param {String} src absolute path to the component being documented
 * @return {Promise<ComponentDoc>}
 */
module.exports = async src => {
  const { script } = parseSingleFileComponent(src);

  const documentation = await docs.parse(src, {
    jsx: false,
    addScriptHandlers: [() => {}],
    addTemplateHandlers: [() => {}]
  });

  documentation.slots = getAdditionalSlotProperties(src);
  documentation.props = documentation.props.map(prop => {
    const declaration = prop.mixin
      ? ""
      : getRawPropDefinition(prop.name, script.content);

    return {
      ...prop,
      declaration
    };
  });

  return documentation;
};
