import { makeAutoObservable } from 'mobx';
import { createContext, ReactNode, useContext } from 'react';

import { User } from '../models/user';
import { postCheck } from './auth';
import { clearStorage, getStorage, setStorage } from './storage';

class AuthStore {
  user: User = { role: 0, name: '', token: '' };
  login = false;
  check = false;
  fetching = false;
  count = 0;

  constructor() {
    makeAutoObservable(this);
    console.log('init store');
    this.increase();
    const isServer = typeof window === 'undefined';
    if (!isServer && localStorage && !this.isFetching) {
      const user = getStorage();
      this.setFetching(true);
      postCheck(user.token, user.role)
        .then((r) => {
          if (r) {
            this.setUser(user);
            this.setLogin(r);
          } else {
            this.clearAuth();
          }
        })
        .catch(() => {
          this.clearAuth();
        })
        .finally(() => {
          this.setFetching(false);
        });
    }
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

  get getRole(): number {
    this.increase();
    return this.user.role;
  }

  get isFetching(): boolean {
    this.increase();
    return this.fetching;
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

  setFetching(status: boolean): void {
    this.increase();
    this.fetching = status;
  }

  increase(): void {
    this.count += 1;
    console.log(this.count);
  }
}

interface StoreProviderProperties {
  children: ReactNode;
}

const StoreContext = createContext<AuthStore>(new AuthStore());

const StoreProvider = ({ children }: StoreProviderProperties): JSX.Element => {
  const store = new AuthStore();
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
