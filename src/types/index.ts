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
  }
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
}

export const entities: Record<EEntity, Entity> = {
  [EEntity.Item]: itemEntity,
  [EEntity.Transport]: transportEntity,
}
