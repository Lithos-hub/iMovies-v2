<template>
  <div
    data-testid="wrapper"
    class="flex flex-col justify-center mt-[200px]"
    :class="{ 'mt-[100px]': !isLogin }"
  >
    <section v-if="loading">
      <h3
        class="w-[50vw] fixed top-1/2 left-1/2 -translate-x-1/2 translate-y-[50px]"
      >
        {{ loadingText }}
      </h3>
      <Spinner
        lg
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </section>
    <section
      v-else
      ref="formSection"
      class="relative mx-auto bg-transparent border border-cyan-500 rounded-[10px] shadow-lg p-10 min-w-[250px] w-auto"
    >
      <form @submit.prevent="signin" v-if="isLogin">
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
            :disabled="!isValid"
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
              @click="isLogin = false"
            />
          </div>
        </section>
      </form>

      <form v-else @submit.prevent="signup">
        <div class="grid grid-cols-12">
          <div
            class="p-2 w-[35px] h-[35px] rounded-full hover:bg-cyan-900 cursor-pointer col-span-2 duration-200"
          >
            <i
              class="fa-solid fa-chevron-left"
              v-if="!isLogin"
              @click="isLogin = true"
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
          <input
            ref="avatarInput"
            class="hidden"
            placeholder="Select your profile image"
            @change="onFileSelected"
            type="file"
          />
          <label class="text-cyan-400">Avatar</label>
          <div :class="{ 'flex justify-between': file }">
            <button
              type="button"
              class="button__secondary"
              @click="avatarInput.click()"
            >
              Select profile image
            </button>
            <div v-if="file" class="text-[18px] my-auto">
              Selected:
              <span class="text-cyan-500 font-medium">{{ file.name }}</span>
            </div>
          </div>
        </section>
        <hr class="my-5" />
        <div class="mt-5">
          <ButtonBase
            type="submit"
            text="Sign up"
            variant="button__primary"
            :disabled="!isValid"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, watch, computed } from "vue";
import { AxiosError } from "axios";

import Auth from "../services/Auth";
import Storage from "../services/Storage";
import User from "../services/User";

import { useNavigationStore } from "../stores/Navigation";
import { useSpinnerStore } from "../stores/Spinner";
import { useUserStore } from "../stores/User";

import InputBase from "../components/InputBase.vue";
import Spinner from "../components/Spinner.vue";

import { useErrorHandle } from "../composables/errorHandle";
import { useSnackbarStore } from "../components/Snackbar/store";
import ButtonBase from "../components/ButtonBase.vue";

import { storeToRefs } from "pinia";

const { goTo } = useNavigationStore();
const { showSnackbar } = useSnackbarStore();
const spinnerStore = useSpinnerStore();
const { loading } = storeToRefs(spinnerStore);
const { setLoading } = useSpinnerStore();

const { setUser } = useUserStore();

const avatarInput = ref();
const formSection = ref();
const loadingText = ref("");

const form = reactive({
  name: "",
  birthday: "",
  email: "prueba@prueba.com",
  password: "prueba@prueba.com",
});
const { name, birthday, email, password } = toRefs(form);

const file: File | any = ref();

const isLogin = ref(true);
const isCreatingAnAccount = ref(false);

let intervalId: any;

const isValid = computed(() => {
  let isValid = false;
  if (isLogin.value) {
    isValid = !!email.value && !!password.value;
  } else {
    isValid =
      !!email.value.length &&
      !!password.value.length &&
      !!name.value.length &&
      !!birthday.value.length;
  }
  return isValid;
});

watch(
  () => isLogin.value,
  () => {
    name.value = "";
    birthday.value = "";
    email.value = "";
    password.value = "";
    file.value = null;
  }
);

const onFileSelected = ({ target }: any) => {
  file.value = target.files[0];
};

const getLoadingPhrase = () => {
  const phrases = [
    "Checking and encrypting data...",
    "Creating account...",
    "Validating session...",
    "Uploading avatar image...",
    "Creating data in the database...",
  ];
  let counter = 0;
  intervalId = setInterval(() => {
    loadingText.value = phrases[counter];
    if (counter === phrases.length - 1) {
      counter = 0;
    }
    counter++;
  }, 3000);
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
    isCreatingAnAccount.value ||
      showSnackbar("success", "You logged in successfully!");
    isCreatingAnAccount.value || goTo("/");
  } catch (error) {
    console.log("ERROR:", { error });
    showSnackbar("error", useErrorHandle(error as AxiosError));
  } finally {
    isCreatingAnAccount.value || setLoading(false);
  }
};
const signup = async () => {
  setLoading(true);
  formSection.value.style.opacity = 0;
  getLoadingPhrase();
  isCreatingAnAccount.value = true;
  try {
    // Create the user
    await Auth.signup(form);
    // Set the session
    await signin();
    // Upload the avatar file
    const file = await uploadFile();
    // Update the user with the created avatar file
    await updateUser(file);
    showSnackbar("success", "You created an account successfully!");
    goTo("/");
  } catch (error) {
    showSnackbar("error", useErrorHandle(error as AxiosError));
  } finally {
    setLoading(false);
    clearInterval(intervalId);
  }
};
const uploadFile = async () => {
  const userId = localStorage.getItem("id") as string;
  file.value.name.replace(/^/, `${userId}-`);
  const token = localStorage.getItem("id-token") as string;
  return await Storage.upload(token, file.value);
};
const updateUser = async (file: any) => {
  try {
    const id = localStorage.getItem("id") as string;
    const token = localStorage.getItem("id-token") as string;
    const user = await User.updateUser(token, {
      ...form,
      id,
      avatar: file.fileName,
    });
    setUser(user);
  } catch (error) {
    showSnackbar("error", useErrorHandle(error as AxiosError));
  }
};
</script>
