import { User } from '../types'
import { createUser, deleteUser, getUser, login, refreshAccessToken } from './'

const userData = {
  username: 'test',
  password: 'password',
}

describe('Users', () => {
  // Have to comment out create as I dont have a way to delete userss
  test('should create a user', async () => {
    const user = await createUser(userData.username, userData.password)
    expect(user).toBeTruthy()
    expect(user.user.username).toBe(userData.username)
  })

  test('should login a user', async () => {
    const user = await login(userData.username, userData.password)
    expect(user).toBeTruthy()
    expect(user.user.username).toBe(userData.username)
    expect(user.authToken).toBeTruthy()
    expect(user.authToken.access_token).toBeTruthy()
    expect(user.authToken.refresh_token).toBeTruthy()
  })

  test('should get a user', async () => {
    const user = await login(userData.username, userData.password)

    const second_user = await getUser(user.authToken.access_token)
    expect(second_user).toBeTruthy()
    expect(second_user.user.username).toBe(userData.username)
  })

  test('should refresh access token', async () => {
    const user = await login(userData.username, userData.password)
    const refreshToken = user.authToken.refresh_token

    const second_user = await refreshAccessToken(refreshToken)
    expect(second_user).toBeTruthy()
    expect(second_user.access_token).toBeTruthy()
  })

  test('should delete a user', async () => {
    const user = await login(userData.username, userData.password)

    const res = await deleteUser(user.authToken.access_token)
    expect(res).toBeTruthy()
    expect(res.status).toBe('success')
  })




})


