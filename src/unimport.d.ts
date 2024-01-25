export {}
declare global {
  const pushNotify: typeof import('/Users/sasha/repositories/mainCargoItem_frontend/src/main')['pushNotify']
}
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface ComponentCustomProperties {
    readonly pushNotify: UnwrapRef<typeof import('/Users/sasha/repositories/mainCargoItem_frontend/src/main.ts')['pushNotify']>
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    readonly pushNotify: UnwrapRef<typeof import('/Users/sasha/repositories/mainCargoItem_frontend/src/main.ts')['pushNotify']>
  }
}
