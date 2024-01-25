<template>
  <div class="flex flex-col gap-1 border-2 border-gray-600 rounded-md pa-2">
    <TupleProperty
      v-for="property in Object.entries(tuple).map(([name, value]) => ({ name, value }))"
      :key="property.name"
      :propertyName="property.name"
      :propertyValue="property.value"
    />
  </div>
</template>

<script setup lang="ts">
import type { Tuple } from '../types'
import TupleProperty from './TupleProperty.vue'

const props = defineProps<{
  tuple: Tuple
}>()
</script>
