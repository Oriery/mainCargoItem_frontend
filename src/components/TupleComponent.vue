<template>
  <div class="flex flex-col gap-1 border-2 border-gray-600 rounded-md  pa-2">
    <div class="flex flex-col gap-1">
      <TupleProperty
        v-for="property in Object.entries(tuple).map(([name, value]) => ({ name, value }))"
        :key="property.name"
        :propertyName="property.name"
        :propertyValue="property.value"
      />
    </div>
    <div class="flex gap-1">
      <v-btn
        v-if="entity.content"
        color="grey-lighten-1"
        @click="showingContent = !showingContent"
        :icon="showingContent ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        size="x-small"
        variant="outlined"
      />
      <ListTuples
        class="grow"
        v-if="showingContent && entity.content"
        :entity="entity.content.entity"
        :forcedPath="entity.path + `(${tuple.id})` + entity.content.relativePath"
        :retriever="entity.content.retriever"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Tuple, EEntity } from '../types'
import { entities } from '../types'
import TupleProperty from './TupleProperty.vue'
import ListTuples from './ListTuples.vue'

const props = defineProps<{
  tuple: Tuple,
  entity: EEntity,
}>()

const showingContent = ref(false)
const entity = entities[props.entity]
const contentEntity = entity.content && entities[entity.content.entity]

</script>
