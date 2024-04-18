import { User } from '../types'
import { createUser, getUser, login, refreshAccessToken } from './'

const userData = {
  username: 'test',
  password: 'password',
}

describe('Users', () => {
  // Have to comment out create as I dont have a way to delete userss
  // test('should create a user', async () => {
  //   const user = await createUser(userData.username, userData.password)
  //   expect(user).toBeTruthy()
  //   expect(user.user.username).toBe(userData.username)
  // })
})


