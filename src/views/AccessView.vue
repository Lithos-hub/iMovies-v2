<template>
  <div
    data-testid="wrapper"
    class="flex flex-col justify-center mt-[200px]"
    :class="{ 'mt-[100px]': showRegisterForm }"
  >
    <section
      class="relative mx-auto bg-transparent border border-cyan-500 rounded-[10px] shadow-lg p-10 min-w-[250px] w-auto"
    >
      <form @submit.prevent="signin" v-if="!showRegisterForm">
        <h1 class="text-4xl">iMovies account</h1>
        <section class="flex flex-col gap-5 justify-around mt-10">
          <InputBase
            placeholder="Write your email"
            label="Email"
            v-model="email"
            type="email"
            required
          />

          <InputBase
            placeholder="Write your password"
            label="Password"
            v-model="password"
            type="password"
            required
          />
        </section>
        <div class="mt-5">
          <input type="submit" value="Sign in" class="button__primary" />
        </div>
        <section class="mt-7">
          <small class="block text-cyan-300">Don't have an account yet?</small>
          <input
            type="button"
            value="Register"
            class="button__secondary"
            @click="showRegisterForm = true"
          />
        </section>
      </form>

      <form @submit.prevent="signup" v-else>
        <div class="grid grid-cols-12">
          <div
            class="p-2 w-[35px] h-[35px] rounded-full hover:bg-cyan-900 cursor-pointer col-span-2 duration-200"
          >
            <i
              class="fa-solid fa-chevron-left"
              v-if="showRegisterForm"
              @click="showRegisterForm = false"
            ></i>
          </div>
          <div class="col-span-8">
            <h1 class="text-4xl">Create an account</h1>
          </div>
        </div>
        <section class="flex flex-col gap-5 justify-around mt-10">
          <InputBase
            placeholder="Write your user name"
            label="User name"
            v-model="name"
            required
          />
          <div class="relative">
            <InputBase
              ref="dateInput"
              placeholder="Write your birthday"
              label="Birthday"
              v-model="birthday"
              type="date"
              required
            />
          </div>
          <InputBase
            placeholder="Write your email"
            label="Email"
            v-model="email"
            type="email"
            required
          />
          <InputBase
            placeholder="Write your password"
            label="Password"
            v-model="password"
            type="password"
            required
          />
          <InputBase
            ref="avatarInput"
            class="hidden"
            placeholder="Select your profile image"
            label="Profile image"
            v-model="avatar"
            type="file"
          />
          <div :class="{ 'flex justify-between': form.avatar }">
            <button
              type="button"
              class="button__secondary"
              @click="avatarInput.input.click()"
            >
              Select profile image
            </button>
            <div v-if="form.avatar" class="text-[18px] my-auto">
              Selected:
              <span class="text-cyan-500 font-medium">{{
                form.avatar.split("\\").pop()
              }}</span>
            </div>
          </div>
        </section>
        <hr class="my-5" />
        <div class="mt-5">
          <input type="submit" value="Sign up" class="button__primary" />
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, reactive } from "vue";
import InputBase from "../components/InputBase.vue";
import { useNavigationStore } from "../stores/Navigation";

const { goTo } = useNavigationStore();

const avatarInput = ref();

const form = reactive({
  name: "",
  birthday: "",
  email: "",
  password: "",
  avatar: "",
});

const { name, birthday, email, password, avatar } = toRefs(form);

const showRegisterForm = ref(false);
// TODO: signin
const signin = () => goTo("/home");
const signup = () => goTo("/home");
</script>
