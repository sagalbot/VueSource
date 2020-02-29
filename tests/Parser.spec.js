import generator from "../src/server/generator";
import path from "path";
import fs from "fs";
import { parseComponent } from "vue-template-compiler";

describe("Parser E2E", () => {
  const componentPath = path.resolve(__dirname, "mocks/MockComponent.vue");

  it("can parse a vue component", async () => {
    const component = await generator(componentPath);

    expect(Array.isArray(component.slots)).toBeTruthy();
    expect(Array.isArray(component.props)).toBeTruthy();
    expect(Array.isArray(component.events)).toBeTruthy();
    expect(Array.isArray(component.methods)).toBeTruthy();
  });
});
