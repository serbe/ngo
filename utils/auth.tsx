// import { createContext, Dispatch, useContext } from 'react';

import { clearStorage, getUser } from './storage';
import { useStore } from './store';

const loginURL = (process.env.NEXT_PUBLIC_LOGIN_URL as string) || '/go/login';
const checkURL = (process.env.NEXT_PUBLIC_CHECK_URL as string) || '/go/check';

export interface CJson {
  r: boolean;
}

interface TJson {
  t: string;
  r: number;
}

export const PostLogin = (name: string, pass: string): void => {
  const store = useStore();
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
    .then((jsonData) => {
      store.setAuth(
        {
          role: jsonData.r,
          name,
          token: jsonData.t,
        },
        true
      );
    });
};

export const PostCheck = (token: string, role: string): void => {
  // const store = useStore()
  fetch(checkURL, {
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
    });
};

export const logout = (): void => {
  clearStorage();
};

// interface AuthProviderProperties {
//   children: ReactNode
// }

// export const AuthProvider = (properties: AuthProviderProperties): ReactElement => {
//   const { children } = properties

//   const user = getStorage()
//   const initState: AuthState = {
//     user,
//     login: false,
//     check: false,
//   }

//   const [state, dispatch] = useReducer(reducer, initState)

//   const setState: SetAuthState = { dispatch }

//   // const contentValues = useMemo(
//   //   () => ({
//   //     state,
//   //     dispatch,
//   //   }),
//   //   [state, dispatch],
//   // );

//   return (
//     <AuthContext.Provider value={state}>
//       <SetAuthContext.Provider value={setState}>{children}</SetAuthContext.Provider>
//     </AuthContext.Provider>
//   )
// }

export const userIsLogged = async (cookies: { [key: string]: string }): Promise<boolean> => {
  const user = getUser(cookies);
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

// fetch = async () => {
//   this.isFetching = true

//   try {
//     const response = await getApiData()
//     this.items = response.items
//     this.totalCount = response.totalCount
//   } catch (e) {
//     this.items = []
//     this.totalCount = 0
//     this.error = e.message
//   } finally {
//     this.isFetching = false
//     this.error = null
//   }
// }
