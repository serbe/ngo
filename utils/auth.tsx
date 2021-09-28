import { Dispatch, SetStateAction } from 'react';

import { clearStorage, getStorage } from './storage';

const loginURL = (process.env.NEXT_PUBLIC_LOGIN_URL as string) || '/go/login';
const checkURL = (process.env.NEXT_PUBLIC_CHECK_URL as string) || '/go/check';

export interface CJson {
  r: boolean;
}

interface TJson {
  t: string;
  r: number;
}

export const postLogin = (
  name: string,
  pass: string,
  setter: Dispatch<
    SetStateAction<{
      t: string;
      r: number;
      ok: boolean;
    }>
  >
): void => {
  fetch(loginURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ u: name, p: btoa(pass) }),
  })
    .then((response) => response.json())
    .then((response) => response as TJson)
    .then((response) => {
      setter({ t: response.t, r: response.r, ok: true });
    })
    .catch(() => {
      setter({ t: '', r: 0, ok: true });
    });
};

export const postCheck = (token: string, role: number): Promise<boolean> => {
  return fetch(checkURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ t: token, r: role }),
  })
    .then((response) => response.json())
    .then((response) => response as CJson)
    .then((jsonData) => {
      return jsonData.r;
    })
    .catch(() => {
      return false;
    });
};

export const logout = (): void => {
  clearStorage();
};

export const userIsLogged = async (): Promise<boolean> => {
  const user = getStorage();
  const res = await fetch(checkURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{ "t": "${user.token}", "r": ${user.role} }`,
  });
  const cj: CJson = await res.json();
  return cj.r;
};
