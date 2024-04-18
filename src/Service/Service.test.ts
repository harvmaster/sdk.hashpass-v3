import { ServiceProps } from '../types'
import { Service, EncryptedService } from './'

const data: ServiceProps = {
  name: 'test',
  domain: 'test.com',
  logo: 'test.png',
  notes: {
    username: 'test',
    email: 'test',
    other: 'test'
  },
  encoding: 'base58',
  date_created: Date.now(),
  stats: {
    lastUsed: Date.now(),
    timesUsed: 0
  }
}

describe('Service can be created and morhped between encrypted and decrypted', () => {
  test('Service', async () => {
    const service = new Service(data)
    expect(service.encrypted).toBe(false)
    expect(service.name).toBe('test')
    expect(service.domain).toBe('test.com')
    expect(service.logo).toBe('test.png')
    expect(service.notes.username).toBe('test')
    expect(service.notes.email).toBe('test')
    expect(service.notes.other).toBe('test')
    expect(service.encoding).toBe('base58')
    expect(service.date_created).toBe(data.date_created)
    expect(service.stats.lastUsed).toBe(data.stats.lastUsed)
    expect(service.stats.timesUsed).toBe(0)

    const encryptedService = await service.encrypt('test')
    expect(encryptedService).toBeDefined()
    expect(encryptedService).toBeInstanceOf(EncryptedService)
    expect(encryptedService.encrypted).toBe(true)
    expect(encryptedService.name).toBe('test')
    expect(encryptedService.domain).toBe('test.com')
    expect(encryptedService.logo).toBe('test.png')
    expect(encryptedService.notes.username).not.toBe('test')
    expect(encryptedService.notes.email).not.toBe('test')
    expect(encryptedService.notes.other).not.toBe('test')
    expect(encryptedService.encoding).toBe('base58')
    expect(encryptedService.date_created).toBe(data.date_created)
    expect(encryptedService.stats.lastUsed).toBe(data.stats.lastUsed)
    expect(encryptedService.stats.timesUsed).toBe(0)

    const decryptedService = await encryptedService.decrypt('test')
    const json = decryptedService.toJSON()
    expect(json).toBeDefined()
    expect(json).toEqual({
      encrypted: false,
      ...data
    })
  })
})

describe('EncryptedService', () => {
  test('Encrypted Service Notes should be readonly', async () => {
    const service = new Service(data)
    const encryptedService = await service.encrypt('test')

    expect(encryptedService.notes).toBeDefined()
    expect(() => {
      // @ts-ignore
      encryptedService.notes.username = 'new'
    }).toThrow()
    expect(() => {
      // @ts-ignore
      encryptedService.notes.email = 'new'
    }).toThrow()
    expect(() => {
      // @ts-ignore
      encryptedService.notes.other = 'new'
    }).toThrow()
  })

  test('Encrypted Service that is created with undecryptable notes should throw', async () => {
    const encryptedService = new EncryptedService(data)
    expect(encryptedService).toBeDefined()
    expect(encryptedService).toBeInstanceOf(EncryptedService)

    expect(() => encryptedService.decrypt('test')).rejects.toThrow()
  })

  test('Encrypted Service should throw when trying to decrypt with wrong key', async () => {
    const service = new Service(data)
    const encryptedService = await service.encrypt('test')

    expect(encryptedService).toBeDefined()
    expect(encryptedService).toBeInstanceOf(EncryptedService)

    expect(() => encryptedService.decrypt('wrong')).rejects.toThrow()
  })

  test('Encrypted Service should throw when a single note is not decryptable', async () => {
    const service = new Service(data)
    const encryptedService = await service.encrypt('test')

    expect(encryptedService).toBeDefined()
    expect(encryptedService).toBeInstanceOf(EncryptedService)

    const notes = encryptedService.toJSON().notes
    notes.username = 'test'
    const json = {
      ...encryptedService.toJSON(),
      notes
    }

    const encryptedServiceWithBadNote = new EncryptedService(json)
    expect(encryptedServiceWithBadNote).toBeDefined()
    expect(encryptedServiceWithBadNote).toBeInstanceOf(EncryptedService)

    expect(() => encryptedServiceWithBadNote.decrypt('test')).rejects.toThrow()
  })
})