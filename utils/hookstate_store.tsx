import { createState } from '@hookstate/core';

import { User } from '../models/user';
import { clearStorage, setStorage } from './storage';

// import { createContext, Dispatch, ReactElement, ReactNode, useContext, useReducer } from 'react';

export type AppState = {
  user: User;
  login: boolean;
  check: boolean;
  fetching: boolean;
};

const initialAppState: AppState = {
  user: { role: 0, name: '', token: '' },
  login: false,
  check: false,
  fetching: false,
};


export const useAppState = () => {
  const state = createState<AppState>(initialAppState);

  return {
    get getUser(): User {
      console.log('getUser', state.fetching.get());
      return state.user.get();
    },

    get getLogin(): boolean {
      console.log('getLogin', state.fetching.get());
      return state.login.get();
    },

    get getCheck(): boolean {
      console.log('getCheck', state.fetching.get());
      return state.check.get();
    },

    get getToken(): string {
      console.log('getToken', state.fetching.get());
      return state.user.get().token;
    },

    get getRole(): number {
      console.log('getRole', state.fetching.get());
      return state.user.get().role;
    },

    get isFetching(): boolean {
      console.log('isFetching', state.fetching.get());
      return state.fetching.get();
    },

    setAuth(user: User, login: boolean): void {
      console.log('setAuth', state.fetching.get());
      setStorage(user);
      state.user.set(user);
      state.login.set(login);
    },

    clearAuth(): void {
      console.log('clearAuth', state.fetching.get());
      clearStorage();
      state.user.set({ role: 0, name: '', token: '' });
      state.login.set(false);
    },

    setUser(user: User): void {
      console.log('setUser', state.fetching.get());
      state.user.set(user);
    },

    setLogin(login: boolean): void {
      console.log('setLogin', state.fetching.get());
      state.login.set(login);
      state.check.set(true);
    },

    setCheck(check: boolean): void {
      console.log('setCheck', state.fetching.get());
      state.check.set(check);
    },

    startFetching(): void {
      console.log('startFetching');
      state.fetching.set(true);
    },

    stopFetching(): void {
      console.log('stopFetching');
      state.fetching.set(false);
    },
  };
};

// type ReducerActions =
//   | {
//       type: 'SetAuth';
//       data: { user: User; login: boolean };
//     }
//   | {
//       type: 'ClearAuth';
//     }
//   | {
//       type: 'SetUser';
//       data: User;
//     }
//   | {
//       type: 'SetLogin';
//       data: boolean;
//     }
//   | {
//       type: 'Checked';
//     }
//   | {
//       type: 'Unchecked';
//     }
//   | {
//       type: 'StartFetching';
//     }
//   | {
//       type: 'StopFetching';
//     }
//   | {
//       type: 'Increase';
//     };

// interface SetAuthStore {
//   dispatch: Dispatch<ReducerActions>;
// }

// const initialSetAuthStore: SetAuthStore = {
//   dispatch: () => {
//     return true;
//   },
// };

// const reducer = (authStore: AuthStore, action: ReducerActions): AuthStore => {
//   switch (action.type) {
//     case 'SetAuth': {
//       setStorage(action.data.user);
//       return {
//         ...authStore,
//         user: action.data.user,
//         login: action.data.login,
//         check: true,
//         count: authStore.count + 1,
//       };
//     }
//     case 'ClearAuth': {
//       clearStorage();
//       return {
//         ...authStore,
//         user: { role: 0, name: '', token: '' },
//         login: false,
//         check: true,
//         count: authStore.count + 1,
//       };
//     }
//     case 'SetUser': {
//       return {
//         ...authStore,
//         user: action.data,
//         count: authStore.count + 1,
//       };
//     }
//     case 'SetLogin': {
//       return {
//         ...authStore,
//         login: action.data,
//         count: authStore.count + 1,
//       };
//     }
//     case 'Checked': {
//       return {
//         ...authStore,
//         check: true,
//       };
//     }
//     case 'Unchecked': {
//       return {
//         ...authStore,
//         check: false,
//       };
//     }
//     case 'StartFetching': {
//       return {
//         ...authStore,
//         fetching: true,
//       };
//     }
//     case 'StopFetching': {
//       return {
//         ...authStore,
//         fetching: false,
//       };
//     }
//     case 'Increase': {
//       return {
//         ...authStore,
//         count: authStore.count + 1,
//       };
//     }
//     default:
//       return authStore;
//   }
// };

// // constructor() {
// //   makeAutoObservable(this);
// //   console.log('init store');
// //   this.increase();
// //   const isServer = typeof window === 'undefined';
// //   console.log('isServer', isServer);
// //   if (!isServer && localStorage && !this.isFetching) {
// //     this.startFetching();
// //     const user = getStorage();
// //     postCheck(user.token, user.role)
// //       .then((r) => {
// //         console.log('postCheck then', this.fetching);
// //         if (r) {
// //           this.setUser(user);
// //           this.setLogin(r);
// //         } else {
// //           this.clearAuth();
// //         }
// //       })
// //       .catch(() => {
// //         console.log('postCheck catch', this.fetching);
// //         this.clearAuth();
// //       })
// //       .finally(() => {
// //         console.log('postCheck finally', this.fetching);
// //         this.stopFetching();
// //       });
// //   }
// // }

// interface AuthProviderProperties {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthStore>(initialAuthStore);

// const SetAuthContext = createContext(initialSetAuthStore);

// const AuthProvider = (properties: AuthProviderProperties): ReactElement => {
//   const { children } = properties;

//   const user = getStorage();
//   const initStore: AuthStore = {
//     user,
//     login: false,
//     check: false,
//     fetching: false,
//     count: 0,
//   };

//   const [state, dispatch] = useReducer(reducer, initStore);

//   const setState: SetAuthStore = { dispatch };

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
//   );
// };

// const useStore = (): AuthStore => {
//   return useContext(AuthContext);
// };

// export { AuthProvider, useStore };
