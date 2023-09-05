// sell pixl
import { test } from 'uvu'
import * as assert from 'uvu/assert'

globalThis.ContractAssert = function (expr, msg) {
  if (!expr) {
    throw new Error(msg);
  }
};

test('sell pixl', async () => {
  globalThis.SmartWeave = setupGlobalState()
  const state = setupContractState()
  const allowAction = setupAllowAction()
  const createOrderAction = setupCreateOrderAction()

  const { handle } = await import('../src/index.js')
  assert.equal(state.balances["jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8"], 1000 * 1e6)
  // allow
  const result = await handle(state, allowAction)
  // console.log(JSON.stringify(result.state, null, 2))
  // createOrder
  const result2 = await handle(result.state, createOrderAction)
  // verify createOrder is created
  // console.log(JSON.stringify(result2, null, 2))
  // verify balance is correct
  assert.equal(result2.state.balances["hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8"], 1000 * 1e6)
  assert.equal(result2.state.balances["jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8"], 0)
  assert.ok(true)

})

test.run()

function setupGlobalState() {
  return {
    block: {
      height: 1209775,
    },
    transaction: {
      id: "oeYUgBDGBql5-ik4DJ5cDvacwmYe03jx6A5pQK7DEBw",
    },
    contract: {
      id: "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8",
    },
    contracts: {
      readContractState(id) {
        const VOUCH_DAO = "_z0ch80z_daDUFqC9jHjfOL8nekJcok4ZRkE_UesYsk"
        if (id === VOUCH_DAO) {
          return Promise.resolve({ vouched: { '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4': 1, '1BS7nloUNSDQhpN8cMNUKIfLeTDKDXSKKsqGqPWl_Jo': 1, 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 1 } })
        }
      }
    }
  };
}

function setupContractState() {
  return {
    U: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    streaks: {},
    balances: {
      "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8": 1000 * 1e6
    },
    claimable: [],
    name: 'PIXL',
    ticker: 'PIXL',
    pairs: [
      {
        pair: ["hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8", "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw"],
        orders: [],
        pricedata: {},
      },
    ],
    recentRewards: {},
    lastReward: 0,
  }
}

function setupAllowAction() {
  return {
    caller: "jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8",
    input: {
      function: 'allow',
      target: "hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8",
      qty: 1000 * 1e6,
    }
  }
}

function setupCreateOrderAction() {
  return {
    caller: 'jnbRhoH3JGTdRz0Y9X-gh-eosrbIpdxs58DPTtlOVE8',
    input: {
      function: 'createOrder',
      pair: ["hY3jZrvejIjQmLjya3yarDyKNgdiG-BiR6GxG_X3rY8", "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw"],
      qty: 1000 * 1e6,
      price: .01,
      txID: "oeYUgBDGBql5-ik4DJ5cDvacwmYe03jx6A5pQK7DEBw",
    }
  }
}