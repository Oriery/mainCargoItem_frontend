<template>
  <div class="flex flex-col gap-1 border-2 border-gray-600 rounded-md pa-2">
    <div class="flex justify-between">
      <span class="font-bold text-start">{{ entity.titleSingular }}</span>
      <v-btn
        color="red-darken-4"
        @click="deleteTuple"
        icon="mdi-delete"
        size="x-small"
        variant="outlined"
      />
    </div>
    <div class="flex flex-col gap-1">
      <TupleProperty
        v-for="property in entity.showProperties"
        :key="property.key"
        :property="property"
        :propertyValue="tuple[property.key]"
        :entity="props.entity"
        :tuple-id="tuple.id"
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
        :parent="{
          entity: props.entity,
          id: tuple.id,
        }"
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
import axios from 'axios'

const props = defineProps<{
  tuple: Tuple
  entity: EEntity
}>()

const showingContent = ref(false)
const entity = entities[props.entity]

async function deleteTuple() {
  await axios.delete(entity.path + `(${props.tuple.id})`).then(() => {
    pushNotify.success(`Deleted ${entity.titleSingular} ${props.tuple.id}`)
  }, (error) => {
    pushNotify.error(`Failed to delete ${entity.titleSingular} ${props.tuple.id}: ${error.message}`)
  })
}

</script>
