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
      await whitepaper(ctx)
      expect(ctx.status).toBe(200)

      expect(ctx.set.mock.calls[0]).toEqual(['Content-disposition', `attachment; filename=whitepaper_Karbon14_ES.pdf`])
      expect(ctx.set.mock.calls[1]).toEqual(['Content-Type', 'application/pdf'])
    })
  })

  describe('When whitepaper does not receive lang', () => {
    test('Should return 200', async () => {
      ctx.query = {}

      await whitepaper(ctx)
      expect(ctx.status).toBe(200)

      expect(ctx.set.mock.calls[0]).toEqual(['Content-disposition', `attachment; filename=whitepaper_Karbon14_ES.pdf`])
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
