import { makeAutoObservable } from 'mobx';
import { createContext, ReactNode, useContext } from 'react';

import { User } from '../models/user';
import { clearStorage, setStorage } from './storage';

class AuthStore {
  user: User = { role: 0, name: '', token: '' };
  login = false;
  check = false;
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  get getUser(): User {
    this.increase();
    return this.user;
  }

  get getLogin(): boolean {
    this.increase();
    return this.login;
  }

  get getCheck(): boolean {
    this.increase();
    return this.check;
  }

  get getToken(): string {
    this.increase();
    return this.user.token;
  }

  setAuth(user: User, login: boolean): void {
    this.increase();
    setStorage(user);
    this.setUser(user);
    this.setLogin(login);
  }

  clearAuth(): void {
    this.increase();
    clearStorage();
    this.setUser({ role: 0, name: '', token: '' });
    this.setLogin(false);
  }

  setUser(user: User): void {
    this.increase();
    this.user = user;
  }

  setLogin(login: boolean): void {
    this.increase();
    this.login = login;
    this.setCheck(true);
  }

  setCheck(check: boolean): void {
    this.increase();
    this.check = check;
  }

  increase(): void {
    this.count += 1;
    console.log(this.count);
  }
}

interface StoreProviderProperties {
  store: AuthStore;
  children: ReactNode;
}

const StoreContext = createContext<AuthStore>(new AuthStore());

const StoreProvider = ({ store, children }: StoreProviderProperties): JSX.Element => {
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     store.writeBlock()
  //   }, 5000)

  //   return () => clearInterval(interval)
  // }, [store])

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

const useStore = (): AuthStore => {
  return useContext(StoreContext);
};

export { AuthStore, StoreProvider, useStore };
