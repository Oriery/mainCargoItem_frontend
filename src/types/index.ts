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
  },
  showProperties: Record<string, Property>
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
    entity: EEntity.Item,
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
      key: 'isMci',
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
}

export const entities: Record<EEntity, Entity> = {
  [EEntity.Item]: itemEntity,
  [EEntity.Transport]: transportEntity,
}
