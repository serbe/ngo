import { observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

type SerializedStore = {
  title: string
  content: string
}

export class DataStore {
  @observable title: string | undefined

  hydrate(serializedStore: SerializedStore): void {
    this.title = serializedStore.title != null ? serializedStore.title : ''
  }

  changeTitle(newTitle: string): void {
    this.title = newTitle
  }
}

export const fetchInitialStoreState = async (): Promise<boolean> => {
  // You can do anything to fetch initial store state
  return false
}
