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

  test('should not create a user with the same username', async () => {
    try {
      await createUser(userData.username, userData.password)
    } catch (err: any) {
      expect(err).toBeTruthy()
      expect(err.response.status).toBe(409)
    }
  })
  
  test('should delete a user', async () => {
    const user = await login(userData.username, userData.password)

    const res = await deleteUser(user.authToken.access_token)
    expect(res).toBeTruthy()
    expect(res.status).toBe('success')
  })

  test('should not login a user with wrong password', async () => {
    try {
      await login(userData.username, 'wrongpassword')
    } catch (err: any) {
      expect(err).toBeTruthy()
      expect(err.response.status).toBe(401)
    }
  })

  test('should not login a user with wrong username', async () => {
    try {
      await login('wrongusername', userData.password)
    } catch (err: any) {
      console.log(err)
      expect(err).toBeTruthy()

      expect(err.response.status).toBe(401)
    }
  })

  test('should not get a user with wrong access token', async () => {
    try {
      await getUser('wrongaccesstoken')
    } catch (err: any) {
      expect(err).toBeTruthy()
      expect(err.response.status).toBe(400)
    }
  })

  test('should not delete a user with wrong access token', async () => {
    try {
      await deleteUser('wrongaccesstoken')
    } catch (err: any) {
      expect(err).toBeTruthy()
      expect(err.response.status).toBe(400)
    }
  })

})


