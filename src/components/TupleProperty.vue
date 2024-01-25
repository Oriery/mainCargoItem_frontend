<template>
  <div
    class="flex flex-row gap-2"
    :class="
      property.canEdit && !isEditing && 'hover:bg-gray-700 hover:rounded-sm hover:cursor-pointer'
    "
    @click="property.canEdit && !isEditing && (isEditing = true)"
  >
    <span class="font-bold">{{ property.name }}:</span>
    <span v-if="!isEditing">{{ savedPropertyValue ?? '-' }}</span>
    <div
      v-else
      class="flex gap-2 grow"
      @keypress="(event) => event.key === 'Enter' && submitEdit()"
    >
      <v-text-field
        v-if="property.type === 'number'"
        v-model="newPropertyValue"
        :label="property.name"
        outlined
        dense
      />
      <span
        v-else
        class="text-red-500"
        >Unsupported type to edit (Not implemented)</span
      >
      <v-btn
        color="green-lighten-1"
        @click.stop="submitEdit"
        icon="mdi-check"
        size="x-small"
        variant="outlined"
      />
      <v-btn
        color="red-lighten-1"
        @click.stop="cancelEdit"
        icon="mdi-close"
        size="x-small"
        variant="outlined"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Property, EEntity } from '@/types'
import { entities } from '@/types';
import axios from 'axios';
import { ca } from 'vuetify/locale';

const props = defineProps<{
  entity: EEntity
  property: Property
  propertyValue: any
  tupleId: number | string
}>()

const isEditing = ref(false)
const savedPropertyValue = ref(props.propertyValue)
const newPropertyValue = ref(props.propertyValue)

async function submitEdit() {
  isEditing.value = false
  const newVal = (() => { switch (props.property.type) {
    case 'number':
      return Number(newPropertyValue.value)
    default:
      throw new Error('Unsupported type to edit (Not implemented)')
  }})()

  const entity = entities[props.entity]
  await axios.patch(entity.path + `(${props.tupleId})`, {
    [props.property.key]: newVal,
  }).then((res) => {
    pushNotify.success(`Updated ${props.property.name}`)
    savedPropertyValue.value = newVal
    newPropertyValue.value = newVal
  }, (err) => {
    console.error(err)
    pushNotify.error(err.message)
    newPropertyValue.value = savedPropertyValue.value
  })
}

function cancelEdit() {
  isEditing.value = false
  newPropertyValue.value = savedPropertyValue.value
}
</script>
