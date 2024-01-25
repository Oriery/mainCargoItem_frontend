<template>
  <main>
    <ListTuples :path="pathToTransports" title="Transports" />
  </main>
</template>

<script setup lang="ts">
import ListTuples from '@/components/ListTuples.vue'

const pathToTransports = import.meta.env.VITE_BACK_URL + '/main/Transport'
</script>
