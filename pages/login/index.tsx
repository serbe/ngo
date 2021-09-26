import React, { FormEvent, KeyboardEvent, useRef } from 'react';

import { PostLogin } from '../../utils/auth';

// import { FormField } from '../../components/formfield'
const Login = (): JSX.Element => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const submit = (): void => {
    PostLogin(nameRef.current?.value || '', passRef.current?.value || '');
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
            <input ref={nameRef} type="text" className="block rounded w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">Пароль</span>
            <input
              type="password"
              className="block rounded w-full"
              ref={passRef}
              onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
                if (event.key === 'Enter') {
                  submit();
                }
              }}
            />
          </label>

          <div className="field pt-2">
            <div className="control bg-gray-50">
              <button
                type="button"
                className="button"
                // onClick={() => submit()}
              >
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
