import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";

import SearchInput from "./SearchInput.vue";

const getWrapper = () => mount(SearchInput, {});

describe("Component: SearchInput", () => {
  const wrapper = getWrapper();

  it("Sends the input value to get data", async () => {
    const input = wrapper.find('[data-testid="input"]');

    expect(input.exists()).toBe(true);

    await input.setValue("Harry Potter");
    await input.trigger("keydown.enter");

    expect(
      (wrapper.find('[data-testid="input"]').element as HTMLInputElement).value
    ).toBe("Harry Potter");

    expect(wrapper.emitted()).toHaveProperty("search");
  });
});
