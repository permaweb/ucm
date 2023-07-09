import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('evolve contract', async () => {
  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg)
    }
  }
  globalThis.SmartWeave = {
    block: {
      height: 1000
    },
    contract: {
      owner: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI'
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
    contributors: {},
    canEvolve: true
  }
  const { handle } = await import('../src/index.js')
  const result = await handle(state, { 
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI', 
    input: { function: 'evolve', value: 'QG8MgQif1hSWpFzEsL0r5jTlTDfESpUnELL2rSfyivU'}
  })
  //console.log(JSON.stringify(result, null, 2))
  assert.equal(result.state.evolve, 'QG8MgQif1hSWpFzEsL0r5jTlTDfESpUnELL2rSfyivU')
  assert.ok(true)
})

test('cant evolve request is passed window', async () => {
  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg)
    }
  }
  globalThis.SmartWeave = {
    block: {
      height: 100000000
    },
    contract: {
      owner: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI'
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
    contributors: {},
    canEvolve: true
  }
  const { handle } = await import('../src/index.js')
  const result = await handle(state, { 
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI', 
    input: { function: 'evolve', value: 'QG8MgQif1hSWpFzEsL0r5jTlTDfESpUnELL2rSfyivU'}
  })
  //console.log(JSON.stringify(result, null, 2))
  assert.equal(result.state.evolve, undefined)
  assert.ok(true)
})

test.run()