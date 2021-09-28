import { User } from '../models/user';
import { postCheck } from './auth';

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

export const checkStorage = async (): Promise<boolean> => {
  const user = getStorage();
  if (user.name === "" || user.token === '' || user.role === 0) {
    throw false;
  }
  return await postCheck(user.token, user.role);
};
