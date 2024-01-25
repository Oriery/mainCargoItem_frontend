<template>
  <div class="flex flex-row gap-2">
    <span class="font-bold">{{ propertyName }}:</span>
    <span>{{ propertyValue ?? '-' }}</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  propertyName: string,
  propertyValue: any,
}>()

</script>