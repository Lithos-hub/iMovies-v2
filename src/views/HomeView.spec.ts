import { mount } from "@vue/test-utils";
import HomeView from "./HomeView.vue";
import { describe, it, expect } from "vitest";

import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(HomeView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("Component: Button", () => {
  const wrapper = getWrapper();

  it("Renders the component", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
