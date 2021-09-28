import { useStore } from '@utils/store';
import { useRouter } from 'next/router';
import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react';

import { postLogin } from '../../utils/auth';

const Login = (): JSX.Element => {
  const router = useRouter();
  const store = useStore();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [response, setResponse] = useState({ t: '', r: 0, ok: false });

  useEffect(() => {
    if (response.r > 0) {
      store.setAuth({ name: name, token: response.t, role: response.r }, true);
      router.back();
    }
    if (response.ok) {
      store.stopFetching();
    }
  }, [name, response, router, store]);

  const submit = (): void => {
    store.startFetching();
    postLogin(name, pass, setResponse);
    store.stopFetching();
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <div className="max-w-xs mx-auto pt-6">
      <form onSubmit={submitHandler}>
        <div className="box mt-4">
          <h3 className="title is-3">Авторизация{process.env.NEXT_PUBLIC_LOGIN_URL}</h3>

          <label className="block">
            <span className="text-gray-700">Имя пользователя</span>
            <input
              type="text"
              className="block rounded w-full"
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Пароль</span>
            <input
              type="password"
              className="block rounded w-full"
              onChange={(event) => setPass(event.target.value)}
              onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
                if (event.key === 'Enter') {
                  submit();
                }
              }}
            />
          </label>

          <div className="field pt-2">
            <div className="control bg-gray-50">
              <button type="button" className="button" onClick={() => submit()}>
                Отправить
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
