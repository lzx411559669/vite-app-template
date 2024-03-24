<script setup lang="ts">
import { useRequest } from "vue-hooks-plus";
import { getUser } from "~/apis/userApi";
import Avatar from "~/assets/avatar.jpg";

const userStore = useUserStore();
useRequest(() => getUser(), {
  onSuccess: (res) => {
    if (res) {
      userStore.setName(res?.name);
    }
  },
  onError: (res) => {
    console.log("🚀 ~ useRequest ~ res:", res.message);
  }
});
</script>

<template>
  <footer
    class="footer footer-center sticky bottom-0 border-t border-base-100 bg-base-200 px-4 pt-2 text-base-content opacity-90"
  >
    <div class="flex w-full max-w-6xl flex-row items-center justify-between gap-6">
      <a
        href="https://github.com/kirklin"
        target="_blank"
        rel="nofollow"
        class="inline-flex items-center justify-center hover:opacity-90"
      ><div class="avatar mr-3">
         <div class="mask mask-squircle h-14 w-14 bg-neutral p-px">
           <img
             width="54"
             height="54"
             :src="Avatar"
             alt="Kirk Lin"
             class="mask mask-squircle"
           >
         </div>
       </div>
        <div class="text-left">
          <h2 class="text-lg font-bold text-base-content">{{ userStore.hello }}</h2>
        </div>
      </a>
      <div class="flex flex-col items-center gap-4 text-left sm:flex-row">
        <div class="flex gap-4 pb-4">
          <a
            href="https://github.com/kirklin/vite-boot"
            target="_blank"
            rel="nofollow"
            class="flex w-[130px] flex-col items-center rounded bg-base-100"
          >
            <h3 class="p-2 text-xs font-bold text-base-content/50">viteBoot™</h3>
            <p class="px-1.5 py-2 text-xs tracking-tighter text-base-content/50">
              All Rights Reserved.
            </p>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
