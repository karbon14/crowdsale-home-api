import { whitepaper, whitepaperSchema } from './whitepaper'

const ctx = {
  request: {},
  query: {
    lang: 'es',
  },
  set: jest.fn(),
}

describe('Whitepaper controller ', () => {
  describe('When whitepaper success', () => {
    test('Should return 200', async () => {
      const configuration = { WHITEPAPER_FILE_ES: 'whitepaper_Karbon14.pdf' }

      await whitepaper(configuration)(ctx)
      expect(ctx.status).toBe(200)

      expect(ctx.set.mock.calls[0]).toEqual([
        'Content-disposition',
        `attachment; filename=${configuration.WHITEPAPER_FILE_ES}`,
      ])
      expect(ctx.set.mock.calls[1]).toEqual(['Content-Type', 'application/pdf'])
    })
  })

  describe('When whitepaper does not receive lang', () => {
    test('Should return 200', async () => {
      ctx.query = {}
      const configuration = { WHITEPAPER_FILE_EN: 'whitepaper_Karbon14.pdf' }

      await whitepaper(configuration)(ctx)
      expect(ctx.status).toBe(200)

      expect(ctx.set.mock.calls[0]).toEqual([
        'Content-disposition',
        `attachment; filename=${configuration.WHITEPAPER_FILE_EN}`,
      ])
      expect(ctx.set.mock.calls[1]).toEqual(['Content-Type', 'application/pdf'])
    })
  })

  describe('When whitepaperSchema success', () => {
    it('Should object with schema', async () => {
      const schema = whitepaperSchema()

      expect(schema).toHaveProperty('lang')
    })
  })
})
