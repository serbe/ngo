import { makeAutoObservable } from 'mobx';
import { createContext, FC, ReactNode, useContext, useEffect } from 'react';

import { User } from '../models/user';
import { clearStorage, setStorage } from './storage';

class AuthStore {
  user: User = { role: 0, name: '', token: '' }
  login: boolean = false
  check: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  get getUser() {
    return this.user
  }

  get getLogin() {
    return this.login
  }

  get getCheck() {
    return this.check
  }

  get getToken() {
    return this.user.token
  }

  setAuth(user: User, login: boolean) {
    setStorage(user)
    this.setUser(user)
    this.setLogin(login)
  }

  clearAuth() {
    clearStorage()
    this.setUser({ role: 0, name: '', token: '' })
    this.setLogin(false)
  }

  setUser(user: User) {
    this.user = user
  }

  setLogin(login: boolean) {
    this.login = login
    this.setCheck(true)
  }

  setCheck(check: boolean) {
    this.check = check
  }
}

interface StoreProviderProperties {
  store: AuthStore
  children: ReactNode
}

const StoreContext = createContext<AuthStore>(new AuthStore())

const StoreProvider = ({ store, children }: StoreProviderProperties) => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     store.writeBlock()
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [store])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

const useStore = () => {
  return useContext(StoreContext)
}

export { AuthStore, StoreProvider, useStore }
