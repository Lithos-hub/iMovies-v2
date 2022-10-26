import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import SearchView from "./SearchView.vue";

import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";

const getWrapper = () =>
  mount(SearchView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

describe("Component: View", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const wrapper = getWrapper();

  it("Renders the component", () => {
    expect(wrapper.exists()).toBe(true);
  });
});
