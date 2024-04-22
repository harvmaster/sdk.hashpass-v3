import { getDomainRecommendation, getLogos }  from '.'
import { createUser, deleteUser, login } from '../Users'

const testUser = {
  username: 'testuser',
  password: 'testpassword'
}

let access_token = ''

describe('Service Info', () => {
  beforeAll(async () => {
    // Create a user
    await createUser(testUser.username, testUser.password).catch(err => console.error(err))
    const user = await login(testUser.username, testUser.password)
    expect(user).toBeDefined()
    expect(user.user).toBeDefined()
    expect(user.authToken).toBeDefined()

    access_token = user.authToken.access_token!
  })

  it('should get domain recommendations', async () => {
    const domain = 'google.com'
    const recommendations = await getDomainRecommendation(domain, access_token)

    expect(recommendations).toBeDefined()
    expect(Array.isArray(recommendations)).toBe(true)
    expect(recommendations.length).toBeGreaterThan(0)
  })

  it('should get logos', async () => {
    const domain = 'google.com'
    const logos = await getLogos(domain)

    expect(logos).toBeDefined()
    expect(Array.isArray(logos)).toBe(true)
    expect(logos.length).toBeGreaterThan(0)
  })

  afterAll(async () => {
    // Delete the user
    await deleteUser(access_token)
  })
})