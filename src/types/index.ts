import axios from "axios"

export type Tuple = Record<string, any>

export type Retriever = (tuple: Tuple) => Tuple

export type Entity = {
  path: string
  titleSingular?: string
  titlePlural?: string
  content?: {
    relativePath: string
    retriever?: Retriever
    entity: EEntity
    createChild?: (parentId : number | string) => Promise<void>
  },
  showProperties: Record<string, Property>
  boundFunctions?: Record<string, BoundFunction>
}

export type BoundFunction = {
  name: string
  fn: (id: number | string) => Promise<void>
}

export type Property = {
  key: string
  name: string
  type: 'string' | 'number' | 'boolean'
  canEdit: boolean
}

export enum EEntity {
  Item = 'Item',
  Transport = 'Transport',
}

const itemEntity: Entity = {
  path: import.meta.env.VITE_BACK_URL + '/main/Item',
  titleSingular: 'Item',
  titlePlural: 'Items',
  content: {
    relativePath: '/content',
    entity: EEntity.Item
  },
  showProperties: {
    id: {
      key: 'id',
      name: 'ID',
      type: 'number',
      canEdit: false,
    },
    class_id: {
      key: 'class_id',
      name: 'Class ID',
      type: 'number',
      canEdit: true,
    },
    containedIn_id: {
      key: 'containedIn_id',
      name: 'Contained In ID',
      type: 'number',
      canEdit: true,
    },
    fromLocation_id: {
      key: 'fromLocation_id',
      name: 'From Location ID',
      type: 'number',
      canEdit: true,
    },
    toLocation_id: {
      key: 'toLocation_id',
      name: 'To Location ID',
      type: 'number',
      canEdit: true,
    },
    isMci: {
      key: 'is_mci',
      name: 'Is MCI',
      type: 'boolean',
      canEdit: false,
    },
  },
}

const transportEntity: Entity = {
  path: import.meta.env.VITE_BACK_URL + '/main/Transport',
  titleSingular: 'Transport',
  titlePlural: 'Transports',
  content: {
    relativePath: '/content?$expand=item',
    retriever: (tuple: Tuple) => tuple.item,
    entity: EEntity.Item,
    createChild: async (parentId: number | string) => {
      const id = 10000000 + Math.floor(Math.random() * 10000000)
      Promise.all(
        [
          axios.post(import.meta.env.VITE_BACK_URL + '/main/Item', {
            id,
            containedIn_id: null,
          }),
          axios.post(import.meta.env.VITE_BACK_URL + '/main/Transport2RootItem', {
            transport_id: parentId,
            item_id: id,
          }),
        ] 
      )
    }
  },
  showProperties: {
    id: {
      key: 'id',
      name: 'ID',
      type: 'number',
      canEdit: false,
    },
    route_id: {
      key: 'route_id',
      name: 'Route ID',
      type: 'number',
      canEdit: true,
    },
    location_id: {
      key: 'location_id',
      name: 'Location ID',
      type: 'number',
      canEdit: false,
    },
  },
  boundFunctions: {
    updateMcis: {
      name: 'Recalculate MCIs',
      fn: async (id: number | string) => {
        await axios.post(import.meta.env.VITE_BACK_URL + `/main/Transport(${id})/updateMcis`, {})
      }
    }
  }
}

export const entities: Record<EEntity, Entity> = {
  [EEntity.Item]: itemEntity,
  [EEntity.Transport]: transportEntity,
}
