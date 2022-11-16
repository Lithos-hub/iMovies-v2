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
          <ButtonBase
            type="submit"
            text="Sign in"
            variant="button__primary"
            :disabled="!email.length && !password.length"
            loadingIcon
          />
        </div>
        <section class="mt-7">
          <small class="block text-cyan-300">Don't have an account yet?</small>
          <div class="relative">
            <input
              type="button"
              value="Register"
              class="button__secondary w-[140px]"
              @click="showRegisterForm = true"
              isNotTextField
            />
          </div>
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
            v-model="file"
            type="file"
          />
          <div :class="{ 'flex justify-between': file }">
            <button
              type="button"
              class="button__secondary"
              @click="avatarInput.input.click()"
            >
              Select profile image
            </button>
            <div v-if="file" class="text-[18px] my-auto">
              Selected:
              <span class="text-cyan-500 font-medium">{{ file }}</span>
            </div>
          </div>
        </section>
        <hr class="my-5" />
        <div class="mt-5">
          <ButtonBase
            type="submit"
            text="Sign up"
            variant="button__primary"
            :disabled="!email.length && !password.length"
            loadingIcon
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { AxiosError, AxiosResponse } from "axios";

import Auth from "../services/Auth";
import Storage from "../services/Storage";
import User from "../services/User";

import { useNavigationStore } from "../stores/Navigation";
import { useSpinnerStore } from "../stores/Spinner";
import { useUserStore } from "../stores/User";

import InputBase from "../components/InputBase.vue";
import { useErrorHandle } from "../composables/errorHandle";
import { useSnackbarStore } from "../components/Snackbar/store";
import ButtonBase from "../components/ButtonBase.vue";

const { goTo } = useNavigationStore();
const { showSnackbar } = useSnackbarStore();
const { setLoading } = useSpinnerStore();

const { setUser } = useUserStore();
const avatarInput = ref();

const form = reactive({
  name: "asd",
  birthday: "2000-12-12",
  email: "asd@asd.com",
  password: "asdasdasd",
});
const { name, birthday, email, password } = toRefs(form);

const file: File | any = ref();

const showRegisterForm = ref(false);

const uploadFile = async () => {
  const userId = localStorage.getItem("id") as string;
  file.value.name.replace(/^/, `${userId}-`);
  const token = localStorage.getItem("id-token") as string;
  return await Storage.upload(token, file.value);
};
const signin = async () => {
  setLoading(true);
  try {
    const { token, user } = await Auth.signin({
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("id-token", token);
    localStorage.setItem("id", user._id);
    setUser(user);
    showSnackbar("success", "You logged in successfully!");
    goTo("/");
  } catch (error) {
    showSnackbar("error", useErrorHandle(error as AxiosError));
  } finally {
    setLoading(false);
  }
};
const signup = async () => {
  setLoading(true);
  try {
    await Auth.signup(form);
    await signin();
    const file: any = await uploadFile();
    const id = localStorage.getItem("id") as string;
    await User.updateUser({
      ...form,
      id,
      avatar: file.fileName,
    });
  } catch (error) {
    showSnackbar("error", useErrorHandle(error as AxiosError));
  } finally {
    setLoading(false);
  }
};
</script>
