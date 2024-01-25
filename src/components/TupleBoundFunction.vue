<template>
  <v-btn
    color="gray-lighten-1"
    @click.stop="execute"
    size="small"
    variant="outlined"
    :loading="isLoading"
  >
    {{ func.name }}
  </v-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BoundFunction } from '@/types'

const props = defineProps<{
  func: BoundFunction
  tupleId: number | string
}>()

const isLoading = ref(false)

async function execute() {
  isLoading.value = true
  await props.func.fn(props.tupleId).then(() => {
    isLoading.value = false
    pushNotify.success(`Successfully executed "${props.func.name}"`)
  }, () => {
    pushNotify.error(`Failed to execute "${props.func.name}"`)
    isLoading.value = false
  })
}

</script>
