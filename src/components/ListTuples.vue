<template>
  <div class="flex flex-col gap-1">
    <div class="flex gap-2 content-center justify-between">
      <h1 v-if="title" class="text-2xl font-bold text-left">{{ title }}</h1>
      <v-btn
        color="grey-lighten-1"
        @click="fetchTuples"
        icon="mdi-refresh"
        size="x-small"
        variant="outlined"
        :loading="isLoading"
      />
    </div>
    <div class="flex flex-col gap-1">
      <TupleComponent
        v-for="entity in tuples"
        :key="entity.id"
        :tuple="entity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios, { AxiosError } from 'axios'
import type { Tuple } from '../types'
import TupleComponent from './TupleComponent.vue'

const props = defineProps<{
  title?: string
  path: string
}>()

const tuples = ref<Tuple[]>([])
const isLoading = ref(false)

onMounted(fetchTuples)

async function fetchTuples() {
  isLoading.value = true

  try {
    const res = await axios.get(props.path).catch((err) => {
      console.error(err)
      pushNotify.error(err.message)
      return { data: { value: [] } }
    })

    tuples.value = res.data.value
  } finally {
    isLoading.value = false
  }
}

</script>
