import { mount } from "@vue/test-utils";
import MovieCard from "./MovieCard.vue";
import { describe, it, expect } from "vitest";

import { createTestingPinia } from "@pinia/testing";

const getWrapper = () =>
  mount(MovieCard, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("Component: MovieCard", () => {
  const wrapper = getWrapper();

  it("Renders the component", () => {
    expect(wrapper.find('[data-testid="wrapper"]').exists()).toBeTruthy();
  });
});
