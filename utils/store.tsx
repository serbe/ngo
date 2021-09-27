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
          console.log('postCheck then', this.fetching);
          if (r) {
            this.setUser(user);
            this.setLogin(r);
          } else {
            this.clearAuth();
          }
        })
        .catch(() => {
          console.log('postCheck catch', this.fetching);
          this.clearAuth();
        })
        .finally(() => {
          console.log('postCheck finally', this.fetching);
          this.setFetching(false);
        });
    }
  }

  get getUser(): User {
    this.increase();
    console.log('getUser', this.fetching);
    return this.user;
  }

  get getLogin(): boolean {
    this.increase();
    console.log('getLogin', this.fetching);
    return this.login;
  }

  get getCheck(): boolean {
    this.increase();
    console.log('getCheck', this.fetching);
    return this.check;
  }

  get getToken(): string {
    this.increase();
    console.log('getToken', this.fetching);
    return this.user.token;
  }

  get getRole(): number {
    this.increase();
    console.log('getRole', this.fetching);
    return this.user.role;
  }

  get isFetching(): boolean {
    this.increase();
    console.log('isFetching', this.fetching);
    return this.fetching;
  }

  setAuth(user: User, login: boolean): void {
    this.increase();
    console.log('setAuth', this.fetching);
    setStorage(user);
    this.setUser(user);
    this.setLogin(login);
  }

  clearAuth(): void {
    this.increase();
    console.log('clearAuth', this.fetching);
    clearStorage();
    this.setUser({ role: 0, name: '', token: '' });
    this.setLogin(false);
  }

  setUser(user: User): void {
    this.increase();
    console.log('setUser', this.fetching);
    this.user = user;
  }

  setLogin(login: boolean): void {
    this.increase();
    console.log('setLogin', this.fetching);
    this.login = login;
    this.setCheck(true);
  }

  setCheck(check: boolean): void {
    this.increase();
    console.log('setCheck', this.fetching);
    this.check = check;
  }

  setFetching(status: boolean): void {
    this.increase();
    console.log('setFetching', this.fetching);
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
