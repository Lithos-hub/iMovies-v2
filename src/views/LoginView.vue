<template>
  <div class="centered">
    <section
      class="mx-auto bg-white rounded-[10px] shadow-lg p-10 min-w-[250px] w-[500px]"
    >
      <h1 class="text-4xl">iMovies</h1>
      <form @submit.prevent="login">
        <section class="flex flex-col gap-10 justify-around mt-10">
          <div class="flex flex-col">
            <label for="Email" class="font-bold label">Email</label>
            <input placeholder="Write your email" name="Email" class="input" />
          </div>
          <div class="flex flex-col">
            <label for="Email" class="font-bold label">Password</label>
            <input
              type="password"
              placeholder="Write your password"
              autocomplete="true"
              name="Email"
              class="input"
            />
          </div>
        </section>
        <div class="mt-5">
          <input type="submit" value="Login" class="button__primary" />
        </div>
      </form>
      <section class="mt-7">
        <small class="block text-cyan-800">Don't have an account yet?</small>
        <input
          type="button"
          value="Register"
          class="button__secondary"
          @click="goTo('register')"
        />
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from "../stores/Navigation";

const { goTo } = useNavigationStore();

// TODO: Login
const login = () => goTo("/home");
</script>

<style scoped></style>
