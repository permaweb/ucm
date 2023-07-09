import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('mint contributor rewards', async () => {
  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg)
    }
  }
  globalThis.SmartWeave = {
    block: {
      height: 1000
    }
  }
  const state = {
    U: 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw',
    name: 'UCM',
    ticker: 'PIXL',
    pairs: [],
    claimable: [],
    streaks: {},
    balances: {},
    lastReward: 0,
    recentRewards: {},
    originHeight: 0,
    contributors: {
      tiers: {
        one: {
          percent: 10,
          members: {
            'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': {
              amount: 10,
              lastMint: 0
            },
            'uf_FqRvLqjnFMc8ZzGkF4qWKuNmUIQcYP0tPlCGORQk': {
              amount: 10,
              lastMint: 0
            },
            'jnioZFibZSCcV8o-HkBXYPYEYNib4tqfexP0kCBXX_M': {
              amount: 10,
              lastMint: 0
            }
          }
        }
      }
    }
  }
  const { handle } = await import('../src/index.js')
  const result = await handle(state, { 
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI', 
    input: { function: 'contributorMint'}
  })
  //console.log(JSON.stringify(result, null, 2))
  assert.equal(result.state.balances['vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI'], 83333334)
  assert.equal(result.state.contributors.tiers.one.members['vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI'].lastMint, 1000)
  assert.ok(true)
})

test.run()