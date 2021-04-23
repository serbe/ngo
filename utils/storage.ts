import { User } from './auth'

export const getUser = (cookies: { [key: string]: string }): User => {
  const userStorage: string | null = cookies.user
  const user: User = { role: 0, name: '', token: '' }
  if (userStorage) {
    const u: User | undefined = JSON.parse(userStorage)
    if (u) {
      user.name = u.name
      user.role = u.role
      user.token = u.token
    }
  }
  return user
}
