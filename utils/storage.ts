import { User } from '../models/user';
import { postCheck } from './auth';
import { AuthStore } from './store';

// const TOKEN_NAME = 'token';

// export const MAX_AGE = 60 * 60 * 8;

export const setStorage = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearStorage = (): void => {
  localStorage.removeItem('user');
};

export const getStorage = (): User => {
  const userStorage = localStorage.getItem('user');
  const user: User = { role: 0, name: '', token: '' };
  if (userStorage) {
    const u: User | undefined = JSON.parse(userStorage);
    if (u) {
      user.name = u.name;
      user.role = u.role;
      user.token = u.token;
    }
  }
  return user;
};

export const checkStorage = async (store: AuthStore): Promise<boolean> => {
  if (!store.check) {
    const check = await postCheck(store.getToken, store.getRole);
    if (check) {
      store.setLogin(true);
    } else {
      store.clearAuth();
    }
  }
  return new Promise(() => {store.check})
}