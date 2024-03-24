<script setup lang="ts">
import { useCount } from "~/store/counter";

const counter = useCount();
</script>

<template>
  <div class="flex flex-col items-center gap-20 bg-base-100 py-20">
    <div class="mockup-phone">
      <div class="camera" />
      <div class="display">
        <div class="phone-1 artboard artboard-demo">
          <p class="text-xl font-medium uppercase tracking-wide">
            Counter:
          </p>
          <p class="text-4xl font-bold uppercase">
            {{ counter.count }}
          </p>
          <button type="button" class="btn-primary btn" @click="counter.increment()">
            increment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
