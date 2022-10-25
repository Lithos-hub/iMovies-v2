import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import SearchView from "./SearchView.vue";

import { createTestingPinia } from "@pinia/testing";
import { createPinia, setActivePinia } from "pinia";

import { useMoviesStore } from "../stores/Movies";

const pinia = createTestingPinia();
const movieStore = useMoviesStore(pinia);

const onPressEnter = (event: Event) =>
  movieStore.onSearch({
    page: 1,
    sort_by: "popularity.desc",
    query: (event.target as HTMLInputElement).value as string,
  });

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

  it("Sends the input value to get data", async () => {
    const input = wrapper.find('[data-testid="input"]');
    const dataResults = wrapper.find('[data-testid="data-results"]');

    expect(input.exists()).toBe(true);
    expect(dataResults.exists()).toBe(false);

    await input.setValue("Harry Potter");
    await input.trigger("keydown.enter");

    expect(
      (wrapper.find('[data-testid="input"]').element as HTMLInputElement).value
    ).toBe("Harry Potter");
  });
});

// TODO:
/*
  - Test for input
  - Test for onSearch function
*/
