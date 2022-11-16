import { mount } from "@vue/test-utils";
import InputBase from "./InputBase.vue";
import { describe, it, expect } from "vitest";

import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(InputBase, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("Component: View", () => {
  const wrapper = getWrapper();

  it("Renders the component", () => {
    expect(wrapper.find('[data-testid="wrapper"]').exists()).toBeTruthy();
  });
});
