import { makeAutoObservable } from 'mobx';
import { createContext, ReactNode, useContext } from 'react';

import { User } from '../models/user';
import { checkStorage, clearStorage, getStorage, setStorage } from './storage';

class AuthStore {
  user: User = { role: 0, name: '', token: '' };
  login = false;
  check = false;
  fetching = false;

  constructor() {
    makeAutoObservable(this);
    const isServer = typeof window === 'undefined';
    if (!isServer && localStorage && !this.isFetching) {
      this.startFetching();
      checkStorage()
        .then((r) => {
          if (r) {
            this.setAuth(getStorage(), r);
          } else {
            this.clearAuth();
          }
        })
        .catch(() => {
          this.clearAuth();
        })
        .finally(() => {
          this.stopFetching();
        });
    }
  }

  get getUser(): User {
    return this.user;
  }

  get getLogin(): boolean {
    return this.login;
  }

  get getToken(): string {
    return this.user.token;
  }

  get getRole(): number {
    return this.user.role;
  }

  get isFetching(): boolean {
    return this.fetching;
  }

  get isChecking(): boolean {
    return this.check;
  }

  setAuth(user: User, login: boolean): void {
    setStorage(user);
    this.setUser(user);
    this.setLogin(login);
    this.setCheck(true);
  }

  clearAuth(): void {
    clearStorage();
    this.setUser({ role: 0, name: '', token: '' });
    this.setLogin(false);
    this.setCheck(true);
  }

  setUser(user: User): void {
    this.user = user;
  }

  setLogin(login: boolean): void {
    this.login = login;
  }

  setCheck(check: boolean): void {
    this.check = check;
  }

  startFetching(): void {
    this.fetching = true;
  }

  stopFetching(): void {
    this.fetching = false;
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
