<template>
  <h1>Account settings</h1>
  <Spinner
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    lg
    v-if="loading"
  />
  <section
    v-if="user && !loading"
    data-testid="wrapper"
    class="relative container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg md:text-left"
  >
    <div class="flex flex-col md:grid md:grid-cols-12">
      <div class="flex flex-col text-center md:col-span-3">
        <div class="relative">
          <img
            :src="`${user.avatar ? imageRoute : './default-user.jpg'}`"
            class="mx-auto w-[200px] md:w-[150px] lg:w-[200px] aspect-square rounded-full object-cover border-4 border-[#505050] cursor-pointer hover:grayscale duration-200"
            @click="changeAvatar"
          />
        </div>
        <h1 class="text-lg lg:text-4xl my-5 md:mt-5">
          {{ user.name }}
        </h1>
      </div>
      <div class="md:col-span-9 grid grid-cols-4 mt-2">
        <div>
          <p class="text-3xl">Member since:</p>
          <h4 class="text-2xl">{{ user.createdAt }}</h4>
        </div>

        <div>
          <p class="text-3xl">Email:</p>
          <h4 class="text-2xl">{{ user.email }}</h4>
        </div>

        <div>
          <p class="text-3xl">Date of birth:</p>
          <h4 class="text-2xl">{{ user.dateOfBirth }}</h4>
        </div>

        <div>
          <p class="text-3xl">Age:</p>
          <h4 class="text-2xl">{{ calculateAge(user.dateOfBirth) }}</h4>
        </div>
      </div>
    </div>
    <div class="absolute right-5 bottom-3" @click="editInfo">
      <i
        class="fa-solid fa-pen-to-square text-cyan-500 hover:text-white cursor-pointer"
      ></i>
    </div>
  </section>
  <Dialog
    v-if="showEditInfoDialog"
    title="Edit account info"
    @close="showEditInfoDialog = false"
    @save="submit"
    is-form-dialog
  >
    <form ref="form" @submit.prevent="onSubmit">
      <div class="min-w-[600px] text-left grid grid-cols-2 gap-5">
        <InputBase
          placeholder="User name"
          label="Name"
          class="my-5"
          v-model="name"
        />
        <InputBase
          placeholder="Email"
          label="Email"
          type="email"
          class="my-5"
          v-model="email"
        />
        <InputBase
          placeholder="New password"
          label="New password"
          type="password"
          class="my-5"
          v-model="password"
        />
        <InputBase
          placeholder="Repeat new password"
          label="Repeat new password"
          type="password"
          class="my-5"
          v-model="repPassword"
        />
      </div>
    </form>
  </Dialog>
  <input
    ref="avatarInput"
    type="file"
    class="hidden"
    accept="image/*"
    @change="onFileSelected"
  />
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, watch, computed } from "vue";
import { AxiosError } from "axios";

import Dialog from "../components/Dialog.vue";
import InputBase from "../components/InputBase.vue";
import Spinner from "../components/Spinner.vue";
import { useSnackbarStore } from "../components/Snackbar/store";

import { useUserStore } from "../stores/User";
import { useSpinnerStore } from "../stores/Spinner";
import { storeToRefs } from "pinia";

import Storage from "../services/Storage";
import User from "../services/User";

import {
  useErrorHandle,
  useDataCleaner,
  calculateAge,
} from "../services/utils";

import { ATLAS_IMG_BASE_URL } from "../utils";

const { setUser, setUserIds } = useUserStore();
const { user, USER_ID } = storeToRefs(useUserStore());

const { loading } = storeToRefs(useSpinnerStore());
const { showSnackbar } = useSnackbarStore();

const form = ref();
const avatarInput = ref();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  repPassword: "",
});

const { name, email, password, repPassword } = toRefs(formData);

const showEditInfoDialog = ref(false);

watch(
  () => repPassword.value,
  (val) => {
    if (password.value.length && password.value !== val) {
      console.log("Passwords dont match");
    }
  }
);

watch(
  () => showEditInfoDialog.value,
  (val) => {
    if (!val) {
      password.value = "";
      repPassword.value = "";
    }
  }
);

const imageRoute = computed(
  () => `${ATLAS_IMG_BASE_URL}/${USER_ID.value}/${user.value?.avatar}`
);

const changeAvatar = () => {
  avatarInput.value.click();
};
const submit = (e: Event) => form.value.dispatchEvent(e);
const onSubmit = () =>
  updateUser(
    { name: name.value, email: email.value, password: password.value },
    null
  );

const onFileSelected = async ({ target }: any) => {
  const selectedFile = target.files[0];
  const file = await uploadFile(selectedFile);
  await updateUser(null, file);
};

const editInfo = () => {
  showEditInfoDialog.value = true;
  name.value = user.value?.name as string;
  email.value = user.value?.email as string;
};

const uploadFile = async (selectedFile: File) => {
  return await Storage.upload(selectedFile);
};

const updateUser = async (
  formData?: Record<string, string> | null,
  file?: any
) => {
  try {
    const cleanedData = formData ? useDataCleaner(formData) : {};
    const dataToSend = {
      ...cleanedData,
      avatar: file ? file.fileName : null,
    };

    const { token, user } = await User.updateUser(useDataCleaner(dataToSend));
    localStorage.setItem("id-token", token);
    setUser(user);
    setUserIds();
    showSnackbar("success", "Info updated successfully");
    showEditInfoDialog.value = false;
  } catch (error) {
    showSnackbar("error", useErrorHandle(error as AxiosError));
  }
};
</script>

<style scoped></style>
