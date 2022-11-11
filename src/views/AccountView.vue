<template>
  <h1>Account settings</h1>
  <section
    v-if="user"
    data-testid="wrapper"
    class="relative container mt-10 bg-[#050505] bg-opacity-50 p-5 rounded-lg md:text-left"
  >
    <div class="flex flex-col md:grid md:grid-cols-12">
      <div class="flex flex-col text-center md:col-span-3">
        <div class="relative">
          <img
            :src="user.avatar"
            class="mx-auto w-[200px] md:w-[150px] lg:w-[200px] aspect-square rounded-full object-cover border-4 border-[#505050] cursor-pointer hover:grayscale duration-200"
            @click="openDialog"
          />
        </div>
        <h1 class="text-lg lg:text-4xl my-5 md:mt-5">
          {{ user.name }}
        </h1>
      </div>
      <div class="md:col-span-5">
        <p class="text-xl">Member since:</p>
        <h4>{{ user.register_date }}</h4>

        <p class="text-xl mt-2">Email:</p>
        <h4 class="">{{ user.email }}</h4>

        <p class="text-xl mt-2">Birthday:</p>
        <h4 class="">{{ user.birthday }}</h4>

        <p class="text-xl mt-2">Password:</p>
        <h4 class="">**********</h4>
      </div>
      <div class="md:col-span-4">
        <p class="text-xl my-2">Favourite genres:</p>
        <span
          v-for="item of movies.favourite"
          class="bg-[#050505] bg-opacity-70 p-1 mx-1 px-5 rounded-full text-cyan-200"
          >{{ item }}</span
        >
        <p class="text-xl my-2">Total favourite movies:</p>
        <h4 class="">{{ movies.favourite.length }}</h4>
      </div>
    </div>
    <div class="absolute right-5 bottom-3" @click="showEditDialog = true">
      <i
        class="fa-solid fa-pen-to-square text-cyan-500 hover:text-white cursor-pointer"
      ></i>
    </div>
  </section>
  <Dialog
    v-if="showEditDialog"
    title="Edit account info"
    @close="showEditDialog = false"
    @save="submit"
    is-form-dialog
  >
    <form ref="form" @submit.prevent="onSubmit">
      <div class="min-w-[600px] text-left">
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
          placeholder="Password"
          label="Password"
          type="password"
          class="my-5"
          v-model="password"
        />
        <InputBase
          placeholder="Avatar"
          label="Avatar"
          type="file"
          accept="image/png, image/gif, image/jpeg"
          v-model="avatar"
        />
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, reactive, toRefs } from "vue";
import { useUserStore } from "../stores/User";

import Dialog from "../components/Dialog.vue";
import InputBase from "../components/InputBase.vue";

const userStore = useUserStore();
const { user, movies } = storeToRefs(userStore);
const form = ref();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  avatar: "",
});

const { name, email, password, avatar } = toRefs(formData);

const showEditDialog = ref(false);

const openDialog = () => console.log("open");
const submit = (e: Event) => form.value.dispatchEvent(e);
const onSubmit = () => console.log("Sending info: ", formData);
</script>

<style scoped></style>
