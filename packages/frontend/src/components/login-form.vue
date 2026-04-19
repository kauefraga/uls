<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const password = ref('');

const isShowingPassword = ref(false);

const handleSubmit = () => {
    console.log(name.value, password.value);
};
</script>

<template>
    <div class="pt-12">
        <div class="border-y border-parchment-300 w-screen relative -left-[calc((100vw-100%)/2)]">
            <div class="border-x border-parchment-300 max-w-2xl mx-auto px-8 py-8 bg-white">
                <div class="flex flex-col gap-2 mb-6">
                    <h2 class="text-lg font-medium text-parchment-900">Sign in to your account</h2>
                    <p class="text-sm text-parchment-600">Welcome back! Access your business account entering your
                        login details below.
                    </p>
                </div>

                <form @submit.prevent="handleSubmit" class="flex flex-col gap-5">
                    <div class="flex flex-col gap-1.5">
                        <label for="name" class="text-sm text-parchment-600">Name</label>
                        <input id="name" v-model="name" type="text" placeholder="johndoe" class="border border-parchment-200 rounded-md px-3 py-2 text-sm text-parchment-900 placeholder:text-parchment-400
                 focus:outline-none focus:border-space-indigo-500 transition-colors bg-white" />
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <label for="password" class="text-sm text-parchment-600">Password</label>
                        <input id="password" v-model="password" :type="isShowingPassword ? 'text' : 'password'"
                            placeholder="••••••••" class="border border-parchment-200 rounded-md px-3 py-2 text-sm text-parchment-900 placeholder:text-parchment-400
                 focus:outline-none focus:border-space-indigo-500 transition-colors bg-white" />
                    </div>

                    <div class="flex gap-3">
                        <input type="checkbox" id="show-password" v-model="isShowingPassword" />
                        <label for="show-password" class="text-sm text-parchment-600">Show password</label>
                    </div>

                    <div class="flex justify-between items-center pt-5 mt-2 border-t border-parchment-100">
                        <a href="/forgot-password"
                            class="text-sm text-space-indigo-500 hover:text-space-indigo-700 transition-colors">
                            Forgot password?
                        </a>
                        <button type="submit" class="bg-parchment-900 text-parchment-50 text-sm font-medium px-5 py-2 rounded-md
                 hover:bg-parchment-800 hover:cursor-pointer transition-colors">
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
