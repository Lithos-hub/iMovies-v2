import { mount } from "@vue/test-utils";
import Navbar from "./Navbar.vue";
import { describe, it, expect } from "vitest";

import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(Navbar, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("Component: View", () => {
  const wrapper = getWrapper();

  it("Renders the component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
