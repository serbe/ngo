import React, { FormEvent, KeyboardEvent, useRef } from 'react'

// import { FormField } from '../../components/formfield'
import { login } from '../../utils/auth'

const Login = (): JSX.Element => {
  // const { setAuth } = useAuthState()

  const nameRef = useRef<HTMLInputElement | null>(null)
  const passRef = useRef<HTMLInputElement | null>(null)

  // const submit = (): void => {
  //   login(nameRef.current?.value || '', passRef.current?.value || '')
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  return (
    <div className="container w300">
      <form onSubmit={submitHandler}>
        <div className="box mt-4">
          <h3 className="title is-3">Авторизация{process.env.NEXT_PUBLIC_LOGIN_URL}</h3>
          <label className="block">
            <span className="text-gray-700">Имя пользователя</span>
            <input ref={nameRef} type="text" className="block w-full" />
          </label>
          <label className="block">
            <span className="text-gray-700">Пароль</span>
            <input
              type="password"
              className="block w-full"
              ref={passRef}
              onKeyPress={(event: KeyboardEvent<HTMLInputElement>): void => {
                if (event.key === 'Enter') {
                  // submit()
                }
              }}
            />
          </label>

          <div className="field">
            <div className="control">
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
  )
}

export default Login
