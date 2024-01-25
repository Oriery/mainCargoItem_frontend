<template>
  <main>
    <ListTuples
      :entity="EEntity.Transport"
    />
  </main>
</template>

<script setup lang="ts">
import ListTuples from '@/components/ListTuples.vue'
import { EEntity } from '@/types'
</script>
