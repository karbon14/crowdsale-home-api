import { whitepaper } from './whitepaper'

const ctx = {
  request: {
    body: {},
  },
  set: jest.fn(),
}

describe('Whitepaper controller ', () => {
  describe('When whitepaper success', () => {
    test('Should return 200', async () => {
      const configuration = { WHITEPAPER_FILE: 'whitepaper_Karbon14.pdf' }

      await whitepaper(configuration)(ctx)
      expect(ctx.status).toBe(200)

      expect(ctx.set.mock.calls[0]).toEqual([
        'Content-disposition',
        `attachment; filename=${configuration.WHITEPAPER_FILE}`,
      ])
      expect(ctx.set.mock.calls[1]).toEqual(['Content-Type', 'application/force-download'])
    })
  })
})
