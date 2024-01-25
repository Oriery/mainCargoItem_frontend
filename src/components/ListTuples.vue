<template>
  <div class="flex flex-col gap-1">
    <div class="flex gap-2 content-center justify-between">
      <h1
        v-if="entity.titlePlural"
        class="text-2xl font-bold text-left"
      >
        {{ entity.titlePlural }}
      </h1>
      <div class="flex gap-1">
        <v-btn
          color="grey-lighten-1"
          @click="fetchTuples"
          icon="mdi-refresh"
          size="x-small"
          variant="outlined"
          :loading="isLoading"
        />
        <v-btn
          color="green-lighten-1"
          @click="createTuple"
          icon="mdi-plus"
          size="x-small"
          variant="outlined"
        />
      </div>
    </div>
    <div
      v-if="tuples.length"
      class="flex flex-col gap-1"
    >
      <TupleComponent
        v-for="tuple in tuples"
        :key="tuple.id"
        :tuple="tuple"
        :entity="props.entity"
        :tuple-path="path + `(${tuple.id})`"
      />
    </div>
    <div
      v-else
      class="flex flex-col gap-1"
    >
      <span class="text-center">No {{ entity.titlePlural }} found</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios, { AxiosError } from 'axios'
import type { Tuple, EEntity, Retriever } from '../types'
import { entities } from '../types'
import TupleComponent from './TupleComponent.vue'

const props = defineProps<{
  entity: EEntity
  forcedPath?: string
  retriever?: Retriever
  parent?: {
    id: number | string
    entity: EEntity
  }
}>()

const entity = entities[props.entity]

const tuples = ref<Tuple[]>([])
const isLoading = ref(false)

const path = props.forcedPath ?? entity.path

onMounted(fetchTuples)

async function fetchTuples() {
  isLoading.value = true
  tuples.value = []

  try {
    const res = await axios.get(path).catch((err) => {
      console.error(err)
      pushNotify.error(err.message)
      return { data: { value: [] } }
    })

    if (props.retriever) {
      tuples.value = res.data.value.map(props.retriever)
    } else {
      tuples.value = res.data.value
    }
  } finally {
    isLoading.value = false
  }
}

async function createTuple() {
  await (() => {
    const parentEntity = props.parent && entities[props.parent.entity]

    if (!parentEntity?.content?.createChild) {
      return axios.post(path, {
        id: 10000000 + Math.floor(Math.random() * 10000000),
      })
    } else {
      return parentEntity.content!.createChild(props.parent!.id)
    }
  })().then(
    () => {
      pushNotify.success(`Created ${entity.titleSingular}`)
      fetchTuples()
    },
    (error) => {
      pushNotify.error(`Failed to create ${entity.titleSingular}: ${error.message}`)
    },
  )
}
</script>
