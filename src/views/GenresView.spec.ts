import { mount } from "@vue/test-utils";
import GenresView from "./GenresView.vue";
import { describe, it, expect } from "vitest";

import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(GenresView, {
    global: {
      plugins: [createTestingPinia()],
    },
    data: () => {
      dataLoaded: true;
    },
  });

describe("Component: View", () => {
  const wrapper = getWrapper();

  it("Renders the component", () => {
    expect(wrapper.find('[data-testid="wrapper"]').exists()).toBeTruthy();
  });
});
